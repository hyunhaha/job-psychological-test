import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Question = ({ data, onSelect, renderAnswer }) => {
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
  const [selectedItem, setSelectedItem] = useState("");

  // useEffect(() => {
  //   setSelectedItem("");
  // }, [data]);
  // useEffect(() => {
  //   console.log(renderAnswer);
  // }, [renderAnswer]);

  useEffect(() => {
    // console.log(renderAnswer);
    if (renderAnswer) {
      setSelectedItem(renderAnswer);
    } else {
      setSelectedItem("");
    }
  }, [data, renderAnswer]);

  const onAnswerSelect = (selectedItem, answerScore) => {
    let questionNumber = qitemNo;
    setSelectedItem(selectedItem);
    onSelect(questionNumber, Number(answerScore), selectedItem);
  };

  return (
    <SQuestionBlock>
      <span className="question-number">{`${qitemNo}`}</span>
      <h3 className="question">{question}</h3>
      <div className="answer-set">
        <div
          className={`answer ${selectedItem === 1 ? "selected" : ""}`}
          data-id="1"
          data-score={answerScore01}
          onClick={() => {
            onAnswerSelect(1, answerScore01);
          }}
        >
          <h4 className="answer-title">{answer01}</h4>
          <div className="answer-detail">{answer03}</div>
        </div>

        <div
          className={`answer ${selectedItem === 2 ? "selected" : ""}`}
          data-id="2"
          data-score={answerScore02}
          onClick={() => {
            onAnswerSelect(2, answerScore02);
          }}
        >
          <h4 className="answer-title">{answer02}</h4>
          <div className="answer-detail">{answer04}</div>
        </div>
      </div>
    </SQuestionBlock>
  );
};
const SQuestionBlock = styled.div`
  padding: 10px;
  box-shadow: 0px 0px 5px 0px #7f7fd530;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  background-color: white;
  .question-number {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #f1f1f1;
    color: #8f8f8f;
  }
  .question {
    font-weight: normal;
  }
  .answer-set {
    padding: 10px;
    display: flex;
  }
  .answer {
    flex: 1 1 0%;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px #7f7fd550;
    box-sizing: border-box;
  }
  .answer:first-child {
    margin-right: 10px;
  }
  .selected {
    background-color: #86a8e7;
    color: white;
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 40%);
  }
  .answer-title {
    padding: 10px 0;
    margin: 0;
    color: inherit;
  }
  .answer-detail {
    padding: 0 30px 10px;
  }
`;
export default Question;
