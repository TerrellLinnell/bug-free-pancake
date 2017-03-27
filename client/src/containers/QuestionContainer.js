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
      })
    }, 0)
  }

    onChangeHandler = (value) => {
      if(value) {
        console.log(value);
        this.setState({answer: value});
        console.log(this.state.answer);
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    $('.questionForm').hide();
    $('.alert').show();
    console.log(this.state.answer);
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
