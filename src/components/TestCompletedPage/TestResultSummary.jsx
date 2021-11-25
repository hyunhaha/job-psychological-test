import React from "react";
import styled from "styled-components";

const TestResultSummary = ({
  userName,
  sortedResultScore,
  matchJobs1,
  matchJobs2,
}) => {
  const part = [
    "능력발휘",
    "자율성",
    "보수",
    "안정성",
    "사회적 안정",
    "사회봉사",
    "자기계발",
    "창의성",
  ];
  return (
    <div>
      <SResult>
        <SHighlight>{userName ? userName : "사용자"}</SHighlight>님는{" "}
        <SHighlight>
          {sortedResultScore.length !== 0 && part[sortedResultScore[0].key]}
        </SHighlight>
        을 중요시 여기는 성향이므로
      </SResult>
      <SResult>
        <SHighlight>{matchJobs1}</SHighlight> 또는{" "}
        <SHighlight>{matchJobs2}</SHighlight>에 적합합니다.
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
