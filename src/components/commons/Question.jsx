import React, { useEffect, useState } from "react";
import { memo } from "react";
import styled from "styled-components";
import { BREAK_POINT_MOBILE } from "../../utils/responsiveSize";

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

  useEffect(() => {
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
      <SQuestionNumber>{qitemNo}</SQuestionNumber>
      <SQuestion>{question}</SQuestion>
      <SAnswerSet>
        <SAnswerButton
          className={`${selectedItem === 1 && "selected"}`}
          onClick={() => {
            onAnswerSelect(1, answerScore01);
          }}
        >
          <SButtonSpanHead>{answer01}</SButtonSpanHead>
          <SButtonSpan>{answer03}</SButtonSpan>
        </SAnswerButton>

        <SAnswerButton
          className={`${selectedItem === 2 && "selected"}`}
          onClick={() => {
            onAnswerSelect(2, answerScore02);
          }}
        >
          <SButtonSpanHead>{answer02}</SButtonSpanHead>
          <SButtonSpan>{answer04}</SButtonSpan>
        </SAnswerButton>
      </SAnswerSet>
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

  .selected {
    background-color: #86a8e7;
    color: white;
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 40%);
  }
`;
const SAnswerButton = styled.button`
  flex: 1 1 0%;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px #7f7fd550;
  box-sizing: border-box;
  border: none;
  background-color: white;
  & + & {
    margin-top: 10px;
  }
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    & + & {
      margin-top: 0;
      margin-left: 10px;
    }
  }
`;
const SQuestionNumber = memo(styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #f1f1f1;
  color: #8f8f8f;
`);
const SQuestion = memo(styled.h3`
  font-weight: normal;
`);
const SAnswerSet = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    flex-direction: row;
  }
`;
const SButtonSpanHead = memo(styled.span`
  display: inline-block;
  font-weight: bold;
  padding: 10px 0;
  margin: 0;
  color: inherit;
  width: 100%;
`);
const SButtonSpan = memo(styled.span`
  display: inline-block;
  padding: 0 20px 10px;
`);
export default Question;
