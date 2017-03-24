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
  $.ajax({
    url: '/api/questions',
    method: 'GET'
  }).done((question) => {
    this.setState({question});
    console.log(question);
  })
}

  onChangeHandler = (value) => {
    console.log(value);
    if(value) {
      this.setState({answer: value})
  }
}

  onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(typeof(this.state.answer));
    if (this.state.answer === 'false') {
      this.setState({alertColor: 'alert alert-danger Alert'})
      this.setState({message: 'false...😢'});
    } else if (this.state.answer === 'true') {
      this.setState({alertColor: 'alert alert-success Alert AlertSuccess'})
      this.setState({message:'Correct!!😁'});
    }
  }


  render () {
    return (
      <div>
        {this.state.message?

              <h3 className='AlertItemsFlexBox'>
                <Alert className={this.state.alertColor}>{this.state.message}
                  <Button className='btn btn-primary AlertButton'> Next Question</Button>
                </Alert>
              </h3> : null}
        {this.state.question && this.props.game ? <QuestionForm onChangeHandler={this.onChangeHandler} question={this.state.question} game={this.props.game} onSubmitHandler={this.onSubmitHandler}/> : null}
      </div>
    )
  }

}

export default QuestionContainer;
