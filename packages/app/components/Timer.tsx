import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useReadContract, useWatchContractEvent } from 'wagmi'
import { abi, contractAddress } from '../common/constants'
import { useEffect } from 'react'
const Timer = () => {
  const {
    data,
    error,
    isPending,
    refetch: refetchGoal,
  } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getTimerToGo',
  })
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <View className="flex h-10 w-20 items-center justify-center rounded-lg bg-blue-400">
      <Text className="font-extralight text-white">00:00:00</Text>
    </View>
  )
}

export default Timer
