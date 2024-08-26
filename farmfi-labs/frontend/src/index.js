import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Check if the root element exists
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure you have a div with id 'root' in your index.html.");
}
