import { useMemo, useState } from "react";
import api from "../../utils/api";

export const useStep = initial => {
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

export const useList = () => {
  const [questionList, setQuestionList] = useState([]);
  const [questionStep, setQuestionStep] = useState(0);
  const questionRequestSetNumber = 6;

  const getTestQuestion = async () => {
    await api
      .getTestQuestion(questionRequestSetNumber)
      .then(data => {
        setQuestionList(data);
        setQuestionStep(Math.ceil(data.length / 5));
      })
      .catch(err => console.log(err));
  };
  return [questionList, questionStep, getTestQuestion];
};

export const useAnswer = () => {
  const [answerObj, setAnswerObj] = useState({});
  const updateAnswerObj = (
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
  const userAnswerArr = useMemo(() => {
    return Object.entries(answerObj);
  }, [answerObj]);

  const answerString = useMemo(() => {
    return userAnswerArr.map(([key, value]) => `B${key}=${value[0]}`).join(" ");
  }, [userAnswerArr]);
  return [updateAnswerObj, answerObj, userAnswerArr, answerString];
};
