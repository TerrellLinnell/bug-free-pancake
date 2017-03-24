import React from 'react';

const Results = (props) => {
  var playerTable = props.players.map(function (item) {
    return (<tr><td>{item.name}</td><td>{item.score}</td></tr>);
  });
  return (
      <div>
        <h1> Results </h1>
        <table className='table table-bordered'>
          {playerTable}
        </table>
        <a className="btn btn-primary" href="/">New Game</a>
      </div>
    )
}

export default Results;
