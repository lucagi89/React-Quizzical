import React from 'react';
import { useState } from 'react';
import './App.css';
import LandingPage from './landing-page';
import QuizPage from './quizz-page';

function App() {

  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const startGame = () => {
    setIsGameStarted(true);
  }

  return (
    <div className="App">
      { isGameStarted ? <QuizPage /> : <LandingPage startGame={startGame}/> }
    </div>
  );
}

export default App;
