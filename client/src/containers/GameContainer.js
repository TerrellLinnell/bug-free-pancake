import React, { Component } from 'react';
import $ from 'jquery';
import PlayerHeader from '../views/PlayerHeader';
import Results from '../views/Results';

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

  nextQuestion = (answer) => {
    $('.questionForm').show();
    $('.alert').hide();
    var players = this.state.players
    var round = this.state.round
    var scores = [0,100,200,300]
    this.setState({turn: this.state.turn+=1})
    console.log('var round: ' + round + ' turn state: ' + this.state.turn);
    if (answer === "true") {
      console.log('correct');
      var searchTerm = this.state.currPlayer.name
      var test = [1,2,3]
      var index = -1
      for(var i = 0; i < players.length; i++) {
        if (players[i].name === searchTerm) {
          index = i;
          players[i].score += scores[round]
          break;
        }
      }
      this.setState({players: players})
      console.log(this.state.players);
    } else {
      console.log('wrong');
    }
    if (this.state.turn === players.length) {
      this.setState({currPlayer: players[0]})
      this.setState({turn: 0})
      this.setState({round: round+=1})
      if (round === 4) {
        console.log('DONE');
        var sortPlayers = this.state.players
        sortPlayers.sort(function (a, b) {
          return b.score - a.score;
        });
        this.setState({players: sortPlayers})
        this.setState({complete: true})
      }
    } else {
      this.setState({currPlayer: players[this.state.turn]})
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
    if (this.state.complete) {
      return (
        <Results players={this.state.players} />
      )
    } else {
      return (
        <div>
          {this.state.game ? <PlayerHeader game={this.state.game} /> : null}
          {this.props.children && React.cloneElement(this.props.children, {game: this.state.game, players: this.state.players, currPlayer: this.state.currPlayer, round: this.state.round, turn: this.state.turn, nextQuestion: this.nextQuestion})}
        </div>
      );
    }
  }
}

export default GameContainer;
