import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import HomeContainer from './containers/HomeContainer';
import GameContainer from './containers/GameContainer';
// import AnswerContainer from './containers/AnswerContainer';
import QuestionForm from './views/QuestionForm';
import QuestionContainer from './containers/QuestionContainer';
import QuestionResponse from './views/QuestionResponse';
import Results from './views/Results';


render((
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={HomeContainer}/>
      <Route path='/game/:gameId'  component={GameContainer}>
        <Route path="/game/:gameId/question" component={QuestionContainer} >
          <Route path="/game/:gameId/questionResponse" component={QuestionResponse}/>
        </Route>
        <Route path='/results' component={Results} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));



// Game {state of everything}
//   - ActiveQuestion & Player
//   - Correct/Incorrect Comp
//   - Final Results

//
// Player picks answer
//
// if answer is correct ShowCorrectModal
// If answer is incorrect show InCorrectModal.
//
// NEXT Submits update to player score, bumps to next question and next player.
