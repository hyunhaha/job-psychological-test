
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import IntroPage from './components/IntroPage';
import TestPage from './components/TestPage';
import TestCompletedPage from './components/TestCompletedPage/TestCompletedPage';
import TestResultPage from './components/TestResultPage/TestResultPage';
import { useEffect, useState } from 'react';
import api from './components/utils/api/test';
import { useTestState } from './provider/testProvider';
// import { TestProvider } from './provider/testProvider';

function App() {
  const navigate = useNavigate();
  // const state = useTestState();
  //객체로 바꾸기
  // const [userName, setUserName] = useState('');
  // const [userSex, setUserSex] = useState(0);
  // const [testStartTime, setTEstStateTime] = useState('');

  const [userInfo, setUserInfo] = useState({});
  const getStartUserInfo = (info) => {
    console.log(info)
    setUserInfo(info)
    // setUserName(name);
    // setUserSex(sex);
  }

  const getUserAnswer = async (answers) => {
    // setUserAnswer(answer);
    // api.submitTestAnswer(userName, userSex, new Date().getTime(), answer)
    // setUserAnswer(answers);
    api.submitTestAnswer({
      ...userInfo, answers
    })
      .then(res => {
        console.log(res)
        const seq = res.url.split('seq=').pop();
        navigate('/completed', { state: { seq } })
      })
  }
  const resetTest = () => {
    console.log('reset')
    setUserInfo({});

  }
  return (
    <div className="App">
      {/* <Link to='/'>LandingPage</Link>
      <Link to='/intro'>IntroPage</Link>
      <Link to='/test'>TestPage</Link>
      <Link to='/completed'>TestCompletedPage</Link>
      <Link to='/result'>TestResultPage</Link> */}
      <Routes >
        <Route path="/" element={<LandingPage getStartUserInfo={getStartUserInfo} />} />
        <Route path='/intro' element={<IntroPage />} />
        <Route path='/test' element={<TestPage getUserAnswer={getUserAnswer} />} />
        {/* <ContextRoute Provider={TestProvider} Component={TestPage} /> */}
        <Route path='/completed' element={<TestCompletedPage userName={userInfo.name} />} />
        <Route path='/result' element={<TestResultPage userInfo={userInfo} resetTest={resetTest} />} />
      </Routes>

    </div>
  );
}

export default App;
