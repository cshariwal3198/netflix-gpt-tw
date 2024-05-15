import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/theme-context.tsx'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { SignInContainer } from './components/sign-in-component.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <SignedOut>
            <SignInContainer />
          </SignedOut>
          <SignedIn>
            <App />
          </SignedIn>
        </ClerkProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
