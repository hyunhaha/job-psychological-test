import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../commons/Button";
import ProgressBar from "../commons/ProgressBar";
import Question from "../commons/Question";
import { introAnswer } from "../../utils/contents";

const IntroPage = props => {
  const navigator = useNavigate();
  const [answer, setAnswer] = useState([]);
  const onSelect = (q, a) => {
    setAnswer(cur => {
      const newList = [...cur];
      newList.push([a]);
      return newList;
    });
  };

  const onClickTestStart = e => {
    navigator("/test");
  };

  const progress = useMemo(() => {
    if (answer.length !== 0) return 100;
    else return 0;
  }, [answer]);

  return (
    <SIntroPageBlock>
      <div>
        <STitle>검사예시</STitle>
        <ProgressBar progress={progress} total={answer.length} />
        <div>
          <SDes>
            직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에
            표시하세요.
          </SDes>
          <SDes>
            가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을
            확인해보세요.
          </SDes>
        </div>
        <Question data={introAnswer} onSelect={onSelect} />
        <Button onClick={onClickTestStart} disabled={answer.length === 0}>
          검사 시작하기
        </Button>
      </div>
    </SIntroPageBlock>
  );
};
const SIntroPageBlock = styled.div`
  text-align: center;
  width: 600px;
  height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const SDes = styled.p`
  margin: 0;
  padding-bottom: 10px;
`;
const STitle = styled.h1`
  margin: 0;
  padding: 20px 0;
`;
export default IntroPage;
