import React, { Component } from 'react';
import $ from 'jquery';
import GameHeader from '../views/gameHeader';

class GameContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game: null
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
        {this.state.game ? <GameHeader game={this.state.game} /> : null}
      </div>
    );
  }
}

export default GameContainer;
