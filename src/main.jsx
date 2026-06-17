import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/i18n.js';
import App from './App.jsx';
import { DarkModeProvider } from './component/DarkModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
