import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';
import { useAuth0 } from './react-auth0-spa';

import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MoviesListDetails from './components/MoviesListDetail';

import './App.css';

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div className='App d-flex flex-column h-100'>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/profile' component={Profile} />
          <Route path='/movieslistdetail' component={MoviesListDetails} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
