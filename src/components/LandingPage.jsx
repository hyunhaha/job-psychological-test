import React, { useRef, useState } from "react";
import styled from "styled-components";

const LandingPage = props => {
  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("");

  const [sex, setSex] = useState("");

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
    setSex(e.target.value);
  };

  const onSubmit = () => {
    console.log(name, sex);
  };

  return (
    <SLandingPageBlock>
      <div className="wrap">
        <div className="part1">
          <h1>직업 심리 검사</h1>
        </div>
        <div className="part2">
          <div className="part2-wrap">
            <h4 className="title">검사를 위해 정보 입력해주세요</h4>
            <form className="form" action="submit">
              <div className="name">
                <label className="name-label" htmlFor="name">
                  이름
                </label>
                <input
                  className="name-input"
                  type="text"
                  id="name"
                  ref={nameRef}
                  placeholder="이름을 입력하세요"
                  onChange={onChangeName}
                />
                <SAlert isDisplay={isName}>{nameMessage}</SAlert>
              </div>

              <div className="sex">
                <label>성별</label>
                <div className="sex-radios">
                  <div className="radio-female">
                    <input
                      type="radio"
                      id="female"
                      name="sex"
                      value="F"
                      onChange={onChangeSex}
                    />
                    <label htmlFor="female">여자</label>
                  </div>
                  <div className="radio-male">
                    <input
                      type="radio"
                      id="male"
                      name="sex"
                      value="M"
                      onChange={onChangeSex}
                    />
                    <label htmlFor="male">남자</label>
                  </div>
                </div>
                <SAlert isDisplay={sex}>성별을 선택하세요</SAlert>
              </div>
            </form>
            <div></div>
            <button
              className="start-button"
              type="submit"
              disabled={!isName || !sex}
              onClick={onSubmit}
            >
              테스트 시작
            </button>
          </div>
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
  .part1 {
    flex: 1 1 0%;
    text-align: center;
  }
  .part2 {
    flex: 1 1 0%;
  }
  .part2-wrap {
    width: 400px;
    margin: 0 auto;
    background-color: #ffffff70;
    padding: 10%;
    box-sizing: border-box;
    border-radius: 20px;
  }
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
    border: 2px solid white;
    border-radius: 10px;
    padding: 10px 20px;
    outline: none;
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
  }
  .radio-male {
    flex: 1 1 0%;
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
  }
`;
const SAlert = styled.div`
  display:${props => (props.isDisplay ? "none" : "block")};
  color: #8698e7;
  font-size: 14px:`;

export default LandingPage;
