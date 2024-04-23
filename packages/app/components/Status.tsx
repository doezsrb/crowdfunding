import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useReadContract, useWatchContractEvent } from 'app/common/WagmiHooks'
import { abi, contractAddress } from '../common/constants'
import { useEffect, useState } from 'react'

const Status = () => {
  const [type, setType] = useState(4)

  const {
    data,
    error,
    isPending,
    refetch: refetchStatus,
  } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getState',
  })
  type StatusType = {
    status: string
    color: string
  }
  const types: [StatusType, StatusType, StatusType, StatusType, StatusType] = [
    { status: 'OPENED', color: 'bg-blue-400' },
    { status: 'CLOSED', color: 'bg-white/20' },
    { status: 'SUCCESS', color: 'bg-teal-500' },
    { status: 'FAILED', color: 'bg-red-500' },
    { status: 'LOADING', color: 'bg-white/20' },
  ]

  useEffect(() => {
    if (data != null) {
      setType(Number(data))
    }
  }, [data])
  return (
    <View
      className={`flex h-10 w-20 ${
        types[type]!.color
      } items-center justify-center rounded-lg`}
    >
      <Text className="font-extralight text-white">{types[type]!.status}</Text>
    </View>
  )
}
export default Status
