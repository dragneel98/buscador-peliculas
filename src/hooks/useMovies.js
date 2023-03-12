import { useMemo, useRef, useState, useCallback } from "react"
import {searchMovies} from "../components/services/searchMovies"

export function useMovies({search, sort}) {
  
    // el estado que controla que peliculas se renderizan
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
    
    const getMovies = useCallback( async ({search}) => {

      if(search === previousSearch.current) return
      
      try {
        setLoading(true)
        previousSearch.current = search
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
      } 
      catch (error) {
        setError(error.message)
      }
      finally{
        setLoading(false)
      }
    }, [search]) 
    
    const sortedMovies = useMemo(() => {
      return sort 
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
    }, [sort, movies])
    return {movies : sortedMovies, getMovies, loading}
  }