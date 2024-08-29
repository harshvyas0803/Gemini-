import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ContextProvider from './context/Context.jsx';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './config/ThemeContext.jsx'; 
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <StrictMode>
    <ContextProvider>
    
      <App />
    
    </ContextProvider>
    <ToastContainer />
  </StrictMode>,
  </ThemeProvider>,
  document.getElementById('root')
);
