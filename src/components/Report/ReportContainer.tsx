import React from 'react'
import { useRecoilValue } from 'recoil'

import { sendTypeAtom } from '../../store/report_actions/atoms'
import { SendReport } from './SendReport'
import { ScheduleReport } from './ScheduleReport'
import { DownloadReport } from './DownloadReport'
import { AnimatePresence } from 'framer-motion'
export const ReportContainer = () => {
    const sendType = useRecoilValue(sendTypeAtom)

    let ReportType
    if (sendType === "now") {
        ReportType = <SendReport />

    } else if (sendType === "scheduled") {

        ReportType = <ScheduleReport />

    } else if (sendType === "download") {

        ReportType = <DownloadReport />

    } else {
        ReportType = null
    }
    return <AnimatePresence exitBeforeEnter>
        {ReportType}
    </AnimatePresence>
}
