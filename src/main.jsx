
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './component/DarkModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
        <App />
    </DarkModeProvider>
)
