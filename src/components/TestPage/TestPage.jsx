import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../commons/Button";
import { useAnswer, useList, useStep } from "../hooks/testPagehook";
import ProgressBar from "../commons/ProgressBar";
import Question from "../commons/Question";
import api from "../../utils/api";
import { BREAK_POINT_MOBILE } from "../../utils/responsiveSize";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { testDate, userState } from "../../atoms/atoms";

const TestPage = props => {
  const navigate = useNavigate();
  const [currentStep, onClickNext, onClickPrev] = useStep(0);
  const [questionList, questionStep, getTestQuestion] = useList();
  const [updateAnswerObj, answerObj, userAnswerArr, answerString] = useAnswer();
  const user = useRecoilValue(userState);
  const date = useRecoilValue(testDate);
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
    let seq = null;
    try {
      seq = await api
        .submitTestAnswer({
          ...user,
          startDtm: date,
          answers: answerString,
        })
        .then(res => {
          const seq = res.url.split("seq=").pop();
          return seq;
        });
    } catch (error) {
      console.log(error);
    }
    if (seq !== null) {
      navigate("/completed", { state: { seq } });
    }
  };

  const onClickResulttest = async () => {
    let seq = null;
    try {
      seq = await api
        .submitTestAnswer({
          ...user,
          startDtm: date,
          answers:
            "B1=1 B2=3 B3=5 B4=7 B5=9 B6=11 B7=13 B8=15 B9=17 B10=19 B11=21 B12=23 B13=25 B14=27 B15=29 B16=31 B17=33 B18=35 B19=37 B20=39 B21=41 B22=43 B23=45 B24=47 B25=49 B26=51 B27=53 B28=55",
        })
        .then(res => {
          const seq = res.url.split("seq=").pop();
          return seq;
        });
    } catch (error) {
      console.log(error);
    }
    if (seq !== null) {
      navigate("/completed", { state: { seq } });
    }
  };

  return (
    <STestPageBlock>
      <SWrap>
        <STitle>?????? ??????</STitle>
        <ProgressBar progress={progress} total={questionList.length} />
        {renderList.map((e, i) => (
          <Question
            key={i}
            data={e}
            renderAnswer={renderAnswerList[i]}
            onSelect={onAnswerSelect}
          />
        ))}
        {currentStep > 0 && <Button onClick={onClickPrev}>??????</Button>}
        {questionStep - 1 > currentStep ? (
          <Button
            onClick={onClickNext}
            disabled={(currentStep + 1) * 5 > Object.keys(answerObj).length}
          >
            ??????
          </Button>
        ) : (
          <Button
            onClick={onClickResult}
            disabled={questionList.length > Object.keys(answerObj).length}
          >
            ????????????
          </Button>
        )}
        <button onClick={onClickResulttest}>test</button>
      </SWrap>
    </STestPageBlock>
  );
};
const STestPageBlock = styled.div`
  padding: 0 10%;
  text-align: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: 600px;
  }
`;
const SWrap = memo(styled.div`
  padding: 50px 0;
`);
const STitle = memo(styled.h2`
  margin: 0;
  padding: 10px 0;
`);

export default TestPage;
