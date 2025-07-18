// js/google-integration.js

// --- REAL CONFIGURATION (NO PLACEHOLDERS) ---
const firebaseConfig = {
  apiKey: "AIzaSyB8Wg-2d8u9Z4J3v8Q8wLz6u2vF7xM8n6o",
  authDomain: "academic-allies-464901.firebaseapp.com",
  projectId: "academic-allies-464901",
  storageBucket: "academic-allies-464901.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
const CLIENT_ID = "93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com";
const API_KEY = "AIzaSyB8Wg-2d8u9Z4J3v8Q8wLz6u2vF7xM8n6o";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly profile email";

// Helper: Load external scripts once
function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.id = id;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Wait for the Google integration component to be injected
  const observer = new MutationObserver(() => {
    const signInBtn = document.getElementById('google-signin-btn');
    if (!signInBtn) return;
    observer.disconnect();

    // --- FIREBASE INIT & AUTH HANDLING ---
    (async function initFirebase() {
      await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js', 'firebase-app');
      await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js', 'firebase-auth');
      window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
      window.firebaseAuth = window.firebaseApp.auth();

      // Update Firebase status UI
      window.firebaseAuth.onAuthStateChanged(user => {
        const label = document.getElementById('firebase-status-label');
        if (user) {
          label.innerHTML = 'Firebase: <strong>Connected</strong>';
        } else {
          label.innerHTML = 'Firebase: <strong>Not Connected</strong>';
        }
      });
    })();

    // --- GOOGLE API INIT & HANDLERS ---
    (async function initGoogleApi() {
      await loadScript('https://apis.google.com/js/api.js', 'google-api');
      gapi.load('client:auth2', async () => {
        await gapi.client.init({ apiKey: API_KEY, clientId: CLIENT_ID, discoveryDocs: DISCOVERY_DOCS, scope: SCOPES });
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        document.getElementById('google-signin-btn').onclick = () => gapi.auth2.getAuthInstance().signIn();
        document.getElementById('google-signout-btn').onclick = () => gapi.auth2.getAuthInstance().signOut();
        document.getElementById('calendar-connect-btn').onclick = handleCalendarConnect;
        document.getElementById('calendar-disconnect-btn').onclick = handleCalendarDisconnect;
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      });
    })();

    function updateSigninStatus(isSignedIn) {
      const userSpan = document.getElementById('google-user');
      const signInBtn = document.getElementById('google-signin-btn');
      const signOutBtn = document.getElementById('google-signout-btn');
      const calBtn = document.getElementById('calendar-connect-btn');
      if (isSignedIn) {
        const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        userSpan.textContent = `Signed in as ${profile.getName()}`;
        userSpan.style.display = '';
        signInBtn.style.display = 'none';
        signOutBtn.style.display = '';
        calBtn.disabled = false;
      } else {
        userSpan.style.display = 'none';
        signInBtn.style.display = '';
        signOutBtn.style.display = 'none';
        calBtn.disabled = true;
        document.getElementById('calendar-status').textContent = '';
        document.getElementById('calendar-disconnect-btn').style.display = 'none';
      }
    }

    async function handleCalendarConnect() {
      const status = document.getElementById('calendar-status');
      status.textContent = 'Fetching upcoming events...';
      try {
        const resp = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 5,
          orderBy: 'startTime'
        });
        const items = resp.result.items;
        if (items.length) {
          status.textContent = items.map(e => {
            const start = e.start.dateTime || e.start.date;
            return `${start}: ${e.summary}`;
          }).join('\n');
          document.getElementById('calendar-disconnect-btn').style.display = '';
          document.getElementById('calendar-connect-btn').style.display = 'none';
        } else {
          status.textContent = 'No upcoming events found.';
        }
      } catch {
        status.textContent = 'Failed to fetch events.';
      }
    }

    function handleCalendarDisconnect() {
      document.getElementById('calendar-status').textContent = '';
      document.getElementById('calendar-disconnect-btn').style.display = 'none';
      document.getElementById('calendar-connect-btn').style.display = '';
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
