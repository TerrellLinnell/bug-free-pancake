import React, {Component} from 'react';
import QuestionForm from '../views/QuestionForm';
import $ from 'jquery';
import {Alert, Button} from 'react-bootstrap';

class QuestionContainer extends Component {

  constructor (props) {
    super(props)

    this.state={
      question: null,
      answer: null,
      message: null,
      alertColor: null
    }
  }

  componentWillMount = () => {
    this.getQuestions();
  }


  getQuestions = () => {
    var self = this
    setTimeout(function() {
      $.ajax({
        url: '/api/questions/' + self.props.round,
        method: 'GET'
      }).done((question) => {
        self.setState({question});
        console.log(question);
      })
    }, 0)
  }

    onChangeHandler = (value) => {
      console.log(value);
      if(value) {
        this.setState({answer: value})
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    $('.questionForm').hide();
    $('.alert').show();
    console.log(typeof(this.state.answer));
    if (this.state.answer === 'false') {
      this.setState({alertColor: 'alert alert-danger'})
      this.setState({message: 'false...'});
    } else if (this.state.answer === 'true') {
      this.setState({alertColor: 'alert alert-succes'})
      this.setState({message:'correct'});
    }
  }

  nextTurn = (event) => {
    this.props.nextQuestion(this.state.answer);
    this.getQuestions();
  }

  render () {
    return (
      <div>
        {this.state.message ? <Alert className={this.state.alertColor}><div>{this.state.message}</div><Button bsStyle='primary' onClick={this.nextTurn}>Next Question</Button></Alert> : null}
        {this.state.question && this.props.game && this.props.players && this.props.currPlayer ? <QuestionForm onChangeHandler={this.onChangeHandler} question={this.state.question} game={this.props.game} players={this.props.players} currPlayer={this.props.currPlayer} turn={this.props.turn} onSubmitHandler={this.onSubmitHandler}/> : null}
      </div>
    )
  }

}

export default QuestionContainer;
