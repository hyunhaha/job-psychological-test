import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  sortedResultScore,
  userState,
  jobsByEduLevel,
  jobsByMajor,
} from "../../atoms/atoms";
import { abilityNames } from "../../utils/contents";

const TestResultSummary = props => {
  const user = useRecoilValue(userState);
  const sorted = useRecoilValue(sortedResultScore);
  const edu = useRecoilValue(jobsByEduLevel);
  const major = useRecoilValue(jobsByMajor);
  return (
    <div>
      <SResult>
        <SHighlight>{user.name}</SHighlight>
        님는{" "}
        <SHighlight>{sorted[0] && abilityNames[sorted[0].key - 1]}</SHighlight>
        을 중요시 여기는 성향이므로
      </SResult>
      <SResult>
        <SHighlight>{edu[0] && edu[0][1]}</SHighlight> 또는{" "}
        <SHighlight>{major[0] && major[0][1]}</SHighlight>에 적합합니다.
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
