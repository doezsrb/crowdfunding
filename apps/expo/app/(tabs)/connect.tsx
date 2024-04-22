import { Text } from 'app/design/typography'
import { Pressable, View } from 'app/design/view'
import { useWalletConnectModal } from '@walletconnect/modal-react-native'

import BlockChainIcon from 'app/common/img/BlockChainIcon'

const Connect = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal()

  return (
    <View className=" h-full w-full flex-1 items-center justify-center  bg-blue-500">
      <View className="w-50 h-50 ">
        <BlockChainIcon />
      </View>
      {address && (
        <Text className="text-xl text-white">
          {address?.slice(0, 10) + '...' + address?.slice(address.length - 10)}
        </Text>
      )}
      <Pressable
        className={`mt-5 rounded-md ${
          isConnected ? 'bg-red-500' : 'bg-teal-500'
        } px-20 py-5`}
        onPress={() => {
          if (isConnected) {
            provider?.disconnect()
          } else {
            open()
          }
        }}
      >
        <Text className="text-white">
          {isConnected ? 'Disconnect' : 'Connect'}
        </Text>
      </Pressable>
    </View>
  )
}

export default Connect
