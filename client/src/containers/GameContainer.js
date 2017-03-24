import React, { Component } from 'react';
import $ from 'jquery';
import PlayerHeader from '../views/PlayerHeader';

class GameContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game       :  null,
      players    :  null,
      currPlayer :  null,
      round      :  1,
      turn       :  0,
      complete   :  false
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
      this.setState({currPlayer: game.players[0]})
    })
  }

  nextQuestion = () => {
    var turn = this.state.turn + 1
    var players = this.state.players
    var round = this.state.round
    this.setState({turn: turn})
    if (turn === players.length) {
      this.setState({currPlayer: players[0]})
      this.setState({turn: 0})
      this.setState({round: round+=1})
      if (round === 4) {
        console.log('DONE');
      }
    } else {
      this.setState({currPlayer: players[turn]})
    }
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
        {this.props.children && React.cloneElement(this.props.children, {game: this.state.game, players: this.state.players, currPlayer: this.state.currPlayer, round: this.state.round, turn: this.state.turn, nextQuestion: this.nextQuestion})}
      </div>
    );
  }
}

export default GameContainer;
