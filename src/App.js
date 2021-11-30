
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import IntroPage from './components/IntroPage/IntroPage';
import TestPage from './components/TestPage/TestPage';
import TestCompletedPage from './components/TestCompletedPage/TestCompletedPage';
import TestResultPage from './components/TestResultPage/TestResultPage';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes >
          <Route path="/" element={<LandingPage />} />
          <Route path='/intro' element={<IntroPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/completed' element={<TestCompletedPage />} />
          <Route path='/result' element={<TestResultPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
