import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const HomeForm = (props) => {
  return (
    <div className='container'>
      <div>
        <Form onSubmit={props.onSubmitHandler}>
          <input id='playerName' type='text' placeholder='player name' onChange={(event) => props.onChangeHandler('name', event.target.value)} />
          <button type='submit'> + </button>
        </Form>
      </div>
      <div>
        <Link className='btn btn-success' to={`/game/${props.gameId}/question` }>Start Game</Link>
      </div>
    </div>

  )
}

export default HomeForm;
