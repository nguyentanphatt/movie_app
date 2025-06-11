import { Text, View } from "react-native";

interface GenreType {
    id: number,
    name: string
}
const MovieInfo = ({label, value, genre}: {label: string, value?:string | number | null, genre?:GenreType | GenreType[]}) => {

    return (
      <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        {genre ? (
          Array.isArray(genre) && (
            <View className="flex-row flex-wrap gap-2 mt-2">
              {genre.map((g:GenreType) => (
                <View key={g.id} className="bg-light-100 p-2 rounded">
                    <Text className="font-bold text-sm">{g.name}</Text>
                </View>
              ))}
            </View>
          )
      ) : (
        <Text className="text-light-100 font-bold text-sm mt-2">
          {value || "N/A"}
        </Text>
      )}
    </View>
  )
}

export default MovieInfo