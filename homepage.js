import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBq5NDV1MvXYKmsT7L5GhWOfmxA0wwY1DA",
    authDomain: "login-form-7d41f.firebaseapp.com",
    projectId: "login-form-7d41f",
    storageBucket: "login-form-7d41f.firebasestorage.app",
    messagingSenderId: "810208063856",
    appId: "1:810208063856:web:83d9a20080563078cfdfb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, get their data from Firestore
        const loggedInUserId = user.uid; // Using Firebase auth UID directly
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Populate user details
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log('No document found with matching ID');
                }
            })
            .catch((error) => {
                console.log('Error getting user document:', error);
            });
    } else {
        console.log('No user is logged in');
    }
});

// Log out functionality
const logOutButton = document.getElementById('logout');
logOutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        // Redirect after sign-out
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error('Error signing out:', error);
    });
});
