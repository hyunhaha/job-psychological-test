
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import IntroPage from './components/IntroPage';
import TestPage from './components/TestPage';
import TestCompletedPage from './components/TestCompletedPage';
import TestResultPage from './components/TestResultPage';

function App() {

  return (
    <div className="App">
      <Link to='/'>LandingPage</Link>
      <Link to='/intro'>IntroPage</Link>
      <Link to='/test'>TestPage</Link>
      <Link to='/completed'>TestCompletedPage</Link>
      <Link to='/result'>TestResultPage</Link>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path='/intro' element={<IntroPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/completed' element={<TestCompletedPage />} />
        <Route path='/result' element={<TestResultPage />} />
      </Routes>

    </div>
  );
}

export default App;
