import React from 'react';
import { useEffect, useState } from 'react';
import Question from './question';

function QuizPage(props) {

  const url = 'https://opentdb.com/api.php?amount=5&type=multiple';

  const [ questionsData, setQuestionsData ] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [rendering, setRendering] = useState('');

  const calculateScore = () => {
    if (isFormSubmitted) {
      const score = questionsData.reduce((total, question) => {
        return question.correctAnswer === question.userAnswer ? total + 1 : total;
      }, 0);
      return score;
    }else {
      return null;
    }
  }

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
        answers: answersArray(),
        correctAnswer: question.correct_answer,
        userAnswer: ''
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
        } else {
          fetchData();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [] );


  const renderQuestions = (condition) => {
    if (condition === 0) {
      return questionsData.map((question, index) => {
        return (
            < Question
              key={index}
              id={index}
              question={question}
              onChange={handleChange}/>
          );
        });
    }else {
      return questionsData.map((question, index) => {
        return (
            < Question
              key={index}
              id={index}
              question={question}
              userAnswer={question.userAnswer}  />
          );
        });
    }
  };


  //this function will keep track and update the form state with the user's answer
  const handleChange = (event) => {
    setQuestionsData(prevQuestionsData => {
      return prevQuestionsData.map((question, index) => {
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



  const handleSubmit = () => {
    setIsFormSubmitted(true);
    setRendering(renderQuestions(1));
  }

  const startAgain = () => {
    setIsFormSubmitted(false);
    props.stopGame();
  }

  const renderScore =
      <div>
        <h3>Your score is: {calculateScore()} </h3>
        <button onClick={startAgain}>Start again</button>
      </div>


  return (
    <div className="quiz-page">
      <div>
        { rendering === '' ? renderQuestions(0) : rendering}
        { !isFormSubmitted && <button onClick={handleSubmit}>Check answers</button> }
        { isFormSubmitted && renderScore }
      </div>

    </div>
  );
}

export default QuizPage;
