import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Row, Col, Divider, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'

import { ReportTypeAtom } from '../../store/report_actions/atoms'
import { ReportType } from '../ReportType'
import { downloadReport } from '../../api/functions'
import { notifyError } from '../Notifcation'

export const DownloadReport = () => {

    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    const reportType = useRecoilValue(ReportTypeAtom)

    async function downloadOnClick() {
        if(!reportType) {
            notifyError('Type Not Selected!', 'You must select a Report Type to download')
            return
        }
        setIsDownloading(true)
        await downloadReport(reportType)
        setIsDownloading(false)
    }

    return (
        <motion.div initial={{ y: '100vh' }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 45 }}>
            <>
                <Row style={{ marginTop: 25 }}>
                    <Col span={24}>
                        <Divider orientation="center" plain>
                            Download Report
                        </Divider>
                    </Col>
                </Row>
                <ReportType />
                <Row justify="center">
                    <Col>
                        <Button
                            icon={<DownloadOutlined />}
                            size="middle"
                            onClick={downloadOnClick}
                            loading={isDownloading}
                            disabled={false}
                        >
                            Download
                </Button>
                    </Col>
                </Row>
            </>
        </motion.div>
    )
}
