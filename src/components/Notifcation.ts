import { notification } from 'antd'

export const notifyError = (message:string, description: string, duration = 0) => {
    notification.error({
        message,
        description,
        duration
    })
}

export const notifySuccess = (message:string, description: string, duration = 0) => {
    notification.success({
        message,
        description,
        duration
    })
}
