import { View } from 'app/design/view'

import { Platform } from 'react-native'

import LastFunders from 'app/components/LastFunders'

import PopUpWindow from 'app/components/PopUpWindow'
import { useState, useContext, useEffect } from 'react'
import Goal from 'app/components/Goal'
import FundButton from 'app/components/FundButton'
import Status from 'app/components/Status'

import { CommonContextProvider } from 'app/common/CommonContextProvider'
import CustomSnackbar from 'app/components/CustomSnackbar'
import Header from 'app/components/Header'

export function HomeScreen() {
  const [showPopUpWindow, setShowPopUpWindow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const {
    openSuccessSnackbar,
    setOpenErrorSnackbar,
    setOpenSuccessSnackbar,
    openErrorSnackbar,
  } = useContext<any>(CommonContextProvider)
  useEffect(() => {
    setMounted(true)
  })
  return (
    <>
      <View
        className={
          Platform.OS == 'web'
            ? '  h-[100%] w-[100%] bg-gradient-to-tr from-black  via-blue-500 to-black'
            : ' h-full w-full bg-blue-500'
        }
      >
        {showPopUpWindow && (
          <PopUpWindow
            closeFunc={() => {
              setShowPopUpWindow(false)
            }}
          />
        )}

        {Platform.OS == 'web' && (
          <Header
            openFunc={() => {
              setShowPopUpWindow(true)
            }}
          />
        )}

        <View className="flex-column  flex h-[100%] w-full items-center justify-center gap-5">
          {Platform.OS == 'web' && (
            <>
              <Status />
              <Goal />
              <LastFunders />
              <FundButton />
            </>
          )}
        </View>

        {mounted && (
          <>
            <CustomSnackbar
              type="FAILED"
              open={openErrorSnackbar}
              close={() => {
                setOpenErrorSnackbar(false)
              }}
            />
            <CustomSnackbar
              type="SUCCESS"
              open={openSuccessSnackbar}
              close={() => {
                setOpenSuccessSnackbar(false)
              }}
            />
          </>
        )}
      </View>
    </>
  )
}
