import { icons } from "@/constants/icons"
import { Link } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"


const SimilarCard = ( {movieId, title, rating, poster} : {movieId:number, title: string, rating: number, poster:string} ) => {
    return (
        <Link href={`/movie/${movieId}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                <Image 
                    source={{uri: `https://image.tmdb.org/t/p/w500${poster}`}}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />                                      
                <Text className="text-sm font-bold mt-2 text-light-200" numberOfLines={1}>
                    {title}
                </Text>
                <View className="flex-row items-center rounded-md gap-x-1">
                    <Image source={icons.star} className="size-4"/>
                    <Text className="text-white font-bold text-sm">{Math.round(rating ?? 0)}</Text>
                               
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default SimilarCard