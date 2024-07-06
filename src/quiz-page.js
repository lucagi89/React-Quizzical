import React from 'react';
import { useEffect, useState } from 'react';
import Question from './question';

function QuizPage() {

  const [ questionsData, setQuestionsData ] = useState([]);
  console.log(questionsData);

  const [formData, setFormData] = useState({});


  // get the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await response.json();
        if (data.response_code === 0) {
          setQuestionsData(data.results);
          setFormData(data.results.map((question, index) => {
            return {
              question: question.question,
              correctAnswer: question.correct_answer,
              userAnswer: ''
            };
          }));
        } else {
          fetchData();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [] );

  const renderQuestions = () => {
    return questionsData.map((question, index) => {
      return (
          < Question key={index} id={index} questionData={question} />
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(formData.map((question, index) => {
      return {
        ...question,
        userAnswer: event.target[`answer${index}`].value
      };
    }));
  };



  return (
    <div className="landing-page">
      <h1>This is quiz</h1>
      <form onSubmit={handleSubmit}>
        {renderQuestions()}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default QuizPage;
