import React from 'react'
import { motion } from 'framer-motion'
import { Row, Col, Divider} from 'antd'
import { IntervalPicker } from '../IntervalPicker'
import { ReportType } from '../ReportType'
import { InputEmail } from '../InputEmail'


export const ScheduleReport = () => {
    return (
        <motion.div initial={{ y: '100vh' }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 45}} >
            <Row style={{ marginTop: 25 }}>
                <Col span={24}>
                    <Divider orientation="center" plain>
                        Send Scheduled
                </Divider>
                </Col>
            </Row>
            <IntervalPicker />
            <ReportType />
            <Row justify="center">
                <InputEmail/>
            </Row>
        </motion.div>
    )
}
