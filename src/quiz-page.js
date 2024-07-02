import React from 'react';
import { useEffect, useState } from 'react';

function QuizPage() {

  const [ questionsData, setQuestionsData ] = React.useState([]);

  // get the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();
        if (data.response_code === 0) {
          setQuestionsData(data.results);
        } else {
          fetchData();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [] );

  // useEffect(() => {
  //   console.log('Updated questionsData:', questionsData);
  // }, [questionsData]);

  return (
    <div className="landing-page">
      <h1>This is quiz</h1>
      <p>Questions</p>
      <button>submit</button>
    </div>
  );
}

export default QuizPage;
