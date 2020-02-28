import React, { useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import MoviesList from './MoviesList';
import MoviesForm from './MoviesForm';
import { Container } from 'reactstrap';

const Movies = () => {
  const initalFormState = { rDate: '2017' };

  const [date, setDate] = useState(initalFormState);
  const [movies, setMovies] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const { isAuthenticated } = useAuth0();
  const base_url = 'https://image.tmdb.org/t/p/w500/';

  const getMovieList = async date => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=22555534f5b29022b079b339a0388c07&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&primary_release_year=${date}`
    )
      .then(res => res.json())
      .then(response => {
        setMovies(response.results);
        setDate(date);
        setShowTable(true);
      });
  };

  return isAuthenticated ? (
    <Container>
      <div className='text-center text-white bg-color shadow p-3 mb-3 rounded'>
        <h2>LIST OF MOVIES BY YEAR</h2>
      </div>
      <MoviesForm date={date} getMovieList={getMovieList} />
      {showTable && <MoviesList movies={movies} base_url={base_url} />}
    </Container>
  ) : (
    <Container>
      <div className='text-center text-white bg-color shadow p-3 mb-3 rounded'>
        <h2>Please Login to see All the Movies List</h2>
      </div>
    </Container>
  );
};

export default Movies;
