import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useWalletConnectModal } from '@walletconnect/modal-react-native'

interface useWaitForTransactionReceiptProps {
  hash: any
}
const useWaitForTransactionReceipt = ({
  hash,
}: useWaitForTransactionReceiptProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  useEffect(() => {
    if (hash == null) return
    hash
      .wait(1)
      .then(() => {
        setIsLoading(false)
        setIsSuccess(true)
      })
      .catch((err: any) => {
        setIsLoading(false)
        setIsSuccess(false)
      })
  }, [hash])

  return { isLoading, isSuccess }
}

interface writeContractProps {
  address: any
  abi: any
  functionName: any
  value: any
}
const useWriteContract = () => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isPending, setIsPending] = useState(false)
  const {
    open,
    isConnected,
    address: userAddress,
    provider: universalProvider,
  } = useWalletConnectModal()
  const writeContract = async ({
    address,
    abi,
    functionName,
    value,
  }: writeContractProps) => {
    const provider = new ethers.providers.Web3Provider(
      universalProvider!,
      'any',
    )
    const signer = await provider.getSigner(userAddress)

    var contract = new ethers.Contract(address, abi, signer)

    try {
      var tx = await contract.functions[functionName]!({ value })!
      console.log('tx')
      console.log(tx)
      setData(tx)
    } catch (err: any) {
      console.log(err)
      setError(err)
      setIsPending(false)
    }
  }

  useEffect(() => {}, [])

  return { data, writeContract, error, isPending }
}
interface useReadContractProps {
  abi: any
  address: any
  functionName: any
}

const useReadContract = ({
  abi,
  address,
  functionName,
}: useReadContractProps) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isPending, setIsPending] = useState(false)
  const refetch = () => {
    setIsPending(true)
    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-sepolia.g.alchemy.com/v2/JSgbm_AYV6AcvefS6EgC3f-9h3YknQsG',
    )
    var contract = new ethers.Contract(address, abi, provider)

    contract.functions[functionName]!()!
      .then((data: any) => {
        if (functionName == 'getAllFunds') {
          setData(data[0])
        } else {
          setData(data)
        }

        setIsPending(false)
      })
      .catch((error: any) => {
        setError(error)
        setIsPending(false)
      })
  }
  useEffect(() => {
    refetch()
  }, [])

  return { data, error, isPending, refetch }
}
interface useWatchContractEventProps {
  address: string
  abi: any
  eventName: string
  onLogs: Function
  onError: Function
}
const useWatchContractEvent = ({
  address,
  abi,
  eventName,
  onLogs,
  onError,
}: useWatchContractEventProps) => {
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-sepolia.g.alchemy.com/v2/JSgbm_AYV6AcvefS6EgC3f-9h3YknQsG',
    )
    var contract = new ethers.Contract(address, abi, provider)

    var listener: any = contract.on(eventName, (arg1: any) => {
      onLogs()
    })

    return () => {
      listener = null
    }
  }, [])
}

const formatEther = (num: any) => {
  return ethers.utils.formatEther(num)
}
const parseEther = (num: any) => {
  return ethers.utils.parseEther(num)
}
export {
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
  formatEther,
  parseEther,
  useWaitForTransactionReceipt,
}
