import React from "react"
import { Row, Col, Select } from "antd"
import { useRecoilValue, useRecoilState } from 'recoil'

import { isSendingAtom, ReportTypeAtom } from '../store/report_actions/atoms'
import { ProfileOutlined } from "@ant-design/icons"

const { Option } = Select

const reportTypes = new Map<string, string>()
reportTypes.set('all', 'All User Report')
reportTypes.set('email', 'Email Report')
reportTypes.set('phone', 'Phone Report')

const getReportOptions = () => {
    const options: any = []
    reportTypes.forEach((value, key) => {
        options.push(<Option value={key}>{value}</Option>)
    })
    return options
}


export const ReportType = () => {
    const isSendingValue = useRecoilValue(isSendingAtom)
    const [, setReportType] = useRecoilState(ReportTypeAtom)

    return (
        <Row justify="center" align="middle" style={{ marginTop: 30, marginBottom: 30 }}>
            <Col push={1} span={10}>
                <ProfileOutlined style={{fontSize: 18}} />
                <Row>
                    <Select
                        allowClear
                        size="large"
                        placeholder="Select Report Type"
                        style={{ width: '75%' }}
                        disabled={isSendingValue}
                        onChange={e => setReportType(e)}
                    >
                        {
                            getReportOptions()
                        }
                    </Select>
                </Row>
            </Col>
        </Row>
    )
}
