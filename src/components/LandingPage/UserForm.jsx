import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const UserForm = ({ getStartUserInfo }) => {
  const navigator = useNavigate();

  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("이름을 입력하세요");

  const [gender, setGender] = useState(0);

  const nameRef = useRef();

  const onChangeName = () => {
    setName(nameRef.current.value);
    if (nameRef.current.value.length < 2 || nameRef.current.value.length > 6) {
      setIsName(false);
      setNameMessage("2글자 이상 6글자 미만으로 이름을 입력해주세요.");
    } else {
      setIsName(true);
    }
  };

  const onChangeSex = e => {
    setGender(Number(e.target.value));
  };

  const onclickStart = e => {
    e.preventDefault();
    const startDtm = new Date();
    getStartUserInfo({ name, gender, startDtm });
    navigator("/intro");
  };

  return (
    <SUserForm>
      <h4 className="title">검사를 위해 정보 입력해주세요</h4>
      <form className="form">
        <div className="name">
          <input
            className="name-input"
            type="text"
            id="name"
            ref={nameRef}
            placeholder="이름"
            onChange={onChangeName}
            onKeyPress={e => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <SAlert isDisplay={isName}>{nameMessage}</SAlert>
        </div>
        <div className="sex">
          <div className="sex-radios">
            <div className="radio-female">
              <input
                type="radio"
                id="female"
                name="sex"
                value={100324}
                onChange={onChangeSex}
              />
              <label htmlFor="female">여자</label>
            </div>
            <div className="radio-male">
              <input
                type="radio"
                id="male"
                name="sex"
                value={100323}
                onChange={onChangeSex}
              />
              <label htmlFor="male">남자</label>
            </div>
          </div>
          <SAlert isDisplay={gender}>성별을 선택하세요</SAlert>
        </div>
      </form>
      <div></div>
      <button
        className="start-button"
        type="submit"
        disabled={!isName || !gender}
        onClick={onclickStart}
      >
        테스트 시작
      </button>
    </SUserForm>
  );
};
const SUserForm = styled.div`
  width: 400px;
  margin: 0 auto;
  background-color: #ffffff70;
  padding: 10%;
  box-sizing: border-box;
  border-radius: 20px;

  .title {
    margin: 0;
    padding: 20px 0;
  }
  .form {
  }
  .name {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
  }
  .name-label {
    padding: 10px 0;
  }
  .name-input {
    border: none;
    border: 2px solid #ffffff00;
    border-radius: 10px;
    padding: 10px 20px;
    outline: none;
    margin-bottom: 10px;
  }
  .name-input:focus {
    border: 2px solid #8698e7;
  }
  .name-alert {
    color: #8698e7;
    font-size: 14px;
  }
  .sex {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
  }
  .sex-radios {
    padding: 10px 10px;
    display: flex;
  }
  .radio-female {
    flex: 1 1 0%;
    text-align: center;
  }
  .radio-male {
    flex: 1 1 0%;
    text-align: center;
  }
  .sex-alert {
    color: #8698e7;
    font-size: 14px;
  }
  .start-button {
    width: 100%;
    border: none;
    height: 30px;
    border-radius: 10px;
    background-color: #7f7fd550;
  }
  .start-button:hover {
    cursor: pointer;
  }
`;
const SAlert = styled.div`
visibility:${props => (props.isDisplay ? "hidden" : "visible")};
  color: #8698e7;
  font-size: 14px;
}`;

export default UserForm;
