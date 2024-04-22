import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Connector, useConnect } from 'wagmi'
import { useState, useEffect } from 'react'
import { Pressable } from 'react-native'
const ListOfWallets = () => {
  const { connectors, connect } = useConnect()
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <View className="flex w-fit flex-row gap-2 ">
      {mounted &&
        connectors.map((connector: Connector, index: any) => (
          <Pressable
            onPress={() => {
              connect({ connector })
            }}
            key={index}
          >
            <View className="flex h-20 w-40 items-center justify-center rounded-xl border-2 border-transparent bg-blue-400 ">
              <Text className="text-white">{connector.name}</Text>
            </View>
          </Pressable>
        ))}
    </View>
  )
}

export default ListOfWallets
