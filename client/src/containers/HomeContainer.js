import React, { Component } from 'react';
import HomeForm from '../views/HomeForm';
import $ from 'jquery';

class HomeContainer extends Component {

  constructor (props) {

    super(props);

    this.state = {
      game: null,
      name: null
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
      console.log('done getting game by id', game);
      this.setState({game});
    })
  }

  onSubmitHandler = (e) => {
    console.log('im being triggered');
    e.preventDefault();
    $.ajax({
      url: `/api/${this.state.game._id}/players`,
      method: 'POST',
      data: {
        name: this.state.name
      }
    }).done((data) => {
      console.log('the done is here', data);
        this.getGameById();
        $('#playerName').val('');
    })
  }
  render () {
    return (
      <div>
        <HomeForm onSubmitHandler={this.onSubmitHandler} onChangeHandler={this.onChangeHandler} />
      </div>
    )
  }
}

export default HomeContainer;
