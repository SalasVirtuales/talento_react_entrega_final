import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap with BrowserRouter for routing context */}
      <AuthProvider> {/* Wrap with AuthProvider for authentication context */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
