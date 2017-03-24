import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const QuestionForm = (props) => {
  var Answers = props.question.answers.map(function (item) {
    return (
      <div className='form-group'>
      <input name='answer' type='radio' value={item.answer}/>
        <label> {item.answer} </label>
       </div>
    )
  })
    return (
      <div>
        <h2>Level: {props.question.level}</h2>
        <h2>Player: {props.game.players[0].name}</h2>
        <h3>Question: {props.question.question}</h3>
        <Form>
          {Answers}
          <Button type='submit' onSubmit={() => props.onSubmitHandler()}> Submit Answer</Button>
        </Form>
      </div>
    )
  }


export default QuestionForm;
