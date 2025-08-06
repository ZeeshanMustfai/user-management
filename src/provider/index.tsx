'use client'

import { App, ConfigProvider, theme } from 'antd'
import React, { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const appTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 8
    },
    components: {
      Modal: {
        borderRadiusLG: 12
      },
      Button: {
        borderRadius: 6
      },
      Card: {
        borderRadiusLG: 12
      }
    }
  }
  return (
    <ConfigProvider theme={appTheme}>
      <App>{children}</App>
    </ConfigProvider>
  )
}
