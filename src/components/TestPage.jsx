import axios from "axios";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Question from "./Question";

const TestPage = props => {
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
        console.log(data);
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
    console.log(answerList);
    console.log(Object.keys(answerList).length);
  };
  return (
    <div>
      <h2>검사 진행</h2>
      {renderList.map((e, i) => (
        <Question key={i} data={e} onSelect={onSelect} />
      ))}
      {questionStep - 1 > currentStep ? (
        <button
          onClick={onClickNext}
          disabled={(currentStep + 1) * 5 > Object.keys(answerList).length}
        >
          다음
        </button>
      ) : (
        <button
          onClick={onClickResult}
          disabled={list.length > Object.keys(answerList).length}
        >
          결과보기
        </button>
      )}
    </div>
  );
};

export default TestPage;
