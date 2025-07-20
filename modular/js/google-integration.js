/* google-integration.js – Academic Allies */
/* All Google Sign-In, Firebase Auth logic, and UI updates here only */

// --- Firebase & Google Configs (no placeholders) ---
const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_REAL_AUTH_DOMAIN",
  projectId: "YOUR_REAL_PROJECT_ID",
  appId: "YOUR_REAL_APP_ID",
  // ...any additional fields as needed...
};
const GOOGLE_CLIENT_ID = "93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com";

// --- Firebase Initialization ---
if (!window.firebaseAppsInitialized) {
  firebase.initializeApp(firebaseConfig);
  window.firebaseAppsInitialized = true;
}
const auth = firebase.auth();

// --- Google Sign-In UI Injection ---
function showGoogleSignInButton() {
  const container = document.getElementById('googleSignInContainer');
  container.innerHTML = "";
  const btnDiv = document.createElement('div');
  btnDiv.id = "g_id_signin";
  btnDiv.setAttribute('aria-label', 'Sign in with Google');
  btnDiv.className = "gis-button high-contrast-focus";
  container.appendChild(btnDiv);

  google.accounts.id.renderButton(
    btnDiv,
    {
      theme: "outline",
      size: "large",
      width: 280,
      text: "signin_with",
      shape: "rectangular"
    }
  );
  container.style.display = "flex";
}

function hideGoogleSignInButton() {
  const container = document.getElementById('googleSignInContainer');
  container.innerHTML = "";
  container.style.display = "none";
}

// --- Handle Google Credential (GIS) Response ---
window.handleCredentialResponse = function(response) {
  if (!response.credential) {
    alert("No Google credential received.");
    showGoogleSignInButton();
    return;
  }
  const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
  auth.signInWithCredential(credential).catch(function(error) {
    alert("Authentication failed: " + error.message);
    showGoogleSignInButton();
  });
};

// --- Google Identity Services Initialization ---
window.onload = function() {
  // Defensive: ensure GIS loaded first
  if (!window.google || !google.accounts || !google.accounts.id) {
    alert("Google Identity Services failed to load.");
    return;
  }
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: false
  });

  // Show button if not yet signed in
  showGoogleSignInButton();
};

// --- Auth State Change Observer (Persistent Sign-In) ---
auth.onAuthStateChanged(function(user) {
  const signedIn = !!user;
  if (signedIn) {
    hideGoogleSignInButton();
    // Optional: Update header UI with user.displayName, user.photoURL, etc.
  } else {
    showGoogleSignInButton();
  }
});

// --- Accessibility & Defensive Checks ---
document.addEventListener("DOMContentLoaded", function() {
  const signInRow = document.getElementById('googleSignInContainer');
  if (signInRow) {
    signInRow.setAttribute('role', 'region');
    signInRow.setAttribute('tabindex', '0');
    signInRow.classList.add("centered-row");
  }
});
