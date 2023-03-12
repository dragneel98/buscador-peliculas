const apiKey = "40ab028c"

export const searchMovies = async ({ search }) => {
    if (search === "") return null

    try {
        const moviesRequest = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
        const response = await moviesRequest.json()
        // investigar mas sobre json
        const movies = response.Search
        
        // la constate que controla la info que se muestra de la api
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster
        }))
    }
    catch (error) {
        throw new Error("error searching movies")
    }
    
  }
