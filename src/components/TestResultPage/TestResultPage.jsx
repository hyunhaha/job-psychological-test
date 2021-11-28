import React from "react";
import { useNavigate } from "react-router";
import JobTable from "./JobTable";
import UserInfoTable from "./UserInfoTable";
import TestResultChart from "./TestResultChart";
import styled from "styled-components";
import Button from "../commons/Button";
import { educationLevelNames, majorNames } from "../../utils/contents";
import { useTestState } from "../../provider/testProvider";

const TestResultPage = props => {
  const navigate = useNavigate();
  const { state, dispatch } = useTestState();

  const gotoStart = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };
  return (
    <STestResultPageBlock>
      <SWrap>
        <SPartWrap>
          <STitle>직업가치관검사 결과표</STitle>
          <SText>
            직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
            신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는
            무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이
            직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를
            알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수
            있는 직업에 대해 생각해 볼 기회를 제공합니다.
          </SText>
          <UserInfoTable user={state.user} date={state.date} />
        </SPartWrap>

        <SPartWrap>
          <h2>직업가치관 결과</h2>
          <TestResultChart />
        </SPartWrap>

        <JobTable
          partNames={educationLevelNames}
          info={state.jobsByEduLevel}
          title={"종사자 평균 학력별"}
        />

        <JobTable
          partNames={majorNames}
          info={state.jobsByMajor}
          title={"종사자 평균 전공별"}
        />

        <Button onClick={gotoStart}>테스트 다시하기</Button>
      </SWrap>
    </STestResultPageBlock>
  );
};

const STestResultPageBlock = styled.div`
  height: 100%;
  padding: 0 10%;
  text-align: center;
  width: 600px;
  margin: 0 auto;
`;
const SWrap = styled.div`
  padding: 50px 0;
`;
const STitle = styled.h1`
  margin: 0;
  padding: 20px 0;
`;
const SText = styled.p`
  margin: 0;
  padding: 10px;
  text-align: left;
`;

const SPartWrap = styled.div`
  padding-bottom: 50px;
`;
export default TestResultPage;
