import React, { useRef, useState } from "react";
import styled from "styled-components";
import UserForm from "./UserForm";

const LandingPage = ({ getUserNameSex }) => {
  return (
    <SLandingPageBlock>
      <div className="wrap">
        <div className="left">
          <h1>직업 심리 검사</h1>
        </div>
        <div className="right">
          <UserForm getUserNameSex={getUserNameSex} />
        </div>
      </div>
    </SLandingPageBlock>
  );
};

const SLandingPageBlock = styled.div`
  height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  .wrap {
    display: flex;
    flex-direction: row;
    height: 100vh;
    align-items: center;
    box-sizing: border-box;
  }
  .left {
    flex: 1 1 0%;
    text-align: center;
  }
  .right {
    flex: 1 1 0%;
  }
`;

export default LandingPage;
