import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useTestState } from "../provider/testProvider";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import api from "./utils/api/test";

const useClick = initial => {
  const [currentStep, setCurrentStep] = useState(initial);
  const onClickNext = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onClickPrev = () => {
    setCurrentStep(cur => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (cur > 0) return cur - 1;
      else return cur;
    });
  };

  return [currentStep, onClickNext, onClickPrev];
};

const TestPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useTestState();
  const [currentStep, onClickNext, onClickPrev] = useClick(0);

  const [list, setLIst] = useState([]);
  const [questionStep, setQuestionStep] = useState(0);
  const [answerObj, setAnswerObj] = useState({});

  useEffect(() => {
    api
      .getTestQuestion(6)
      .then(data => {
        // dispatch({ type: "SET_QUESTIONS", data: data });
        setLIst(data);
        setQuestionStep(Math.ceil(data.length / 5));
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  const renderList = useMemo(() => {
    return list.slice(currentStep * 5, currentStep * 5 + 5);
  }, [currentStep, list]);

  const onAnswerSelect = (
    questionNumber,
    answerScore,
    selectedAnswerNumber
  ) => {
    setAnswerObj(cur => {
      const newObj = { ...cur };
      newObj[questionNumber] = [answerScore, selectedAnswerNumber];
      return newObj;
    });
  };

  const UsesrAnswerObjToArr = useMemo(() => {
    return Object.entries(answerObj);
  }, [answerObj]);

  const renderAnswerList = useMemo(() => {
    const getAnswerList = UsesrAnswerObjToArr.slice(
      currentStep * 5,
      currentStep * 5 + 5
    );
    const arr = Array(5).fill(null);
    getAnswerList.forEach(e => (arr[e[0] - 1 - currentStep * 5] = e[1][1]));
    return arr;
  }, [currentStep, UsesrAnswerObjToArr]);

  const answerString = useMemo(() => {
    return UsesrAnswerObjToArr.map(
      ([key, value]) => `B${key}=${value[0]}`
    ).join(" ");
  }, [UsesrAnswerObjToArr]);

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
  const testclick = async () => {
    try {
      await api
        .submitTestAnswer({
          ...state.user,
          startDtm: state.date,
          answers:
            "B1=1 B2=3 B3=5 B4=7 B5=9 B6=11 B7=13 B8=15 B9=17 B10=19 B11=21 B12=23 B13=25 B14=27 B15=29 B16=31 B17=33 B18=35 B19=37 B20=39 B21=41 B22=43 B23=45 B24=47 B25=49 B26=51 B27=53 B28=55",
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
  const progress = useMemo(() => {
    if (UsesrAnswerObjToArr.length > 0) {
      return Math.ceil((UsesrAnswerObjToArr.length / list.length) * 100);
    } else return 0;
  }, [list, UsesrAnswerObjToArr]);

  return (
    <STestPageBlock>
      <SWrap>
        <STitle>검사 진행</STitle>
        <ProgressBar progress={progress} />
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
            disabled={list.length > Object.keys(answerObj).length}
          >
            결과보기
          </Button>
        )}
        <Button onClick={testclick}>test button</Button>
      </SWrap>
    </STestPageBlock>
  );
};
const STestPageBlock = styled.div`
  height: 100%;
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
