import React from 'react';
import { useState } from 'react';

function Question(props) {

  // const answers = props.answers.map((answer, index) => {
  //   return (
  //     <div key={index}>
  //       <input type="radio" id={index} name="answer" value={answer} />
  //       <label htmlFor={index}>{answer}</label>
  //     </div>
  //   );
  // });

  const answersArray = () => {
    const array = props.incorrect_answers;
    const rightAnswer = props.correct_answer;
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    array.splice(randomIndex, 0, rightAnswer);
    return array;
  };

  const answers = answersArray().map((answer, index) => {
    return (
      <li key={index}>
        <input type="radio" id={index} name="answer" value={answer} />
        <label htmlFor={index}>{answer}</label>
      </li>
    );
  });




  return (
    <div className="App">
      <h3>{props.question}</h3>
      <ul>
        {answers}
      </ul>

    </div>
  );
}

export default Question;
