// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACh9Z0cztFqm_u6mTkUiefwZyzlfFf7jU",
    authDomain: "netflix-gpt-83477.firebaseapp.com",
    projectId: "netflix-gpt-83477",
    storageBucket: "netflix-gpt-83477.appspot.com",
    messagingSenderId: "776402616387",
    appId: "1:776402616387:web:c2a49948f92122359854f6",
    measurementId: "G-9297KMZG16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics;