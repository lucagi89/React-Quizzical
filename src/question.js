import React from 'react';

import { decode } from 'html-entities';

function Question(props) {
  const answers = props.question.answers.map((answer, index) => {
    return (
      <li key={index}>
        <input type="radio"
          id={`${props.id}${index}`}
          name={'answer' + props.id}
          value={answer}
          onChange={props.onChange}
        />
        <label htmlFor={`${props.id}${index}`}>{decode(answer)}</label>
      </li>
    );
  });


  return (
    <div id={props.index}>
      <h3>{decode(props.question.question)}</h3>
      <ul>
        {answers}
      </ul>

    </div>
  );
}

export default Question;
