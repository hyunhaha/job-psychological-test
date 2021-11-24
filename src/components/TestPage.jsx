import axios from "axios";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Question from "./Question";

const TestPage = ({ getUserAnswer }) => {
  const [list, setLIst] = useState([]);
  const [questionStep, setQuestionStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [answerList, setAnswerList] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://www.career.go.kr/inspct/openapi/test/questions?apikey=5037c661501070d53c880f0f17d6f7fa&q=6"
      )
      .then(res => res.data.RESULT)
      .then(data => {
        setLIst(data);
        setQuestionStep(Math.ceil(data.length / 5));
      });
  }, []);

  const renderList = useMemo(() => {
    return list.slice(currentStep * 5, currentStep * 5 + 5);
  }, [currentStep, list]);

  const onClickNext = e => {
    setCurrentStep(currentStep + 1);
  };

  const onSelect = (q, a) => {
    setAnswerList(cur => {
      const newObj = { ...cur };
      newObj[q] = a;
      return newObj;
    });
  };

  const onClickResult = () => {
    const answerString = Object.entries(answerList)
      .map(([key, value]) => `B${key}=${value}`)
      .join(" ");
    getUserAnswer(answerString);
  };

  return (
    <STestPageBlock>
      {/* <h2>검사 진행</h2> */}
      {renderList.map((e, i) => (
        <Question key={i} data={e} onSelect={onSelect} />
      ))}
      {questionStep - 1 > currentStep ? (
        <button
          className="next-button"
          onClick={onClickNext}
          disabled={(currentStep + 1) * 5 > Object.keys(answerList).length}
        >
          다음
        </button>
      ) : (
        <button
          className="next-button"
          onClick={onClickResult}
          disabled={list.length > Object.keys(answerList).length}
        >
          결과보기
        </button>
      )}
      <button
        onClick={() => {
          getUserAnswer(
            "B1=1 B2=3 B3=5 B4=7 B5=9 B6=11 B7=13 B8=15 B9=17 B10=19 B11=21 B12=23 B13=25 B14=27 B15=29 B16=31 B17=33 B18=35 B19=37 B20=39 B21=41 B22=43 B23=45 B24=47 B25=49 B26=51 B27=53 B28=55"
          );
        }}
      >
        test button
      </button>
    </STestPageBlock>
  );
};
const STestPageBlock = styled.div`
  padding: 20px 10%;
  text-align: center;
  width: 600px;
  margin: 0 auto;
  .next-button {
    border: none;
    border-radius: 10px;
    width: 100px;
    height: 50px;
    background-color: #7f7fd550;
    font-weight: bolder;
  }
`;

export default TestPage;
