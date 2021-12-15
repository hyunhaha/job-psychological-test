import React, { useMemo } from "react";
import styled from "styled-components";
import TestResultChartBar from "./TestResultChartBar";

const TestResultChart = ({ info }) => {
  const maxScore = useMemo(() => {
    if (Array.isArray(info)) {
      return Math.max(...info.map(({ score }) => score));
    }
    return 1;
  }, [info]);

  return (
    <SChartBlock>
      <SHeighstock />
      <SBarWrap>
        {info.map((e, i) => (
          <TestResultChartBar key={i} value={e} maxScore={maxScore} />
        ))}
      </SBarWrap>
    </SChartBlock>
  );
};

const SChartBlock = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 48px;
`;

const SHeighstock = styled.div`
  height: 200px;
`;

const SBarWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export default TestResultChart;
