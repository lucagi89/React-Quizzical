import React from 'react';
import { useEffect, useState } from 'react';
import Question from './question';

function QuizPage() {

  const url = 'https://opentdb.com/api.php?amount=5&type=multiple';

  const [ questionsData, setQuestionsData ] = useState([]);
  const [formData, setFormData] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  //this function will get the data from the API and set it to the state in the correct format
  const getQuestionsData = (array) => {
    setQuestionsData(array.map((question) => {
      const answersArray = () => {
        let array = question.incorrect_answers;
        const rightAnswer = question.correct_answer;
        const randomIndex = Math.floor(Math.random() * (array.length + 1));
        array.splice(randomIndex, 0, rightAnswer);
        return array;
      }
      return {
        question: question.question,
        answers: answersArray()
      };
    }));
  };


  // get the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.response_code === 0) {
          getQuestionsData(data.results);

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
          < Question
            key={index}
            id={index}
            question={question}
            onChange={handleChange}/>
        );
      });
  };

  //this function will keep track and update the form state with the user's answer
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');
    setIsFormSubmitted(true);
  }

  console.log(isFormSubmitted);

  const calculateScore = () => {
    if (isFormSubmitted) {
      const score = formData.reduce((total, question) => {
        return question.correctAnswer === question.userAnswer ? total + 1 : total;
      }, 0);
      return score;
    }else {
      return null;
    }
  }

  const startAgain = () => {
    setIsFormSubmitted(false);
  }

  const renderScore =
      <div>
        <span>Your score is: {calculateScore()}</span>
        <button onClick={startAgain}>Start again</button>
      </div>


  return (
    <div className="quiz-page">
      <h1>This is quiz</h1>
      <div>
        {renderQuestions()}
        { !isFormSubmitted && <button onClick={handleSubmit}>Check answers</button> }
        { isFormSubmitted && renderScore }
      </div>

    </div>
  );
}

export default QuizPage;
