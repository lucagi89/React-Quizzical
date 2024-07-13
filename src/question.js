import React from 'react';

import { decode } from 'html-entities';

function Question(props) {
    const { questionData, id, index, onChange } = props;

    const answersArray = () => {
    const array = [...questionData.incorrect_answers];
    const rightAnswer = questionData.correct_answer;
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    array.splice(randomIndex, 0, rightAnswer);
    return array;

  };

  const shuffledAnswers = answersArray();

  const answers = shuffledAnswers.map((answer, index) => {
    return (
      <li key={index}>
        <input type="radio"
          id={`${id}${index}`}
          name={'answer' + id}
          value={answer}
          onChange={onChange}
        />
        <label htmlFor={`${id}${index}`}>{decode(answer)}</label>
      </li>
    );
  });


  return (
    <div id={index}>
      <h3>{decode(questionData.question)}</h3>
      <ul>
        {answers}
      </ul>

    </div>
  );
}

export default Question;
