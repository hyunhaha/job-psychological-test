import React from "react";
import styled from "styled-components";
import { useTestState } from "../../provider/testProvider";
import { abilityNames } from "../utils/contents";

const TestResultSummary = () => {
  const state = useTestState();

  return (
    <div>
      <SResult>
        <SHighlight>{state.user.name ? state.user.name : "사용자"}</SHighlight>
        님는{" "}
        <SHighlight>
          {state.sortedReportScore.length !== 0 &&
            abilityNames[state.sortedReportScore[0].key]}
        </SHighlight>
        을 중요시 여기는 성향이므로
      </SResult>
      <SResult>
        <SHighlight>
          {state.jobsByEduLevel[0] && state.jobsByEduLevel[0][1]}
        </SHighlight>{" "}
        또는{" "}
        <SHighlight>
          {state.jobsByMajor[0] && state.jobsByMajor[0][1]}
        </SHighlight>
        에 적합합니다.
      </SResult>
    </div>
  );
};
const SResult = styled.p`
  margin: 0;
  font-size: 24px;
  margin-bottom: 1rem;
`;
const SHighlight = styled.span`
  font-weight: bold;
`;

export default TestResultSummary;
