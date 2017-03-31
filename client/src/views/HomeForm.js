import React from 'react';
import {Form, Alert} from 'react-bootstrap';
import {Link} from 'react-router';

const HomeForm = (props) => {
  return (
    <div>
      <div>
        <Form className='playerFormFlexBox' onSubmit={props.onSubmitHandler}>
          <input id='playerName' type='text' placeholder='player name' onChange={(event) => props.onChangeHandler('name', event.target.value)} />
          <button type='submit' className='addPlayerButton'> + </button>
        </Form>
      </div>
      <div className='gameStartButton'>
        {props.name !== null ? <Link className='btn btn-success' to={`/game/${props.gameId}/question`}>Start Game</Link> : <Alert> You need to add players before starting  game </Alert>}
      </div>
    </div>

  )
}

export default HomeForm;
