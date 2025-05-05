// firebaseConfig.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDCSjAB3yOIJOkiAqOd998wNekq8IKjNzU",
    authDomain: "comunicoufla.firebaseapp.com",
    projectId: "comunicoufla",
    storageBucket: "comunicoufla.firebasestorage.app",
    messagingSenderId: "948487982101",
    appId: "1:948487982101:web:57ee278823953117e0521c"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte o `firebaseConfig` e o `app`
export { firebaseConfig, app };
