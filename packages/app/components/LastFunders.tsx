import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Platform } from 'react-native'
import { useEffect, useState, memo } from 'react'
import { abi, contractAddress } from '../common/constants'
import FunderRow from './FunderRow'
import {
  useReadContract,
  useWatchContractEvent,
  formatEther,
} from 'app/common/Web3Hooks'

const LastFunders = () => {
  type Funder = {
    address: string
    amount: number
  }
  const [mounted, setMounted] = useState(false)
  const [funders, setFunders] = useState<Funder[]>([])
  const {
    data,
    error,
    isPending,
    refetch: refetchList,
  } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getAllFunders',
  })

  useWatchContractEvent({
    address: contractAddress,
    abi,
    eventName: 'ReceivedFund',
    onLogs(logs) {
      console.log('New logsw!', logs)
      refetchList()
    },
    onError(error) {
      console.log('error', error)
    },
  })
  useEffect(() => {
    console.log('data')
    console.log(data)
    if (data != null) {
      var arr_funders = data[0]
      var arr_amounts = data[1]
      if (arr_funders.length != 0) {
        var funders: Funder[] = []
        for (var i = 0; i < arr_funders.length; i++) {
          funders.push({
            address: arr_funders[i],
            amount: Number(formatEther(arr_amounts[i])),
          })
        }
        console.log(funders)
        setFunders(funders)
      }
    }
  }, [data])
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <View className="flex w-full flex-col items-center  ">
      <Text className=" text-xl font-extralight text-white">LAST FUNDERS</Text>
      <>
        <View
          className={`mt-5 h-60 w-4/5 overflow-auto  bg-white/10 md:w-3/5 lg:w-2/5`}
        >
          {mounted && !isPending ? (
            <>
              {funders.map((it: Funder, index: any) => (
                <FunderRow key={index} funder={it.address} amount={it.amount} />
              ))}
            </>
          ) : (
            <View className="flex h-full w-full items-center justify-center">
              <Text className="font-extralight text-white">Loading...</Text>
            </View>
          )}
        </View>
      </>
    </View>
  )
}

export default memo(LastFunders)
