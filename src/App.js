
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import IntroPage from './components/IntroPage';
import TestPage from './components/TestPage';
import TestCompletedPage from './components/TestCompletedPage';
import TestResultPage from './components/TestResultPage';
import { useEffect, useState } from 'react';
import api from './components/utils/api/test';

function App() {
  const navigate = useNavigate();

  //객체로 바꾸기
  const [userName, setUserName] = useState('');
  const [userSex, setUserSex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const getUserNameSex = (name, sex) => {
    setUserName(name);
    setUserSex(sex);
  }

  const getUserAnswer = async (answer) => {
    setUserAnswer(answer);
    api.submitTestAnswer(userName, userSex, new Date().getTime(), answer)
      .then(res => {
        console.log(res)
        const seq = res.url.split('seq=').pop();
        navigate('/completed', { state: { seq } })
      })
  }

  return (
    <div className="App">
      <Link to='/'>LandingPage</Link>
      <Link to='/intro'>IntroPage</Link>
      <Link to='/test'>TestPage</Link>
      <Link to='/completed'>TestCompletedPage</Link>
      <Link to='/result'>TestResultPage</Link>
      <Routes >
        <Route path="/" element={<LandingPage getUserNameSex={getUserNameSex} />} />
        <Route path='/intro' element={<IntroPage />} />
        <Route path='/test' element={<TestPage getUserAnswer={getUserAnswer} />} />
        <Route path='/completed' element={<TestCompletedPage userName={userName} userSex={userSex} userAnswer={userAnswer} />} />
        <Route path='/result' element={<TestResultPage />} />
      </Routes>

    </div>
  );
}

export default App;
