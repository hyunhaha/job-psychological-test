import React, { useRef } from "react";
import styled from "styled-components";

const UserName = ({ onChangeName, isName, nameMessage }) => {
  const nameRef = useRef();

  const onChangeHandler = () => {
    onChangeName(nameRef.current.value);
  };
  return (
    <SUserNameBlock>
      <SUserNameInput
        type="text"
        ref={nameRef}
        placeholder="이름"
        onChange={onChangeHandler}
      />
      <SAlert isDisplay={isName}>{nameMessage}</SAlert>
    </SUserNameBlock>
  );
};

const SUserNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
const SUserNameInput = styled.input`
  border: none;
  border: 2px solid #ffffff00;
  border-radius: 10px;
  padding: 10px 20px;
  outline: none;
  margin-bottom: 10px;
  &:focus {
    border: 2px solid #8698e7;
  }
`;
const SAlert = styled.div`
visibility:${props => (props.isDisplay ? "hidden" : "visible")};
  color: #8698e7;
  font-size: 14px;
}`;

export default UserName;
