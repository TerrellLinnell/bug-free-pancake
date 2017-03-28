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
      complete   :  false,
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
    // use jquery to show new question, and hide correct/incorrect messages
    $('.questionForm').show();
    $('.alert').hide();

    // create variables for players, round, and possible scores (scores based on round - 0,1,2,3)
    var players = this.state.players,
        round   = this.state.round,
        scores  = [0,100,200,300]

    // increment turn by one
    this.setState({turn: this.state.turn+=1})

    // check for correct answer from onChangeHandler in QuestionContainer.js
    // if answer is correct, update player score based on current round and set players state
    if (answer === "true") {
      var searchTerm = this.state.currPlayer.name
      for (var i = 0; i < players.length; i++) {
        if (players[i].name === searchTerm) {
          players[i].score += scores[round]
          break;
        }
      }
      this.setState({players: players})
    }

    // check for last player. if true, set current player to 0, turn to 0, and increment round
    if (this.state.turn === players.length) {
      this.setState({currPlayer: players[0], turn: 0, round: round+=1})

      // if round # is greater than 3, declare game over and sort players by score
      if (round === 4) {
        console.log('GAME OVER');
        var sortPlayers = this.state.players
        sortPlayers.sort(function (a, b) {
          return b.score - a.score;
        });

        // reset players sorted by score, and complete game
        this.setState({players: sortPlayers, complete: true})
      }
    } else {
      
      // update current player
      this.setState({currPlayer: players[this.state.turn]})
    }
  }

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
