import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const QuestionBox = (props) => {
  var Answers = props.questions.answers.map(function (item) {
    return (
      <div className='form-group'>
      <input name='answer' type='radio' value={item.answer}/>
        <label> {item.answer} </label>
       </div>
    )
  })
    return (
      <div>
        <h5>Level: {props.questions.level}</h5>
        <h5>Player: {props.game.players[0].name}</h5>
        <h4>Question: {props.questions.question}</h4>
        <Form>
            {Answers}
            <Button type='submit' onSubmit={() => props.onSubmitHandler()}> <Link to='/Answer'>Submit Answer</Link> </Button>
        </Form>
      </div>
    )
  }


export default QuestionBox;
