import React from 'react';

import { decode } from 'html-entities';

function Question(props) {
  const answers = props.question.answers.map((answer, index) => {
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
