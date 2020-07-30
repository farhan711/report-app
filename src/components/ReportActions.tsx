import React from 'react'
import { Row, Col, Button, Divider, Space } from 'antd'
import { FieldTimeOutlined, SendOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'

import { sendTypeAtom, isSendingAtom } from '../store/report_actions/atoms'
 
export const ReportActions = () => {
    const [, setSendType] = useRecoilState(sendTypeAtom)
    const isSendingValue = useRecoilValue(isSendingAtom)
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            <Row>
                <Col span={24} style={{ marginTop: 45 }}>
                    <Divider orientation="center" plain>
                        Report Actions
                </Divider>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 25 }}>
                <Space>
                    <Col span={4}>
                        <Button disabled={isSendingValue} type="primary" shape="round" icon={<SendOutlined />} size="middle" onClick={e => setSendType("now")}>
                            Send Now
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Button disabled={isSendingValue} type="primary" shape="round" icon={<FieldTimeOutlined />} size="middle" onClick={e => setSendType("scheduled")}>
                            Schedule
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Button disabled={isSendingValue} type="primary" shape="round" icon={<CloudDownloadOutlined />} size="middle" onClick={e => setSendType("download")}>
                            Get Report
                        </Button>
                    </Col>
                </Space>
            </Row>
        </motion.div>
    )
}
