import { Text } from 'app/design/typography'
import { View } from 'app/design/view'

interface FunderRowProps {
  funder: string
  amount: number
}

const FunderRow = ({ funder, amount }: FunderRowProps) => {
  return (
    <View className="flex h-10 w-full flex-row items-center justify-between bg-blue-400 px-5">
      <Text className="font-extralight text-white">
        {funder.slice(0, 8) + '...' + funder.slice(funder.length - 4)}
      </Text>
      <Text className="font-extralight text-white">{amount} ETH</Text>
    </View>
  )
}

export default FunderRow
