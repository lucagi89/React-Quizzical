import React from 'react';


function LandingPage(props) {

  return (
    <div className="landing-page">
      <h1>Quizzical</h1>
      <p>Test your knowledge with our quizzes!</p>
      <button onClick={props.startGame}>Start Quiz</button>
    </div>
  );
}

export default LandingPage;
