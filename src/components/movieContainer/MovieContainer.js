import React from 'react'
import MovieCard from '../movieCard/MovieCard';
import Grid from '@mui/material/Grid';

const MovieContainer = ({ movies, currentUser }) => {

    
    return (
        <>
            <Grid container spacing={3} sx={{ maxWidth: {md: "900px", xs: '320px'}, minWidth: "200px"}}>
                {movies.map((movie, index) => {
                    return <Grid item md={3} >
                        <MovieCard key={index} movies={movies} index={index} currentUser={currentUser} title={movie.title} rating={movie.rating} description={movie.description} release_date={movie.release_date} image={movie.image} id={movie.tmdb_id}/>
                    </Grid>
                })}
            </Grid>

        </>
    )
}

export default MovieContainer