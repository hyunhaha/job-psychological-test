
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import IntroPage from './components/IntroPage';
import TestPage from './components/TestPage';
import TestCompletedPage from './components/TestCompletedPage';
import TestResultPage from './components/TestResultPage';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [userSex, setUserSex] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const getUserNameSex = (name, sex) => {
    setUserName(name);
    setUserSex(sex);
  }

  const getUserAnswer = (answer) => {
    setUserAnswer(answer);
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
        <Route path='/completed' element={<TestCompletedPage />} />
        <Route path='/result' element={<TestResultPage />} />
      </Routes>

    </div>
  );
}

export default App;
