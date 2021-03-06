import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserEdit,
  faComment,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const MoviesListDetail = props => {
  const { movieData, base_url } = props.location.state;
  const { user } = useAuth0();
  const [rating, setRating] = useState('');
  const [currentComent, setCurrentComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [comments.comment]);

  useEffect(() => {
    getRating();
  }, [rating.rating]);

  const getComments = async () => {
    await axios
      .get(`/api/comments/${movieData.id}`)
      .then(function(response) {
        setComments(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleChange = e => {
    e.persist();
    setCurrentComment(e.target.value);
  };

  const insertComment = e => {
    const comment = {
      user: user.nickname,
      comment: currentComent,
      movieId: movieData.id
    };
    e.preventDefault();

    axios
      .post('/api/comments', {
        user: comment.user,
        comment: comment.comment,
        movieid: comment.movieId
      })
      .then(function(response) {
        console.log(response.data.data);
        setComments([...comments, response.data.data]);
        setCurrentComment('');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const commentDelete = async value => {
    await axios
      .delete(`/api/comments/${value}`)
      .then(function(response) {
        console.log(response.data);
        setComments(comments.filter(comment => comment._id !== value));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getRating = async () => {
    await axios
      .get(`/api/ratings/${user.nickname}/${movieData.id}`)
      .then(function(response) {
        console.log(response.data);
        response.data.length > 0
          ? setRating(response.data[0])
          : setRating({ rating: 'No Value' });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const insertRating = value => {
    const data = {
      user: user.nickname,
      rating: value,
      movieId: movieData.id
    };

    axios
      .post('/api/ratings', {
        user: data.user,
        rating: data.rating,
        movieid: data.movieId
      })
      .then(function(response) {
        console.log(response.data);
        setRating(data.rating);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const ratingUpdate = value => {
    const data = {
      user: user.nickname,
      rating: value,
      movieId: movieData.id
    };

    axios
      .put(`/api/ratings/${rating._id}`, {
        user: data.user,
        rating: data.rating,
        movieid: data.movieId
      })
      .then(function(response) {
        console.log(response.data);
        setRating(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const ratingDelete = async () => {
    await axios
      .delete(`/api/ratings/${rating._id}`)
      .then(function(response) {
        console.log(response.data);
        setRating({ rating: 'No Value' });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Container className='py-5'>
      <div className='text-center text-white text-uppercase bg-color shadow p-3 mb-3 rounded'>
        <h2>{movieData.title}</h2>
      </div>
      <div className='mb-2 p-5 border rounded shadow bg-color'>
        <Row>
          <Col md='4'>
            <img
              src={base_url + movieData.poster_path}
              width='100%'
              alt='Poster'
              className='img-thumbnail'
            />
          </Col>
          <Col md='8' className='text-white'>
            <p style={{ fontSize: '20px' }} className='text-justify'>
              {movieData.overview}
            </p>
            <div className='my-2'>
              <h3 className='border border-white d-inline-block p-3'>
                Release Date : {movieData.release_date}
              </h3>
            </div>
            <div className='my-2'>
              <h4 className='border border-white d-inline-block p-3'>
                Vote Average : {movieData.vote_average}
              </h4>
            </div>
            <div className='my-2'>
              <h4 className='border border-white d-inline-block p-3'>
                Give your Rating:
                <ReactStars
                  count={5}
                  onChange={
                    rating.rating === 'No Value' ? insertRating : ratingUpdate
                  }
                  size={24}
                  color2={'#ffd700'}
                />
                <small>
                  Your Current Rating: {rating.rating}
                  {' - '}
                  <Button
                    color='warning'
                    size='sm'
                    onClick={() => ratingDelete()}
                  >
                    <FontAwesomeIcon icon={faEdit} size='xs' />
                    Borrar
                  </Button>
                </small>
              </h4>
            </div>
          </Col>
        </Row>
        <Row className='mb-5 bg-info mt-4 p-3'>
          <Col md='6'>
            <div className='text-white mb-3'>
              <h3>Insert a Comment:</h3>
              <Form onSubmit={insertComment}>
                <FormGroup>
                  <Label>Insert a Comment</Label>
                  <Input
                    type='textarea'
                    name='comment'
                    id='comment'
                    value={currentComent}
                    onChange={handleChange}
                  ></Input>
                </FormGroup>
                <Button type='submit' className='float-right' color='warning'>
                  Comentar
                </Button>
              </Form>
            </div>
          </Col>
          <Col md='6'>
            <div className='text-white'>
              <ul className='list-unstyled'>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <li key={index} className='border-bottom border-white mt-3'>
                      <p>
                        <FontAwesomeIcon icon={faUserEdit} /> {comment.user}
                      </p>
                      <p className='ml-4'>
                        <FontAwesomeIcon icon={faComment} /> {comment.comment}{' '}
                        {' - '}
                        <Button
                          color='warning'
                          size='sm'
                          onClick={() => commentDelete(comment._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} size='xs' />
                          Borrar
                        </Button>
                      </p>
                    </li>
                  ))
                ) : (
                  <p>There is no Comments</p>
                )}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default MoviesListDetail;
