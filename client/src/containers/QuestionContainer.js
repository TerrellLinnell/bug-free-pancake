import React, {Component} from 'react';
import QuestionForm from '../views/QuestionForm';
import $ from 'jquery';

class QuestionContainer extends Component {

  constructor (props) {
    super(props)

    this.state={
      question: null
    }
  }

componentWillMount = () => {
  console.log("This is the question container");
  this.getQuestions();
}


getQuestions = () => {
  console.log('calling get question function');
  $.ajax({
    url: '/api/questions',
    method: 'GET'
  }).done((question) => {
    console.log('done loading questions', question);
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
    console.log(this.state);
    return (
      <div>
        {this.state.question ? <QuestionForm question={this.state.question} game={this.props.game} onSubmitHandler={this.onSubmitHandler}/> : null}
      </div>
    )
  }

}

export default QuestionContainer;
