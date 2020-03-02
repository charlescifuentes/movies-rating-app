import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const MoviesList = props => (
  <Container>
    {props.movies.map(movie => (
      <div key={movie.id} className='mb-2 border rounded shadow bg-color'>
        <Row>
          <Col md='4'>
            <Link
              to={{
                pathname: '/movieslistdetail',
                state: {
                  movieData: movie,
                  base_url: props.base_url
                }
              }}
            >
              <figure className='img-effect'>
                <img
                  src={props.base_url + movie.poster_path}
                  width='100%'
                  alt='Poster'
                />
                <figcaption>
                  <h3>See Now</h3>
                </figcaption>
              </figure>
            </Link>
          </Col>
          <Col md='8' className='p-4 text-white'>
            <h2>
              <Link
                to={{
                  pathname: '/movieslistdetail',
                  state: {
                    movieData: movie,
                    base_url: props.base_url
                  }
                }}
              >
                {movie.title}
              </Link>
            </h2>
            <p>{movie.overview}</p>
            <div>
              <h3 className='border border-white d-inline-block p-3'>
                Release Date : {movie.release_date}
              </h3>
            </div>
            <div>
              <h4 className='border border-white d-inline-block p-3'>
                Vote Average : {movie.vote_average}
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    ))}
  </Container>
);

export default MoviesList;
