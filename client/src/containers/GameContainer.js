import React, { Component } from 'react';
import $ from 'jquery';
import PlayerHeader from '../views/PlayerHeader';

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
      this.setState({game});
    })
  }

  // updatePlayerScore = () = {
  //   if (this.state.game.gameId.players.name) {
  //
  //   } else {
  //
  //   }
  // }

  render () {
    return (
      <div>
        {this.state.game ? <PlayerHeader game={this.state.game} /> : null}
        {this.props.children && React.cloneElement(this.props.children, {game: this.state.game, round: this.state.round, turn: this.state.turn})}
      </div>
    );
  }
}

export default GameContainer;
