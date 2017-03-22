import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const HomeForm = (props) => {
  return (
    <div>
      <div>
        <Form onSubmit={props.onSubmitHandler}>
          <input id='playerName' type='text' placeholder='player name' onChange={(event) => props.onChangeHandler('name', event.target.value)} />
          <button type='submit'> + </button>
        </Form>
      </div>
      <div>
        <Button className='btn btn-success'><Link to={'/Game/' + props.gameId }>Start Game</Link></Button>
      </div>
    </div>
  )
}

export default HomeForm;
