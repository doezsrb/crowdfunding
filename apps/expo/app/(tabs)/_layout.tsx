import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Tabs } from 'expo-router'
import colors from 'tailwindcss/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CommonContextProvider } from 'app/common/CommonContextProvider'
import { useContext } from 'react'
import CustomSnackbar from 'app/components/CustomSnackbar'
export default function TabLayout() {
  const {
    openSuccessSnackbar,
    setOpenErrorSnackbar,
    setOpenSuccessSnackbar,
    openErrorSnackbar,
  } = useContext<any>(CommonContextProvider)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarInactiveBackgroundColor: colors.blue[700],
          tabBarActiveBackgroundColor: colors.blue[700],
          tabBarActiveTintColor: colors.teal[500],
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="connect"
          options={{
            title: 'Connect',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="ethereum" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="funders"
          options={{
            title: 'Funders',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="ethereum" color={color} />
            ),
          }}
        />
      </Tabs>
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
    </SafeAreaView>
  )
}
