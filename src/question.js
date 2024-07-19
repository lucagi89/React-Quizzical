import React from 'react';

import { decode } from 'html-entities';

function Question(props) {

  let answers = null;

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
    answers = props.question.answers.map((answer, index) => {
      const checked = props.userAnswer === answer;
      const correct = props.question.correctAnswer === answer;
      const className = checked ? (correct ? 'correct' : 'incorrect') : '';
      return (
        <div key={index} className='answer'>
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
