// js/app.js — loads after modular Firebase init from index.html
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// Pal: This file supplements GIS sign-in as fallback
const auth = getAuth();
const gsiContainer = document.querySelector('.g_id_signin');

onAuthStateChanged(auth, user => {
  if (user) {
    if (gsiContainer) gsiContainer.style.display = 'none';
    // Optionally update UI with user info
  } else {
    if (gsiContainer) gsiContainer.style.display = 'block';
  }
});

window.signOutUser = async () => {
  await signOut(auth);
  location.reload();
};

window.goHome = function() {
  window.location.href = 'index.html';
};
// Add further app logic as modules here as needed.
