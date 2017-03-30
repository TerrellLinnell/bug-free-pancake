import React, {Component} from 'react';
import QuestionForm from '../views/QuestionForm';
import $ from 'jquery';
import {Alert, Button} from 'react-bootstrap';

class QuestionContainer extends Component {

  constructor (props) {

    super(props)

    this.state = {
      question:       null,
      answer:         null,
      message:        null,
      alertColor:     null,
      questionsAsked: []
    }
  }

  componentWillMount = () => {
    this.getQuestions();
  }

  getQuestions = () => {
    setTimeout(() => {
      console.log("Running the get questions ajax.");
      console.log('questionsAsked: ', this.state.questionsAsked);
      $.ajax({
        url:    '/api/questions/' + this.props.round,
        method: 'POST',
        data:   {
                  finished: JSON.stringify(this.state.questionsAsked)
                }
      }).done((question) => {
        console.log(question);
        var answered = this.state.questionsAsked
        answered.push(question._id);
        this.setState({question: question, questionsAsked: answered})
      })
    }, 0)
  }

  onChangeHandler = (value) => {
    if (value) {
      this.setState({answer: value});
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    $('.questionForm').hide();
    $('.alert').show();
    if (this.state.answer === 'false') {
      this.setState({message: 'false...😢', alertColor: 'alert alert-danger Alert'})
    } else if (this.state.answer === 'true') {
      this.setState({message:'Correct!!😁', alertColor: 'alert alert-success Alert AlertSuccess'})
    }
  }

  nextTurn = (event) => {
    console.log('running nextTurn');
    // passes answer to nextQuestion function in GameContainer.js to update player score, turn, and round,
    // and to move the game to the next player's turn
    this.props.nextQuestion(this.state.answer);

    // getQuestions() has a minimal setTimeout delay, because it depends on nextQuestion() incrementing the round first
    this.getQuestions();
    this.setState({answer: null})
  }

  render () {
    return (
      <div>

        {this.state.question && this.props.game && this.props.players && this.props.currPlayer ? <QuestionForm onChangeHandler={this.onChangeHandler} question={this.state.question} game={this.props.game} players={this.props.players} currPlayer={this.props.currPlayer} turn={this.props.turn} answer={this.state.answer} onSubmitHandler={this.onSubmitHandler}/> : null}
        {this.state.message?
              <h3 className='AlertItemsFlexBox'>
                <Alert className={this.state.alertColor}>{this.state.message}
                  <Button className='btn btn-primary AlertButton' onClick={this.nextTurn}> Next Question</Button>
                </Alert>
              </h3> : null}
      </div>
    )
  }

}

export default QuestionContainer;
