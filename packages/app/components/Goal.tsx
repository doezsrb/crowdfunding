import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useReadContract, useWatchContractEvent } from 'app/common/WagmiHooks'
import { abi, contractAddress } from '../common/constants'
import { useEffect, useState } from 'react'
import { formatEther } from 'app/common/WagmiHooks'

const Goal = () => {
  const [amount, setAmount] = useState(0)
  const {
    data,
    error,
    isPending,
    refetch: refetchGoal,
  }: any = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getAllFunds',
  })
  useWatchContractEvent({
    address: contractAddress,
    abi,
    eventName: 'ReceivedFund',
    onLogs(logs) {
      refetchGoal()
    },
    onError(error) {
      //Error
    },
  })
  useEffect(() => {
    if (data) {
      let amountFromData: any = data
      setAmount(Number(formatEther(amountFromData)))
    }
  }, [data])
  return (
    <View
      className={`flex h-10 w-4/5 flex-row items-center rounded-sm bg-white/20 md:w-3/5 lg:w-2/5`}
    >
      <Text className=" absolute left-0 z-10 ml-3 font-extralight text-white">
        {amount} ETH
      </Text>
      <View
        style={{ width: `${(100 * amount) / 1}%` }}
        className={`flex h-full justify-center rounded-sm bg-teal-500`}
      ></View>
      {/*   <ProgressBar
        className="h-10"
        style={{ backgroundColor: 'none' }}
        color={colors.teal[500] as string}
        progress={amount > 1 ? 1 : amount}
      /> */}
      <Text className="absolute right-0 z-10 mr-3 font-extralight text-white">
        1 ETH
      </Text>
    </View>
  )
}

export default Goal
