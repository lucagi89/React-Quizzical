import React from 'react';
// import { useState } from 'react';

import { decode } from 'html-entities';

function Question(props) {

  const answersArray = () => {
    const array = props.questionData.incorrect_answers;
    const rightAnswer = props.questionData.correct_answer;
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

//   const decodeHTMLEntities = (text) => {
//     const textArea = document.createElement('textarea');
//     textArea.innerHTML = text;
//     return textArea.value;
// }




  return (
    <div id={props.index}>
      <h3>{props.questionData.question}</h3>
      <ul>
        {answers}
      </ul>

    </div>
  );
}

export default Question;
