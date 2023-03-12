import { useState, useEffect, useRef, useCallback} from 'react'
import './App.css'
import Movies from './components/movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  // controla lo que se escribe en el input
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
    // alternativa controlada por react usando useState (es mas lenta pero es mas facil hacer validaciones)
    // al tener un estado asociado al input lo podemos controlar en tiempo real
    // se suele recomendar la no controlada por que es mas facil, rapida y optima 

    useEffect(() => {
      if(isFirstInput.current){
        isFirstInput.current = search === ""
        return
      }

      if(search === "") {
        setError("no se puede dejar vacio")
        return
      }
      setError(null)
    }, [search])


    // alternativa sin useRef
   
    // alternativa para recuperar multiples inputs 
    // const inputs = Object.fromEntries(new FormData(event.target))
    // console.log(inputs);

    // const inputs = new FormData(event.target)
    // const search = inputs.get("search")
    // console.log(search);
  
   // alternativa con useRef
   // const inputRef = useRef()
   // const handleSubmit = (event) =>{
    // siempre usar current para acceder al valor de un ref
    // const inputValue = inputRef.current.value 
    // console.log(inputsValue);

    return {search, setSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 400)
    , []
  )

  

  const handleChange = (event) =>{
    const newSearch = event.target.value 
    setSearch(newSearch)
    debouncedGetMovies(newSearch)

  }
  const handleSort = () => {
    setSort(!sort)
  }
  return (
    <>
      <header>
        <h1> buscador de peliculas</h1>
        <form className='form' 
        onSubmit={handleSubmit}
        >
        <input name='search' onChange={handleChange} value={search} placeholder='Avengers, Star Wars, etc'></input>
        <input type="checkbox" onChange={handleSort} checked={sort}></input>
        <button  type='submit'>buscar</button>
        </form>
        {error && <p> {error} </p>}
      </header>
      <main className='main'>
        {loading ? <p>cargando...</p> : <Movies movies={movies}/>}
      </main>
    </>
  )
}

export default App
