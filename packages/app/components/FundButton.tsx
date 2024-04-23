import { Text } from 'app/design/typography'
import { TextInput, View } from 'app/design/view'
import { useState, useEffect, useContext } from 'react'
import { Pressable } from 'react-native'
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  parseEther,
} from 'app/common/Web3Hooks'

import { abi, contractAddress } from '../common/constants'

import { CommonContextProvider } from 'app/common/CommonContextProvider'
const FundButton = () => {
  const [amount, setAmount] = useState('')

  const { data: hash, writeContract, error, isPending } = useWriteContract()
  const { setOpenErrorSnackbar, setOpenSuccessSnackbar } = useContext<any>(
    CommonContextProvider,
  )
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  useEffect(() => {
    if (error) {
      console.log('error')
      console.log(error)
      setOpenErrorSnackbar(error)
    }
    if (isConfirmed) {
      setOpenSuccessSnackbar(true)
    }
  }, [isConfirmed, error])
  return (
    <View className="flex  flex-row gap-5 rounded-lg bg-blue-500/60 px-3 py-3 ">
      <TextInput
        onChangeText={(text: any) => {
          // Allow only numbers
          const numericValue = text.replace(/[^0-9.]/g, '')
          setAmount(numericValue)
        }}
        value={amount}
        inputMode="tel"
        className="border-b-2 border-l-0 border-r-0 border-t-0 border-white/40 text-white placeholder-white/40 outline-none"
        placeholder="ETH (e.g. 0.0032)"
      ></TextInput>
      <Pressable
        onPress={() => {
          if (Number(amount) <= 0) {
            return
          }

          writeContract({
            address: contractAddress,
            abi,
            functionName: 'fund',
            value: parseEther(amount),
          })
        }}
      >
        <View className="flex h-10 w-40 items-center justify-center rounded-lg rounded-sm bg-teal-500">
          <Text className="font-extralight text-white">FUND</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default FundButton
