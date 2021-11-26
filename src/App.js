
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import IntroPage from './components/IntroPage';
import TestPage from './components/TestPage';
import TestCompletedPage from './components/TestCompletedPage/TestCompletedPage';
import TestResultPage from './components/TestResultPage/TestResultPage';
import { useState } from 'react';
import api from './components/utils/api/test';
import { useTestState } from './provider/testProvider';
// import { TestProvider } from './provider/testProvider';

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const getStartUserInfo = (info) => {
    setUserInfo(info)
  }

  const getUserAnswer = async (answers) => {
    api.submitTestAnswer({
      ...userInfo, answers
    })
      .then(res => {
        const seq = res.url.split('seq=').pop();
        navigate('/completed', { state: { seq } })
      })
  }
  const resetTest = () => {
    setUserInfo({});

  }
  return (
    <div className="App">
      <Routes >
        <Route path="/" element={<LandingPage getStartUserInfo={getStartUserInfo} />} />
        <Route path='/intro' element={<IntroPage />} />
        <Route path='/test' element={<TestPage getUserAnswer={getUserAnswer} />} />
        <Route path='/completed' element={<TestCompletedPage userName={userInfo.name} />} />
        <Route path='/result' element={<TestResultPage userInfo={userInfo} resetTest={resetTest} />} />
      </Routes>

    </div>
  );
}

export default App;
