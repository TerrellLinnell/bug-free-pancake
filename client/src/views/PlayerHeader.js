import React from 'react';


const PlayerHeader = (props) => {
  console.log(props);
  var players = props.game.players.map(function (item) {
    return (
      <div>
        <h1> {item.name}: {item.score} </h1>
      </div>
    );
  })
  return (
    <div className='gameHeader'>
      {players}
    </div>
  );
}

export default PlayerHeader;
