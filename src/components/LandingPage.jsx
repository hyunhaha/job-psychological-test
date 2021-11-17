import React, { useRef, useState } from "react";

const LandingPage = props => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");

  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("이름을 입력하세요");

  const nameRef = useRef();

  const onChangeName = () => {
    setName(nameRef.current.value);
    if (name.length < 2 || name.length > 6) {
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
    <div>
      <form action="submit">
        <label htmlFor="name">이름</label>
        <input type="text" name="name" ref={nameRef} onChange={onChangeName} />
        <label htmlFor="sex">성별</label>
        <input type="radio" name="sex" value="F" onChange={onChangeSex} />여
        <input type="radio" name="sex" value="M" onChange={onChangeSex} />남
      </form>
      <button type="submit" disabled={!isName || !sex} onClick={onSubmit}>
        테스트 시작
      </button>
      {!isName && <span>{nameMessage}</span>}
      {!sex && <span>성별을 선택하세요</span>}
    </div>
  );
};

export default LandingPage;
