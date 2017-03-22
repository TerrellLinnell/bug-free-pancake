import React, { Component } from 'react';
import $ from 'jquery';
import GameHeader from '../views/gameHeader';
import QuestionBox from '../views/questions';


class GameContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game: null,
      question: null
    }
  }

  componentWillMount = () => {
    this.getGameById();
    this.getQuestions();
  }

  getGameById = () => {
    $.ajax({
      url: '/api/games/' + this.props.params.gameId,
      method: 'GET'
    }).done((game) => {
      console.log('done getting game by id', game);
      this.setState({game});
    })
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


  render () {
    return (
      <div>
        {this.state.game ? <GameHeader game={this.state.game} /> : null}
        {(this.state.question && this.state.game)? <QuestionBox game={this.state.game} questions={this.state.question} /> : null}
      </div>
    );
  }
}

export default GameContainer;
