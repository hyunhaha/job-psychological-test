import React, { useEffect } from "react";
import styled from "styled-components";

const ProgressBar = ({ progress }) => {
  useEffect(() => {
    console.log("progress", progress);
  }, [progress]);
  return (
    <SProgressBarBlock>
      <SProgressText progress={progress}>{progress}%</SProgressText>
      <SProgressBorder />
      <SProgressBar progress={progress} />
    </SProgressBarBlock>
  );
};
const SProgressBarBlock = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 0;
`;
const SProgressText = styled.div`
  position: absolute;
  right: 48%;
  bottom: 30%;
  color: ${props => (props.progress < 50 ? "black" : "white")};
`;
const SProgressBorder = styled.div`
  position: absolute;
  border: 1px solid white;
  left: 0;
  right: 0;
  height: 26px;
  border-radius: 10px;
`;
const SProgressBar = styled.div`
  width: ${props => (props.progress > 0 ? props.progress : 1)}%;
  height: 26px;
  background-color: #7d7dcd90;
  border-radius: 10px;
`;
export default ProgressBar;
