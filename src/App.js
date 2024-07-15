import React from 'react';
import { useState } from 'react';
import './App.css';
import LandingPage from './landing-page';
import QuizPage from './quiz-page';

function App() {

  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const startGame = () => {
    setIsGameStarted(true);
  }

  const stopGame = () => {
    setIsGameStarted(false);
  }

  return (
    <div className="App">
      { isGameStarted ? <QuizPage stopGame={stopGame}/> : <LandingPage startGame={startGame}/> }
    </div>
  );
}

export default App;
