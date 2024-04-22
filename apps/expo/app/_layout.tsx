import '../global.css'
import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
import { WalletConnectModal } from '@walletconnect/modal-react-native'
import { NativeWindStyleSheet } from 'nativewind'

NativeWindStyleSheet.setOutput({
  default: 'native',
})
const projectId = '0c101c25f19420216599830c670e1c52'
const providerMetadata = {
  name: 'crowdfundingApp',
  description: 'CrowdFunding dApp',
  url: 'https://walletconnect.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'crowdfunding://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
}
const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: ['eip155:11155111'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
}
export default function Root() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'light',
          statusBarColor: '#1d4ed8',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <WalletConnectModal
        sessionParams={sessionParams}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </Provider>
  )
}
