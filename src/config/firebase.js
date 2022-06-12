// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_DlftFjvw_rYrkPJ7Jm0J0UsqrJB8C24",
  authDomain: "easy-platform-adoption-tools.firebaseapp.com",
  projectId: "easy-platform-adoption-tools",
  storageBucket: "easy-platform-adoption-tools.appspot.com",
  messagingSenderId: "687681868211",
  appId: "1:687681868211:web:aca63159e4797b37ea7bc6"
};

// Initialize Firebase
var app = null;
if (app === null){
    app = initializeApp(firebaseConfig);
}

export default app;