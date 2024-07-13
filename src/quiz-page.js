import React from 'react';
import { useEffect, useState } from 'react';
import Question from './question';

function QuizPage() {

  const url = 'https://opentdb.com/api.php?amount=5&type=multiple';
  const [ questionsData, setQuestionsData ] = useState([]);

  const [formData, setFormData] = useState({});

  let isFormSubmitted = false;


  // get the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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
          < Question key={index} id={index} questionData={question} onChange={handleChange}/>
        );
      });
  };

  const handleChange = (event) => {
    setFormData(prevFormData => {
      return prevFormData.map((question, index) => {
        let answerIndex = event.target.name.slice(-1);

        if (index !== parseInt(answerIndex)) {
          return question;
        } else {
          return {
            ...question,
            userAnswer: event.target.value
          };
        }
      });
      });

    };

  const calculateScore = () => {
    if (!isFormSubmitted) {
      return null;
    } else {
      const score = formData.reduce((total, question) => {
        return question.correctAnswer === question.userAnswer ? total + 1 : total;
      }, 0);
      return score;
    }
  }


  return (
    <div className="landing-page">
      <h1>This is quiz</h1>
      <form>
        {renderQuestions()}
        <button>Submit</button>
      </form>
     {isFormSubmitted && <div>Your score is: {calculateScore()}</div>}
    </div>
  );
}

export default QuizPage;
