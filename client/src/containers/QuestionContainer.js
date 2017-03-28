import React, {Component} from 'react';
import QuestionForm from '../views/QuestionForm';
import $ from 'jquery';
import {Alert, Button} from 'react-bootstrap';

class QuestionContainer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      question: null,
      answer: null,
      message: null,
      alertColor: null,
      questionsAsked: []
    }
  }

  componentWillMount = () => {
    this.getQuestions();
  }

  getQuestions = () => {
    var self = this
    setTimeout(function() {
      console.log(self.state.questionsAsked);
      $.ajax({
        url: '/api/questions/' + self.props.round,
        method: 'POST',
        data: {
          finished: JSON.stringify(self.state.questionsAsked)
        }
      }).done((question) => {
        self.setState({question});
        var answered = self.state.questionsAsked
        console.log('question id: ' + question.id);
        answered.push(question.id)
        self.setState({questionsAsked: answered})
        console.log(self.state.questionsAsked);
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
      this.setState({alertColor: 'alert alert-danger Alert'})
      this.setState({message: 'false...😢'});
    } else if (this.state.answer === 'true') {
      this.setState({alertColor: 'alert alert-success Alert AlertSuccess'})
      this.setState({message:'Correct!!😁'});
    }
  }

  nextTurn = (event) => {
    this.props.nextQuestion(this.state.answer);
    this.getQuestions();
  }

  render () {
    return (
      <div>

        {this.state.question && this.props.game && this.props.players && this.props.currPlayer ? <QuestionForm onChangeHandler={this.onChangeHandler} question={this.state.question} game={this.props.game} players={this.props.players} currPlayer={this.props.currPlayer} turn={this.props.turn} onSubmitHandler={this.onSubmitHandler}/> : null}

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
