import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';
import './index.css';
import App from './App.jsx';

// BrowserRouter has to wrap App here rather than live inside it -- useRoutes
// throws if it runs outside a router context.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
