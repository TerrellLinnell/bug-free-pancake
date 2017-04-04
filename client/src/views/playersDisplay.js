import React from 'react';

const PlayersDisplay = (props) => {
  var playerNames = props.game.players.map(function (item) {
    return (
      <li> <h3> {item.name} </h3></li>
    )
  })
  return (
    <div>
      <h3> Current Players: </h3>
      <ul>
        {playerNames}
      </ul>
    </div>
  )
}

export default PlayersDisplay;
