import React, { Component } from 'react';
import HomeForm from '../views/HomeForm';
import $ from 'jquery';
import PlayersDisplay from '../views/playersDisplay';

class HomeContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game: null,
      name: null,
    };

  }

  componentWillMount = () => {
    $.ajax({
      url: '/api/games',
      method: 'POST',
      data: {}
    }).done((game) => {
        this.setState({game});
    })
  }

  onChangeHandler = (field, value) => {
    var newData = {};
    newData[field] = value;
    this.setState(newData);
  }

  getGameById = () => {
    $.ajax({
      url: '/api/games/' + this.state.game._id,
      method: 'GET',
    }).done((game) => {
      this.setState({game});
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    $.ajax({
      url: `/api/${this.state.game._id}/players`,
      method: 'POST',
      data: {
        name: this.state.name
      }
    }).done((data) => {
        this.getGameById();
        $('#playerName').val('');
        this.setState(data)
    })
  }
  render () {
    console.log(this.state.name);
    console.log(this.state.game);
    return (
      <div className='HomeFlexBox'>
      <h1> Welcome to the code quiz game!</h1>
      <div>
        {this.state.game ? <HomeForm onSubmitHandler={this.onSubmitHandler} onChangeHandler={this.onChangeHandler} gameId={this.state.game._id}/> : null}
      </div>
      <div>
        {this.state.players && this.state.game? <PlayersDisplay game={this.state.game}/> : null}
      </div>
      </div>
    )
  }
}

export default HomeContainer;
