import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useEffect } from 'react'

interface CustomSnackbarProps {
  type: 'FAILED' | 'SUCCESS'
  open: boolean
  close: Function
}
const CustomSnackbar = ({ type, open, close }: CustomSnackbarProps) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        close()
      }, 3000)
    }
  }, [open])
  return (
    <View
      style={{ display: open ? 'block' : 'none' } as any}
      className={` ${
        type == 'SUCCESS' ? 'bg-teal-500' : 'bg-red-500'
      } absolute bottom-20 left-0 z-10 flex  h-10 w-[100%] justify-center rounded-md md:left-5 md:w-60 `}
    >
      <Text className="text-center font-extralight text-white">{type}</Text>
    </View>
  )
}

export default CustomSnackbar
