import React from 'react'; // Import React
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// ProductProvider is in App.jsx, wrapping its content.
// No changes needed here if App.jsx handles its own provider.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
