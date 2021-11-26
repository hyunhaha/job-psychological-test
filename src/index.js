import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TestProvider } from './provider/testProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TestProvider><App /></TestProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
