import React from 'react';

import { decode } from 'html-entities';

function Question(props) {

  let answers = null;

  // display the questions to the user
  if (!props.userAnswer) {
    answers = props.question.answers.map((answer, index) => {
      return (
        <div key={index} className='answer'>
          <input type="radio"
            id={`${props.id}${index}`}
            name={'answer' + props.id}
            value={answer}
            onChange={props.onChange}
          />
          <label htmlFor={`${props.id}${index}`}>{decode(answer)}</label>
        </div>
      );
    });

  } else {
    // display the right answers to the user after they have submitted their answers
    answers = props.question.answers.map((answer, index) => {
      const checked = props.userAnswer === answer;
      const correct = props.question.correctAnswer === answer;
      const className = checked ? (correct ? 'correct' : 'incorrect') : (correct ? 'correct' : 'neutral')
      return (
        <div key={index}>
          <input type="radio"
            id={`${props.id}${index}`}
            name={'answer' + props.id}
            value={answer}
            disabled
          />
          <label htmlFor={`${props.id}${index}`} className={className}>{decode(answer)}</label>
        </div>
      );
    });
  }


  return (
    <div id={props.index}>
      <h3>{decode(props.question.question)}</h3>
      <div className='answers-list'>
        {answers}
      </div>
    </div>
  );
}

export default Question;
