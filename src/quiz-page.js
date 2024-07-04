import React from 'react';
import { useEffect, useState } from 'react';
import Question from './question';

function QuizPage() {

  const [ questionsData, setQuestionsData ] = React.useState([]);

  // get the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
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

  useEffect(() => {

  }, [questionsData]);

  const renderQuestions = () => {
    return questionsData.map((question, index) => {
      return (
          < Question key={index} questionData={question} />
        );
      });
  };

  useEffect(() => {

  }, [questionsData]);

  return (
    <div className="landing-page">
      <h1>This is quiz</h1>
      {renderQuestions()}
      <button>submit</button>
    </div>
  );
}

export default QuizPage;
