import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TestProvider } from './provider/testProvider';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TestProvider>
        <RecoilRoot>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </RecoilRoot>
      </TestProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
