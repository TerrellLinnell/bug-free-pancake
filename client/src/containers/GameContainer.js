import React, { Component } from 'react';
import $ from 'jquery';
import PlayerHeader from '../views/PlayerHeader';
import QuestionForm from '../views/QuestionForm';


class GameContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game     :  null,
      score    :  null,
      players  :  null,
      round    :  null,
      turn     :  null,
      complete :  false
    }
  }

  componentWillMount = () => {
    this.getGameById();
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

  

  render () {
    return (
      <div>
        {this.state.game ? <PlayerHeader game={this.state.game} /> : null}
      </div>
    );
  }
}

export default GameContainer;
