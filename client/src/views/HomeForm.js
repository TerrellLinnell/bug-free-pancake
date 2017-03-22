import React from 'react';
import { Form } from 'react-bootstrap';

const HomeForm = (props) => {
  return (
    <div>
      <Form onSubmit = {props.onSubmitHandler}>
        <input id='playerName' type='text' placeholder='player name' onChange={(event) => props.onChangeHandler('name', event.target.value)} />
        <button type='submit'> + </button>
      </Form>
    </div>
  )
}

export default HomeForm;
