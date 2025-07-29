import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { AppProvider } from './context/AppProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </StrictMode>
  </BrowserRouter>
);
