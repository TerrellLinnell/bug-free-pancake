import React, {Component} from 'react';
import QuestionResponse from '../views/QuestionResponse';
import $ from 'jquery';

class QuestionContainer extends Component {

  constructor (props) {
    super(props)

    this.state={
      game: null,
      question: null
    }
  }

componentWillMount = () => {
  this.getQuestionById();
  this.getQuestions();
}


getQuestions = () => {
  console.log('calling question function');
  $.ajax({
    url: '/api/questions',
    method: 'GET'
  }).done((question) => {
    console.log('done loading questions', question);
    this.setState({question});
  })
}

  getQuestionById = () => {
    $.ajax({
      url: '/api/questions/' + this.props.params.gameId + '/' + this.props.params.questionId,
      method: 'GET'
    }).done((question) => {
      console.log('done getting question by id', question);
      this.setState({question});
    })
  }

  onSubmitHandler = () => {
    $.ajax({
      url: '/api/questions' + this.props.params.gameId,
      method: 'GET',
    }).done(function (data) {
      data = this.state.gameId.questions.answers.correct;
      this.setState({data})
    })
  }


  render () {
    return (
      // {/*<div>
      // {(this.state.game.question.answers.correct === 1 ) ? <CorrectAnswerDisplay/> : <WrongAnswerDisplay/>}
      // </div>*/}
      <h1> this is the question container </h1>
    )
  }

}

export default QuestionContainer;
