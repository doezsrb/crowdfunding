import Goal from 'app/components/Goal'
import LastFunders from 'app/components/LastFunders'

import { View } from 'app/design/view'
import FundButton from 'app/components/FundButton'
import Status from 'app/components/Status'
import { ScrollView } from 'app/design/layout'
const Funders = () => {
  return (
    <ScrollView className="h-[100%] w-[100%] bg-blue-500">
      <View className={'flex-1  flex-col items-center  bg-blue-500 pt-20'}>
        <View className="mt-5 flex w-full items-center">
          <Status />
        </View>
        <View className="mt-5 flex w-full items-center">
          <Goal />
        </View>
        <View className="mt-5 flex w-full items-center">
          <LastFunders />
        </View>
        <View className="mt-5 flex w-full items-center">
          <FundButton />
        </View>
      </View>
    </ScrollView>
  )
}

export default Funders
