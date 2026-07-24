import { useRef } from "react";
export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  function shuffleAnswers(array) {
    const answers = [...array];
    for (let i = answers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
    }
    return answers;
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = shuffleAnswers(answers);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
