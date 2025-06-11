export const TMBD_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: TMBD_CONFIG.headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }
  const data = await res.json();

  return data.results;
};

export const fetchMovieDetail = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const res = await fetch(
      `${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMBD_CONFIG.headers,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movie detail");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchSimilarMovies = async (movieId: string) => {
  try {
    const res = await fetch(
      `${TMBD_CONFIG.BASE_URL}/movie/${movieId}/similar`,
      {
        method: "GET",
        headers: TMBD_CONFIG.headers,
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch similar movie");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const res = await fetch(`${TMBD_CONFIG.BASE_URL}/movie/upcoming`, {
      method: "GET",
      headers: TMBD_CONFIG.headers,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch similar movie");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
