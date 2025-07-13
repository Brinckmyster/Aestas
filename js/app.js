// --- Firebase Config (from your Space instructions) ---
const firebaseConfig = {
  apiKey: "AIzaSyBVQFGHbFGHbFGHbFGHbFGHbFGHbFGH",
  authDomain: "academic-allies-464901.firebaseapp.com",
  projectId: "academic-allies-464901",
  storageBucket: "academic-allies-464901.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// --- Google Sign-In Setup ---
function handleCredentialResponse(response) {
  const idToken = response.credential;
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
  firebase.auth().signInWithCredential(credential)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('userDisplay').textContent =
        `Signed in as: ${user.displayName || user.email}`;
    })
    .catch((error) => {
      document.getElementById('userDisplay').textContent =
        `Sign-in failed: ${error.message}`;
    });
}

window.onload = function() {
  google.accounts.id.initialize({
    client_id: "93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("googleSignIn"),
    { theme: "outline", size: "large" }
  );
  
  // --- This keeps login "sticky" ---
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('userDisplay').textContent =
        `Signed in as: ${user.displayName || user.email}`;
    } else {
      document.getElementById('userDisplay').textContent =
        "No user signed in.";
    }
  });
};
