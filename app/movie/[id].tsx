import MovieInfo from "@/components/MovieInfo"
import SimilarCard from "@/components/SimilarCard"
import { icons } from "@/constants/icons"
import { fetchMovieDetail, fetchSimilarMovies } from "@/services/api"
import useFetch from "@/services/useFetch"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

const MovieDetail = () => {
    const { id } = useLocalSearchParams()
    const {data: movie} = useFetch(() => fetchMovieDetail(id as string))
    const {data: similarMovie, loading} = useFetch(() => fetchSimilarMovies(id as string)) 
    const router = useRouter()
    return(
        <View className="bg-primary flex-1">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80
                }}
            >
                <View>
                    <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
                        className="w-full h-[550px]"
                        resizeMode="stretch"
                    />
                </View>
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <View className="flex-row justify-between w-full">
                        <View className="">
                            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                            <View className="flex-row items-center gap-x-1 mt-2">
                                <Text className="text-light-200 text-sm">{movie?.release_date?.split("-")[0]}</Text>
                                <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                            </View>
                        </View>
                        <View className="">
                            <TouchableOpacity className="px-5 py-2 rounded-md bg-white border-2 border-accent">
                                <Text className="text-accent font-bold">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4"/>
                        <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                    <MovieInfo label="Overview" value={movie?.overview}/>
                    <MovieInfo
                        label="Genres"
                        genre={movie?.genres?.map((g) => ({ id: g.id, name: g.name }))}
                    />
                    <View className="flex flex-row justify-between w-1/2">
                        {movie?.budget === 0 ? (
                            <MovieInfo label="Budget" value={`Unknown`}/>
                        ) : (
                            <MovieInfo label="Budget" value={`$${(movie?.budget ?? 0) / 1_000_000} million`}/>
                        )}
                        {movie?.revenue === 0 ? (
                            <MovieInfo label="Revenue" value={`Unknown`}/>
                        ) : (
                            <MovieInfo label="Revenue" value={`$${((movie?.revenue ?? 0) / 1_000_000).toFixed(1)} million`}/>
                        )}
                    </View>
                    <MovieInfo label="Production Companies" value={movie?.production_companies.map((c)=> c.name).join(' - ') || 'N/A'}/>
                </View>
                {loading ? (
                    <ActivityIndicator 
                        size={"large"}
                        color='#0000ff'
                        className="mt-10 self-center"
                    />
                ) : (
                    <>
                        {similarMovie && (
                            <Text className="text-light-200 text-lg font-bold px-5 mt-5">Similar Movies</Text>
                        )}
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={
                            Array.isArray(similarMovie)
                              ? similarMovie.slice(0, 10)
                              : Array.isArray(similarMovie?.results)
                                ? similarMovie.results.slice(0, 10)
                                : []
                            }
                            ItemSeparatorComponent={() => <View className="w-4"/>}
                            className="mb-4 mt-3"
                            renderItem={({item}) => <SimilarCard movieId={item.id} title={item.title} rating={item.vote_average} poster={item.poster_path} />
                            }
                            keyExtractor={(item) => (item.id || item.movie_id).toString()}
                        />
                    </>
                )}
                
            </ScrollView>
            
            <TouchableOpacity className="absolute bottom-7 right-0 left-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor={'#fff'}/>
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}
export default MovieDetail