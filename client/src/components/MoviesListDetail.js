import React, { useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
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
import { faUserEdit, faComment } from '@fortawesome/free-solid-svg-icons';

const MoviesListDetail = props => {
  const data = [
    { autor: 'Charles Cifuentes', comment: 'This is an example comment' }
  ];

  const initialFormState = { autor: '', comment: '' };

  const { movieData, base_url } = props.location.state;
  const { user } = useAuth0();
  const [ratingValue, setRatingValue] = useState('');
  const [currentComent, setCurrentComment] = useState(initialFormState);
  const [comments, setComments] = useState(data);

  const ratingChanged = newRating => {
    console.log(newRating);
    setRatingValue(newRating);
  };

  const handleChange = e => {
    e.persist();
    setCurrentComment({ ...currentComent, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    const comment = {
      autor: user.nickname,
      comment: currentComent.comment
    };
    e.preventDefault();
    setComments([...comments, comment]);
    currentComent.comment = '';
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
                  onChange={ratingChanged}
                  size={24}
                  color2={'#ffd700'}
                />
                <small>Your Current Rating: {ratingValue}</small>
              </h4>
            </div>
          </Col>
        </Row>
        <Row className='mb-5 bg-info mt-4 p-3'>
          <Col md='6'>
            <div className='text-white mb-3'>
              <h3>Insert a Comment:</h3>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Inser a Comment</Label>
                  <Input
                    type='textarea'
                    name='comment'
                    id='comment'
                    value={currentComent.comment}
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
                        <FontAwesomeIcon icon={faUserEdit} /> {comment.autor}
                      </p>
                      <p className='ml-4'>
                        <FontAwesomeIcon icon={faComment} /> {comment.comment}
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
