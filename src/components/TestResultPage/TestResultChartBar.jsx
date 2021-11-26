import React from "react";
import styled from "styled-components";
import { abilityNames } from "../utils/contents";

const TestResultChartBar = ({ value, maxScore }) => {
  return (
    <SChartBarBlock>
      <SBar score={value.score} maxScore={maxScore}>
        <SValue>{value.score}</SValue>
        <SAbility>{abilityNames[value?.key - 1]}</SAbility>
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
