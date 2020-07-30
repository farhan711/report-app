import { API } from 'aws-amplify'
import { saveAs } from 'file-saver'
function convertFileToBuffer(file: any) {
    const buf = new ArrayBuffer(file.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < file.length; i++) view[i] = file.charCodeAt(i) & 0xFF;
    return buf;
}

export const downloadReport = async (reportType: string) => {
    const body = {
        reportType
    }
    const response = await API.post('reportapi', '/download', { body })
    saveAs(new Blob([convertFileToBuffer(response.excelFile)], { type: "application/octet-stream" }), `Report-${new Date().getTime()}.xlsx`);
    return
}

export const sendEmail = async (body: any) => {
    return await API.post('reportapi', '/send-now', { body })
}

export const scheduleEmail = async (body: any) => {
    return await API.post('reportapi', '/schedule-email', { body })
}

export const scheduleInterval = async (body: any) => {
    return await API.post('reportapi', '/set-interval', { body })
}
