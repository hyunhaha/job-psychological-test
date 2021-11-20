import React, { useState } from "react";
import { useNavigate } from "react-router";
import Question from "./Question";

const IntroPage = props => {
  const navigator = useNavigate();

  const data = {
    question: "두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.",
    answer01: "능력발휘",
    answer02: "자율성",
    answer03: "직업을 통해 자신의 능력을 발휘하는 것입니다.",
    answer04: "일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다.",
    answerScore01: "1",
    answerScore02: "2",
    qitemNo: 1,
  };
  const [answer, setAnswer] = useState(0);

  const onSelect = (q, a) => {
    setAnswer(a);
  };

  const onClickTestStart = e => {
    navigator("/test");
  };

  return (
    <div>
      <h1>검사예시</h1>
      <div>
        <p>
          직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
        </p>
        <p>
          가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
        </p>
      </div>
      <Question data={data} onSelect={onSelect} />
      <button onClick={onClickTestStart} disabled={answer === 0}>
        검사 시작하기
      </button>
    </div>
  );
};

export default IntroPage;
