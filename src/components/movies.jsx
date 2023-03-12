import React from 'react'
import "./style/movies.css"

 function RenderMovies({movies}) {
  return (
    <>
        <ul className='movies'>
            {movies.map(movie => (
              <li key={movie.id}>
                <h3> {movie.title} </h3>
                <img src={movie.poster} alt={movie.title}></img>
              </li>
            ))}
          </ul>
    </>
  )
}

 function NoMovies() {
    return (
      <>
          <h3> nose encontraron resultados que coincidan con tu busqueda </h3>
      </>
    )
  }
  
export default function Movies({movies}) {
 
    const hasMovies = movies?.length > 0
    return(
     hasMovies 
        ? <RenderMovies movies={movies} /> 
        : <NoMovies/>
        )
}
