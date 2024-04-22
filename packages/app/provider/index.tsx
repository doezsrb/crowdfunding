import { SafeArea } from './safe-area'
import { CommonContextProvider } from 'app/common/CommonContextProvider'
import { useState } from 'react'
export function Provider({ children }: { children: React.ReactNode }) {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
  return (
    <SafeArea>
      <CommonContextProvider.Provider
        value={{
          openSuccessSnackbar,
          setOpenSuccessSnackbar,
          openErrorSnackbar,
          setOpenErrorSnackbar,
        }}
      >
        {children}
      </CommonContextProvider.Provider>
    </SafeArea>
  )
}
