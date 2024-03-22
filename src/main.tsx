import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/theme-context.tsx'
import { ClerkProvider, RedirectToSignIn, SignUp, SignedIn, SignedOut, UserButton, use } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <App />
        </SignedIn>
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
