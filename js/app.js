// js/app.js — Full Google One-Tap + Persistent Button + Status Circle

import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Firebase Auth instance (initialized inline in index.html)
const auth = getAuth();

// When the page loads, initialize Google ID Services and render the sign-in button
window.addEventListener('load', () => {
  // Initialize Google One-Tap & Button
  google.accounts.id.initialize({
    client_id: "93996985456.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: false
  });
  // Render persistent button
  google.accounts.id.renderButton(
    document.querySelector(".g_id_signin"),
    { type: "standard", size: "large", theme: "outline", text: "signin_with", shape: "rectangular" }
  );
  // Show One-Tap prompt as well
  google.accounts.id.prompt();
});

// Handle Google credential and sign into Firebase
window.handleCredentialResponse = async (response) => {
  try {
    const credential = GoogleAuthProvider.credential(response.credential);
    await signInWithCredential(auth, credential);
  } catch (e) {
    console.error("Sign-in failed:", e);
    alert("Sign-in failed: " + e.message);
  }
};

// Watch auth state and update UI
onAuthStateChanged(auth, user => {
  const signInContainer = document.querySelector('.g_id_signin');
  // Toggle visibility
  signInContainer.style.display = user ? 'none' : 'block';
  // Update status circle
  const statusContainer = document.getElementById('status-circle-container');
  statusContainer.innerHTML = '';
  const circle = document.createElement('div');
  circle.className = 'status-circle';
  circle.title = user ? `Signed in as ${user.email}` : 'Signed out';
  circle.style.backgroundColor = user ? '#4CAF50' : '#F44336';
  statusContainer.appendChild(circle);
});

// Sign-out helper
window.signOutUser = async () => {
  await signOut(auth);
  location.reload();
};

// Navigate home
window.goHome = () => window.location.href = 'index.html';
