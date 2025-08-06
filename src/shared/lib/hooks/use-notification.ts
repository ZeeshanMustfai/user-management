import { App } from 'antd'

export const useNotification = () => {
  const { notification } = App.useApp()
  
  const showSuccess = (message: string, description?: string) => {
    notification.success({
      message,
      description,
    })
  }

  const showError = (message: string, description?: string) => {
    notification.error({
      message,
      description,
    })
  }

  const showWarning = (message: string, description?: string) => {
    notification.warning({
      message,
      description,
    })
  }

  const showInfo = (message: string, description?: string) => {
    notification.info({
      message,
      description,
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
