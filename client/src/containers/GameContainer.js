import React, { Component } from 'react';
import $ from 'jquery';
import PlayerHeader from '../views/PlayerHeader';

class GameContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game     :  null,
      players  :  null,
      round    :  0,
      turn     :  0,
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
      this.setState({players: game.players})
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
        {this.props.children && React.cloneElement(this.props.children, {game: this.state.game, players: this.state.players, round: this.state.round, turn: this.state.turn, score: this.state.score})}
      </div>
    );
  }
}

export default GameContainer;
