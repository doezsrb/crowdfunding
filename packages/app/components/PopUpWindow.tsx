import { Pressable, View } from 'app/design/view'
import ListOfWallets from './ListOfWallets'
import { Text } from 'app/design/typography'

interface PopUpWindowProps {
  closeFunc: Function
}
const PopUpWindow = ({ closeFunc }: PopUpWindowProps) => {
  return (
    <View className=" fixed z-20 flex h-screen w-screen items-center bg-black/70 ">
      <View className="w-min-2/4 mt-[10%] flex flex-col items-center gap-2 rounded-xl bg-blue-500 px-5 pb-10 pt-2 shadow-xl ">
        <Pressable
          className=" self-end"
          onPress={() => {
            closeFunc()
          }}
        >
          <Text className="text-white">CLOSE</Text>
        </Pressable>
        <ListOfWallets />
      </View>
    </View>
  )
}

export default PopUpWindow
