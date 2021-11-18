import React from "react";

const Question = ({ data, onSelect }) => {
  const {
    answer01,
    answer02,
    answer03,
    answer04,
    answerScore01,
    answerScore02,
    qitemNo,
    question,
  } = data;

  const onAnswerSelect = e => {
    let question = qitemNo;
    let answer;
    if (e.target.parentNode.className === "answer") {
      answer = Number(e.target.parentNode.dataset.score);
    } else if (e.target.className === "answer") {
      answer = Number(e.target.dataset.score);
    }
    onSelect(question, answer);
  };

  return (
    <div>
      <span>{`${qitemNo}. `}</span>
      <span>{question}</span>
      <div className="answer">
        <div
          className="answer"
          data-score={answerScore01}
          onClick={onAnswerSelect}
          style={{ border: "1px solid black" }}
        >
          <div>{answer01}</div>
          <div>{answer03}</div>
        </div>

        <div
          className="answer"
          data-score={answerScore02}
          onClick={onAnswerSelect}
          style={{ border: "1px solid black" }}
        >
          <div>{answer02}</div>
          <div>{answer04}</div>
        </div>
      </div>
    </div>
  );
};

export default Question;
