import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import SpotifyCallback from './components/SpotifyCallback.tsx';
import './index.css';

// Simple routing: check if we're on the callback URL
const isCallback = window.location.pathname === '/callback' || window.location.search.includes('code=');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isCallback ? <SpotifyCallback /> : <App />}
  </StrictMode>
);
