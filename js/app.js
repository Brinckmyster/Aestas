// js/app.js — Modular Google GIS + Firebase Auth handler for Academic Allies

import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// Watch Authentication State and Toggle Google Sign-In Widget
const gsiContainer = document.querySelector('.g_id_signin');
onAuthStateChanged(auth, user => {
  if (user) {
    if (gsiContainer) gsiContainer.style.display = 'none';
    // Optional: Add signed-in UI updates here
  } else {
    if (gsiContainer) gsiContainer.style.display = 'block';
  }
});

// Google Identity Services: Credential to Firebase
window.handleCredentialResponse = async (response) => {
  try {
    const credential = GoogleAuthProvider.credential(response.credential);
    await signInWithCredential(auth, credential);
    // UI auto-updates via onAuthStateChanged
  } catch (e) {
    alert("Sign-in failed: " + e.message);
  }
};

// Sign-Out
window.signOutUser = async () => {
  await signOut(auth);
  location.reload();
};

// Home Navigation
window.goHome = function() {
  window.location.href = 'index.html';
};

// Add other dashboard logic as needed.
