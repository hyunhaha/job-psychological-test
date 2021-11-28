import React from "react";
import styled from "styled-components";
import UserForm from "./UserForm";

const LandingPage = props => {
  return (
    <SLandingPageBlock>
      <SWrap>
        <SPart>
          <h1>직업 가치관 검사</h1>
        </SPart>
        <SPart>
          <UserForm />
        </SPart>
      </SWrap>
    </SLandingPageBlock>
  );
};

const SLandingPageBlock = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
`;
const SWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  align-items: center;
  box-sizing: border-box;
`;
const SPart = styled.div`
  flex: 1 1 0%;
  text-align: center;
`;
export default LandingPage;
