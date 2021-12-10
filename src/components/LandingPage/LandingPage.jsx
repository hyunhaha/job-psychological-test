import React from "react";
import styled from "styled-components";
import UserForm from "./UserForm";

const LandingPage = props => {
  return (
    <SLandingPageBlock>
      <SWrap>
        <h1>직업 가치관 검사</h1>
        <div>
          <UserForm />
        </div>
      </SWrap>
    </SLandingPageBlock>
  );
};
const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 992;
const BREAK_POINT_PC = 1200;
const SLandingPageBlock = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
`;
const SWrap = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export default LandingPage;
