import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useTestState } from "../../provider/testProvider";
import Button from "../commons/Button";
import { useAnswer, useList, useStep } from "../hooks/testPagehook";
import ProgressBar from "../commons/ProgressBar";
import Question from "../commons/Question";
import api from "../../utils/api";

const TestPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useTestState();
  const [currentStep, onClickNext, onClickPrev] = useStep(0);
  const [questionList, questionStep, getTestQuestion] = useList();
  const [updateAnswerObj, answerObj, userAnswerArr, answerString] = useAnswer();
  useEffect(() => {
    getTestQuestion();
  }, []);

  const renderList = useMemo(() => {
    return questionList.slice(currentStep * 5, currentStep * 5 + 5);
  }, [currentStep, questionList]);

  const onAnswerSelect = (
    questionNumber,
    answerScore,
    selectedAnswerNumber
  ) => {
    updateAnswerObj(questionNumber, answerScore, selectedAnswerNumber);
  };

  const renderAnswerList = useMemo(() => {
    const getAnswerList = userAnswerArr.slice(
      currentStep * 5,
      currentStep * 5 + 5
    );
    const arr = Array(5).fill(null);
    getAnswerList.forEach(e => (arr[e[0] - 1 - currentStep * 5] = e[1][1]));
    return arr;
  }, [currentStep, userAnswerArr]);

  const progress = useMemo(() => {
    if (userAnswerArr.length > 0) {
      return Math.ceil((userAnswerArr.length / questionList.length) * 100);
    } else return 0;
  }, [questionList, userAnswerArr]);

  const onClickResult = async () => {
    try {
      await api
        .submitTestAnswer({
          ...state.user,
          startDtm: state.date,
          answers: answerString,
        })
        .then(res => {
          const seq = res.url.split("seq=").pop();
          dispatch({ type: "SET_SEQ", data: seq });
          return seq;
        });
    } catch (error) {
      console.log(error);
    }

    navigate("/completed");
  };

  return (
    <STestPageBlock>
      <SWrap>
        <STitle>검사 진행</STitle>
        <ProgressBar progress={progress} total={questionList.length} />
        {renderList.map((e, i) => (
          <Question
            key={i}
            data={e}
            renderAnswer={renderAnswerList[i]}
            onSelect={onAnswerSelect}
          />
        ))}
        {currentStep > 0 && <Button onClick={onClickPrev}>이전</Button>}
        {questionStep - 1 > currentStep ? (
          <Button
            onClick={onClickNext}
            disabled={(currentStep + 1) * 5 > Object.keys(answerObj).length}
          >
            다음
          </Button>
        ) : (
          <Button
            onClick={onClickResult}
            disabled={questionList.length > Object.keys(answerObj).length}
          >
            결과보기
          </Button>
        )}
      </SWrap>
    </STestPageBlock>
  );
};
const STestPageBlock = styled.div`
  padding: 0 10%;
  text-align: center;
  width: 600px;
  margin: 0 auto;
`;
const SWrap = styled.div`
  padding: 50px 0;
`;
const STitle = styled.h2`
  margin: 0;
  padding: 10px 0;
`;

export default TestPage;
