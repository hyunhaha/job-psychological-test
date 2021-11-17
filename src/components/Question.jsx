import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Question = ({ data }) => {
  // const [question, setQuestion] = useState("");
  // const [questionNumber, setQuestionNumber] = useState(0);
  const [oneCheck, setOneCheck] = useState(false);
  const [twoCheck, setTwoCheck] = useState(false);
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
  useEffect(() => {
    console.log(data);
    // setQuestion(question);
    // setQuestionNumber(data.qitemNo);
    console.log(oneCheck);
  }, [data, oneCheck]);
  return (
    <div>
      <span>{`${qitemNo}. `}</span>
      <span>{question}</span>
      <div>
        <div>
          <label htmlFor={`${qitemNo}-1`}>
            <input
              type="radio"
              checked={oneCheck}
              id={`${qitemNo}-1`}
              name={qitemNo}
              onChange={() => {
                setOneCheck(!oneCheck);
              }}
            />
            {answer01}
          </label>
        </div>
        <div>
          <label htmlFor={`${qitemNo}-2`}>
            <input
              type="radio"
              checked={twoCheck}
              id={`${qitemNo}-2`}
              name={qitemNo}
              onChange={() => {
                setTwoCheck(!twoCheck);
              }}
            />
            {answer02}
          </label>
        </div>
      </div>
      <div>
        <span>{answer03}</span>
        <span>{answer04}</span>
      </div>
    </div>
  );
};

export default Question;
