import './index.css';

import ReactDOM from 'react-dom/client';
import AppContainer from './AppContainer';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
);
