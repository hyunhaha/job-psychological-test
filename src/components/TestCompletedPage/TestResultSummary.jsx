import React from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  resultScore,
  sortedResultScore,
  userState,
  jobsByEduLevel,
  jobsByMajor,
} from "../../atoms/atoms";
// import { useTestState } from "../../provider/testProvider";
import { abilityNames } from "../../utils/contents";

const TestResultSummary = props => {
  // const { state } = useTestState();
  const user = useRecoilValue(userState);
  const test = useRecoilValue(resultScore);
  const sorted = useRecoilValue(sortedResultScore);
  const edu = useRecoilValue(jobsByEduLevel);
  const major = useRecoilValue(jobsByMajor);
  useEffect(() => {
    console.log(user);
    console.log(test);
    console.log(sorted);

    console.log(abilityNames[sorted[0].key - 1]);
    console.log(edu);
  }, [user, test, sorted, edu]);
  return (
    <div>
      <SResult>
        <SHighlight>{user.name}</SHighlight>
        님는 <SHighlight>{abilityNames[sorted[0].key - 1]}</SHighlight>을 중요시
        여기는 성향이므로
      </SResult>
      <SResult>
        {/* <SHighlight>{edu[0][1]}</SHighlight> 또는{" "}
        <SHighlight>{major[0][1]}</SHighlight>에 적합합니다. */}
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
