import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setSelectedItem("");
  }, [data]);

  const onAnswerSelect = e => {
    let question = qitemNo;
    let answer;
    console.log(e.target.parentNode.className);
    if (e.target.parentNode.className === "answer ") {
      console.log(e.target.parentNode.dataset.id);
      answer = Number(e.target.parentNode.dataset.score);
      setSelectedItem(e.target.parentNode.dataset.id);
    } else if (e.target.className === "answer ") {
      console.log(e.target.dataset.id);
      answer = Number(e.target.dataset.score);
      setSelectedItem(e.target.dataset);
    }
    onSelect(question, answer);
  };

  return (
    <SQuestionBlock>
      <span className="question-number">{`${qitemNo}`}</span>
      <h3 className="question">{question}</h3>
      <div className="answer-set">
        <div
          className={`answer ${selectedItem === "1" ? "selected" : ""}`}
          data-id="1"
          data-score={answerScore01}
          onClick={onAnswerSelect}
        >
          <h4 className="answer-title">{answer01}</h4>
          <div className="answer-detail">{answer03}</div>
        </div>

        <div
          className={`answer ${selectedItem === "2" ? "selected" : ""}`}
          data-id="2"
          data-score={answerScore02}
          onClick={onAnswerSelect}
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
  // border: 1px solid #f1f1f1;
  box-shadow: 0px 0px 5px 0px #7f7fd530;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  background-color: white;
  .question-number {
    position: absolute;
    top: 10px;
    left: 10px;
    /* border: 1px solid; */
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
    // border: 1px solid white;
    box-sizing: border-box;
  }
  .answer:first-child {
    margin-right: 10px;
  }
  .selected {
    // border: 1px solid #7f7fd5;
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
    // font-size: 12px;
    padding: 0 30px 10px;
  }
`;
export default Question;
