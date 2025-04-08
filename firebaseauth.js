// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq5NDV1MvXYKmsT7L5GhWOfmxA0wwY1DA",
  authDomain: "login-form-7d41f.firebaseapp.com",
  projectId: "login-form-7d41f",
  storageBucket: "login-form-7d41f.firebasestorage.app",
  messagingSenderId: "810208063856",
  appId: "1:810208063856:web:83d9a20080563078cfdfb5"
};

// Show message function
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = 'block';
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;

  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const signup = document.getElementById('submitSignUp');
signup.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };

      // Show success message
      showMessage('Account Created Successfully', 'signUpMessage');

      // Save user data to Firestore
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch((error) => {
          console.error('Error writing document', error);
        });
    })
    .catch((error) => {
      console.error('Error creating user:', error);  // Log the whole error object
      const errorCode = error.code;
      const errorMessage = error.message;
    
      if (errorCode === 'auth/email-already-in-use') {
        showMessage("Email Address already exists", 'signUpMessage');
      } else {
        showMessage('Unable to create user: ' + errorMessage, 'signUpMessage');
      }
    });
    
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login Successful', 'signInMessage');  // Fixed typo here
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect email or password', 'signInMessage');  // Fixed typo here
      } else {
        showMessage('Account does not exist', 'signInMessage');
      }
    });
});
