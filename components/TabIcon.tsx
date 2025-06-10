import { images } from "@/constants/images"
import { Image, ImageBackground, Text, View } from "react-native"

const TabIcon = ({focused, icon, tabName}: {focused: any, icon:any, tabName:string}) => {
    if(focused) {
         return (
        <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-5 justify-center items-center rounded-full overflow-hidden"
        >
            <Image source={icon} tintColor='#151312' className="size-5" />
            <Text className="text-secondary text-base font-semibold ml-2">{tabName}</Text>
        </ImageBackground>
    )
    }
    return (
       <View className="size-full justify-center items-center mt-5 rounded-full">
        <Image source={icon} tintColor='#A8B5DB' className="size-5"/>
       </View> 
    )
}

export default TabIcon