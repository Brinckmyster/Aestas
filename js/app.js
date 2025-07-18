import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const auth = getAuth();
const gsiContainer = document.querySelector('.g_id_signin');
onAuthStateChanged(auth, user => {
  if (user) {
    if (gsiContainer) gsiContainer.style.display = 'none';
    // Optional: show signed-in UI here
  } else {
    if (gsiContainer) gsiContainer.style.display = 'block';
  }
});

window.handleCredentialResponse = async (response) => {
  try {
    const credential = GoogleAuthProvider.credential(response.credential);
    await signInWithCredential(auth, credential);
    // UI updates via onAuthStateChanged
  } catch (e) {
    alert("Sign-in failed: " + e.message);
  }
};

window.signOutUser = async () => {
  await signOut(auth);
  location.reload();
};

window.goHome = function() {
  window.location.href = 'index.html';
};
