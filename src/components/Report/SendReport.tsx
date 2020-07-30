import React from 'react'
import { Divider, Row, Col } from 'antd'
import { motion } from 'framer-motion'

import { ReportType } from '../ReportType'
import { InputEmail } from '../InputEmail'



export const SendReport: React.FC<{}> = () => {


    return (
        <motion.div initial={{ y: '100vh' }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 45 }}>
            <Row style={{ marginTop: 25 }}>
                <Col span={24}>
                    <Divider orientation="center" plain>
                        Send Now
                    </Divider>
                </Col>
            </Row>
            <ReportType />
            <Row justify="center">
                <InputEmail />
            </Row>
        </motion.div>
    )
}
