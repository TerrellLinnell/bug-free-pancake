import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const QuestionForm = (props) => {
  var Answers = props.question.answers.map(function (item) {
    return (
      <div className='form-group'>
      <input name='answer' type='radio' value={item.correct} onChange={ (event) => props.onChangeHandler(event.target.value)}/>
        <label> {item.answer} </label>
       </div>
    )
  })
    return (
      <div className='questionForm'>
        <h2>Level: {props.question.level}</h2>
        <h2>Player: {props.currPlayer.name}</h2>
        <h3>Question: {props.question.question}</h3>
        <Form onSubmit={props.onSubmitHandler}>
          {Answers}
          <Button type='submit' className='btn btn-success'>Submit Answer</Button>
        </Form>
      </div>
    )
  }


export default QuestionForm;
