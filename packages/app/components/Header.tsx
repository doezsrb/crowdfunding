import { H1, Text } from 'app/design/typography'
import { Pressable, View } from 'app/design/view'

import { useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

interface HeaderProps {
  openFunc: Function
}

const Header = ({ openFunc }: HeaderProps) => {
  const [mounted, setMounted] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const { address } = useAccount()

  const { disconnect } = useDisconnect()
  useEffect(() => {
    setMounted(true)
    console.log('address')
    console.log(address)
  }, [address])

  return (
    <View className="absolute z-10  flex  w-full flex-row items-center bg-black/10 pl-5 pr-5 ">
      <H1
        className={` w-fit text-center text-xl font-extralight text-white  md:text-3xl`}
      >
        CROWDFUNDING TEST APP
      </H1>
      {account ? (
        <View className="ml-auto w-fit">
          <Text className="  pl-4 pr-4 text-white">
            {account.slice(0, 6)}...{account.slice(account.length - 4)}
          </Text>
        </View>
      ) : (
        <Pressable
          className="ml-auto w-fit"
          onPress={async () => {
            if (address) {
              disconnect()
            } else {
              openFunc()
            }
          }}
        >
          {mounted && (
            <Text className="  pl-4 pr-4 text-white">
              {address
                ? address.slice(0, 4) +
                  '...' +
                  address.slice(address.length - 4)
                : 'Connect'}
            </Text>
          )}
        </Pressable>
      )}
    </View>
  )
}

export default Header
