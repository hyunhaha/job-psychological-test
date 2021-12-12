import React from "react";
import styled from "styled-components";

const UserGender = ({ onChangeGender, gender }) => (
  <SGenderBlock>
    <SRadiosWrap>
      <SRadioWrap>
        <input
          type="radio"
          id="female"
          name="sex"
          value={100324}
          onChange={onChangeGender}
        />
        <label htmlFor="female">여자</label>
      </SRadioWrap>
      <SRadioWrap>
        <input
          type="radio"
          id="male"
          name="sex"
          value={100323}
          onChange={onChangeGender}
        />
        <label htmlFor="male">남자</label>
      </SRadioWrap>
    </SRadiosWrap>
    <SAlert isDisplay={gender}>성별을 선택하세요</SAlert>
  </SGenderBlock>
);
const SGenderBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  }
`;
const SRadiosWrap = styled.div`
  padding: 10px 10px;
  display: flex;
`;
const SRadioWrap = styled.div`
  flex: 1 1 0%;
  text-align: center;
`;

const SAlert = styled.div`
visibility:${props => (props.isDisplay ? "hidden" : "visible")};
  color: #8698e7;
  font-size: 14px;
  text-align: left;
}`;
export default UserGender;
