import { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "./../questions.js";
import quizCompleteImg from "./../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function shuffleAnswers(array) {
    const answers = [...array];
    for (let i = answers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
    }
    return answers;
  }

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
  ) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"></img>
        <h2>Quiz Complited!</h2>
      </div>
    );
  }

  const shuffledAnswers = shuffleAnswers(
    QUESTIONS[activeQuestionIndex].answers,
  );

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={20000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
