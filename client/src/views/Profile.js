import React, { Fragment } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Container, Row, Col } from 'reactstrap';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='p-5'>
      <Row>
        <Col md='4'>
          <img src={user.picture} alt='Profile' />
        </Col>
        <Col md='8'>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </Col>
      </Row>
      <div className='mt-3 p-3 bg-dark text-white'>
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
    </Container>
  );
};

export default Profile;
