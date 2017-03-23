// import React from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { Link } from 'react-router';
//
// const QuestionBox = (props) => {
//   var Answers = props.questions.answers.map(function (item) {
//     return (
//       {/*<div className='form-group'>
//       <input name='answer' type='radio' value={item.answer}/>
//         <label> {item.answer} </label>
//        </div>*/}
//     )
//   })
//     return (
//       {/*<div>
//         <h2>Level: {props.questions.level}</h2>
//         <h2>Player: {props.game.players[0].name}</h2>
//         <h3>Question: {props.questions.question}</h3>
//         <Form>
//             {Answers}
//             <Link to=`{/Answer/${props.game._id}/${props.questions.question._id}}`><Button type='submit' onSubmit={() => props.onSubmitHandler()}> Submit Answer</Button></Link>
//         </Form>
//       </div>*/}
//     )
//   }
//
//
// export default QuestionBox;
import React from 'react';

const QuestionForm = (props) => {
  return (
    <div>
      <h1> QuestionForm Page </h1>
    </div>
  )
}

export default QuestionForm;
