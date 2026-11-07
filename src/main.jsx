import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
            borderRadius: '4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            padding: '10px 14px',
            boxShadow: '0 8px 24px -8px rgba(26, 23, 20, 0.35)',
          },
          success: { iconTheme: { primary: 'var(--color-brass)', secondary: 'var(--color-ink)' } },
          error: { iconTheme: { primary: 'var(--color-brick-on-ink)', secondary: 'var(--color-ink)' } },
        }}
      />
    </AuthProvider>
  </StrictMode>,
)
