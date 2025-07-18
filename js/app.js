// js/app.js — Modular Google Sign-In + Firebase wiring for Academic Allies

import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// --- Firebase Auth Instance ---
const auth = getAuth();

// --- UI Update on Auth State Change ---
const gsiContainer = document.querySelector('.g_id_signin');
onAuthStateChanged(auth, user => {
  if (user) {
    if (gsiContainer) gsiContainer.style.display = 'none';
    // Optional: Display user info or UI state changes here
  } else {
    if (gsiContainer) gsiContainer.style.display = 'block';
  }
});

// --- GIS Credential to Firebase Auth Handler ---
window.handleCredentialResponse = async (response) => {
  try {
    const credential = GoogleAuthProvider.credential(response.credential);
    await signInWithCredential(auth, credential);
    // UI auto-updates via onAuthStateChanged after successful sign-in
  } catch (e) {
    alert("Sign-in failed: " + e.message);
    // Optionally log error: console.error(e);
  }
};

// --- Modular App Sign-Out ---
window.signOutUser = async () => {
  await signOut(auth);
  location.reload();
};

// --- Home Navigation Logic (for SVG, PNG, or image Home icons) ---
window.goHome = function() {
  window.location.href = 'index.html';
};

// Place any other JS modules or dashboard code here, if needed.
