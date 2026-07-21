import { useState } from "react";
import QUESTIONS from "./../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const shuffledAnswers = shuffleAnswers(
    QUESTIONS[activeQuestionIndex].answers,
  );

  function shuffleAnswers(array) {
    const answers = [...array];
    for (let i = answers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
    }
    return answers;
  }

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  return (
    <div id="quiz">
      <div id="question">
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
