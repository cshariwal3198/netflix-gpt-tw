import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/theme-context.tsx'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { SignInContainer } from './components/sign-in-component.tsx'
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import enJson from '../public/locale/en/app.json';
import frJson from '../public/locale/fr/app.json';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

i18next.use(initReactI18next).init({
  lng: localStorage.getItem('locale') || 'en',     // Set the initial language of the App
  resources: {
    en: { app: enJson },
    fr: { app: frJson }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
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
    </I18nextProvider>
  </React.StrictMode>,
)
