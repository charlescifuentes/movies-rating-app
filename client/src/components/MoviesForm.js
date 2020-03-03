import React, { useState, useEffect } from 'react';
import { Input, Form, Label, FormGroup, Button } from 'reactstrap';

const MoviesForm = props => {
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    setDate(props.date);
  }, [props]);

  const handleChange = e => {
    e.persist();
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.getMovieList(date.rDate);
  };

  return (
    <div className='d-flex justify-content-center'>
      <Form
        onSubmit={handleSubmit}
        className='shadow p-4 mb-2 bg-white rounded'
      >
        <FormGroup>
          <Label for='rDate'>Selecciona un año</Label>
          <Input
            type='select'
            name='rDate'
            id='rDate'
            value={date.rDate}
            onChange={handleChange}
          >
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
          </Input>
        </FormGroup>
        <Button color='info' type='submit' size='lg' block>
          Buscar
        </Button>
      </Form>
    </div>
  );
};

export default MoviesForm;
