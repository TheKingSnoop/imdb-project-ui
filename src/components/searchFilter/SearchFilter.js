import { TextField } from '@mui/material'
import React from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";

const SearchFilter = ({ filterUserInput, setFilterUserInput, setMovies }) => {
    const cookies = new Cookies()

    const handleInputChange = (e) => {
        setFilterUserInput(e.target.value)
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        const token = cookies.get('jwt')
        const user = {name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId}
        const user_Id = user.id
        
        const getFilteredMoviesByTitle = async() => {
            const response = await fetch(`http://localhost:3001/movie/filterMyMovies/${user_Id}/${filterUserInput}`)
            const data = await response.json()
            console.log(data)
            setMovies(data)
        }
        getFilteredMoviesByTitle()
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField sx={{ maxWidth: { md: "900px", xs: '320px' }, minWidth: "300px" }} onChange={handleInputChange} name='title' value={filterUserInput} type='text' label='filter'></TextField>
        </form>

    )
}

export default SearchFilter