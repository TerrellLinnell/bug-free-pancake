import React from 'react';
import {Form} from 'react-bootstrap';
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
        <Link className='btn btn-success' to={`/game/${props.gameId}/question`}>Start Game</Link>
      </div>
    </div>

  )
}

export default HomeForm;
