/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import { Col, Row, ConfigProvider, Select, Button } from 'antd'
import { MailOutlined, FieldTimeOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useRecoilValue, useRecoilState } from 'recoil'

import { sendEmail, scheduleEmail, scheduleInterval } from '../api/functions'
import { sendTypeAtom, isSendingAtom, ReportTypeAtom, intervalAtom, timeAtom } from '../store/report_actions/atoms'
import { EmptyEmailRenderer } from './EmptyEmailRenderer'
import { notifyError, notifySuccess } from './Notifcation'


const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const InputEmail = () => {

    const [toAddresses, setToAddresses] = useState<string[]>([])

    const sendTypeValue = useRecoilValue(sendTypeAtom)
    const reportTypeValue = useRecoilValue(ReportTypeAtom)
    const timeValue = useRecoilValue(timeAtom)
    const intervalValue = useRecoilValue(intervalAtom)
    const [isSending, setIsSending] = useRecoilState(isSendingAtom)


    async function sendOnClick() {

        if (toAddresses.length < 1) {
            notifyError('Emails Not Selected!', 'You need to set atleast one email address')
            return
        }

        if (reportTypeValue === undefined) {
            notifyError('Report Type Not Selected!', 'You must select a Report Type')
            return
        }

        const body = {
            timeInterval: intervalValue,
            sendAt: timeValue ? moment(timeValue).utc().unix() : undefined,
            toAddresses: toAddresses,
            reportType: reportTypeValue
        }
        setIsSending(true)
        console.log('Time Interval', timeValue)
        console.log('Diff', moment().utc().unix(), moment(timeValue).utc().unix())

        try {
            if (sendTypeValue === "now") {
                await sendEmail(body)
            } else if (intervalValue) {
                await scheduleInterval(body)
            } else if (timeValue) {
                await scheduleEmail(body)
            }
        } catch (error) {
            notifyError('Failed!', 'Your Email is not Sent/Scheduled')
            setIsSending(false)
            return
        }

        const emailAction = sendTypeValue === "now" ? 'Sent' : 'Scheduled'
        notifySuccess(`Email ${emailAction}!`, `Your Email has been ${emailAction} Successfully.`)
        setIsSending(false)


    }

    function emailChangeHandler(emails: string[]) {
        if (emails.length > 0 && !regexEmail.test(emails[emails.length - 1].toLowerCase())) {
            return
        }
        setToAddresses(emails)
    }

    return (
        <Col push={1} span={10}>
            <MailOutlined style={{ fontSize: 18 }} />
            <Row>
                <ConfigProvider renderEmpty={EmptyEmailRenderer}>
                    <Select
                        mode="tags"
                        placeholder="Enter Emails"
                        size="large"
                        className="w-75"
                        onChange={emailChangeHandler}
                        disabled={isSending}
                        value={toAddresses}>
                        {toAddresses}
                    </Select>
                </ConfigProvider>
                <Button
                    icon={sendTypeValue === "now" ? <MailOutlined /> : <FieldTimeOutlined />}
                    size="large"
                    onClick={e => sendOnClick()}
                    loading={isSending}
                >
                    Send
        </Button>
            </Row>
        </Col>
    )
}
