import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useTestState } from "../../provider/testProvider";
import UserGender from "./UserGender";
import UserName from "./UserName";

const UserForm = props => {
  const navigator = useNavigate();
  const { dispatch } = useTestState();

  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("이름을 입력하세요");
  const [gender, setGender] = useState(0);

  const onChangeName = name => {
    setName(name);
    if (name.length < 2 || name.length > 6) {
      setIsName(false);
      setNameMessage("2글자 이상 6글자 미만으로 이름을 입력해주세요.");
    } else {
      setIsName(true);
    }
  };

  const onChangeGender = e => {
    setGender(Number(e.target.value));
  };

  const onclickStart = e => {
    e.preventDefault();
    const startDtm = new Date();
    dispatch({ type: "SET_USER", data: { name, gender } });
    dispatch({ type: "SET_DATE", data: startDtm });
    navigator("/intro");
  };

  return (
    <SUserForm>
      <STitle>검사를 위해 정보 입력해주세요</STitle>
      <UserName
        onChangeName={onChangeName}
        isName={isName}
        nameMessage={nameMessage}
      />
      <UserGender onChangeGender={onChangeGender} gender={gender} />
      <SStartButton
        type="submit"
        disabled={!isName || !gender}
        onClick={onclickStart}
      >
        테스트 시작
      </SStartButton>
    </SUserForm>
  );
};
const SUserForm = styled.div`
  width: 300px;
  margin: 0 auto;
  background-color: #ffffff70;
  padding: 8%;
  box-sizing: border-box;
  border-radius: 20px;
`;
const STitle = styled.h4`
  margin: 0;
  padding: 20px 0;
  text-align: left;
  text-align: center;
`;
const SStartButton = styled.button`
  width: 100%;
  border: none;
  height: 30px;
  border-radius: 10px;
  background-color: #7f7fd550;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

export default UserForm;
