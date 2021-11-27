import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../Button";
import TestResultSummary from "./TestResultSummary";
import api from "../utils/api/test";
import { useTestDispatch, useTestState } from "../../provider/testProvider";
import { setReportData } from "../utils/settingData";

const TestCompletedPage = () => {
  const navigate = useNavigate();
  const state = useTestState();
  const dispatch = useTestDispatch();

  const onClickResult = () => {
    navigate("/result");
  };

  return (
    <STestCompletedBlock>
      <div>
        <h1>검사가 완료되었습니다</h1>
        <p>
          검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
          생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해
          생각해 볼 기회를 제공합니다.
        </p>
        <TestResultSummary />
        <Button disabled={false} onClick={onClickResult}>
          결과보기
        </Button>
      </div>
    </STestCompletedBlock>
  );
};
const STestCompletedBlock = styled.div`
  text-align: center;
  width: 600px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export default TestCompletedPage;
