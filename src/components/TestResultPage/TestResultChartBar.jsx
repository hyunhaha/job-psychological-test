import React from "react";
import styled from "styled-components";

const TestResultChartBar = ({ value, maxScore }) => {
  const interpretationNames = [
    "능력발휘",
    "자율성",
    "보수",
    "안정성",
    "사회적 인정",
    "사회봉사",
    "자기계발",
    "창의성",
  ];

  return (
    <SChartBarBlock>
      <SBar score={value.score} maxScore={maxScore}>
        <SValue>{value.score}</SValue>
        <SAbility>{interpretationNames[value?.key - 1]}</SAbility>
      </SBar>
    </SChartBarBlock>
  );
};

const SChartBarBlock = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
`;

const SBar = styled.div`
  position: relative;
  width: 80%;
  height: ${props => (props.score / props.maxScore) * 80}%;
  background-color: #86a8e770;
`;

const SValue = styled.div`
  position: absolute;
  text-align: center;
  bottom: 100%;
  width: 100%;
`;

const SAbility = styled.div`
  position: absolute;
  text-align: center;
  top: 100%;
  width: 100%;
  padding-top: 8px;
  font-size: 12px;
`;

export default TestResultChartBar;
