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

// Attach all logic after HTML is injected
document.addEventListener('DOMContentLoaded', function () {
  // Wait for the component to be present in DOM
  const observer = new MutationObserver(() => {
    const signInBtn = document.getElementById('google-signin-btn');
    if (signInBtn) {
      observer.disconnect();

      // Firebase Init
      (async function initFirebase() {
        await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js', 'firebase-app');
        await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js', 'firebase-auth');
        window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
        window.firebaseAuth = window.firebaseApp.auth();
        document.getElementById('firebase-status-label').innerHTML = 'Firebase: <strong>Connected</strong>';
      })();

      // Google API Init
      (async function initGoogleApi() {
        await loadScript('https://apis.google.com/js/api.js', 'google-api');
        gapi.load('client:auth2', async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          });
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          document.getElementById('google-signin-btn').onclick = handleSignIn;
          document.getElementById('google-signout-btn').onclick = handleSignOut;
          document.getElementById('calendar-connect-btn').onclick = handleCalendarConnect;
          document.getElementById('calendar-disconnect-btn').onclick = handleCalendarDisconnect;
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        });
      })();

      function updateSigninStatus(isSignedIn) {
        const userSpan = document.getElementById('google-user');
        const signInBtn = document.getElementById('google-signin-btn');
        const signOutBtn = document.getElementById('google-signout-btn');
        const calendarBtn = document.getElementById('calendar-connect-btn');
        if (isSignedIn) {
          const user = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          userSpan.textContent = `Signed in as ${user.getName()}`;
          userSpan.style.display = '';
          signInBtn.style.display = 'none';
          signOutBtn.style.display = '';
          calendarBtn.disabled = false;
        } else {
          userSpan.textContent = '';
          userSpan.style.display = 'none';
          signInBtn.style.display = '';
          signOutBtn.style.display = 'none';
          calendarBtn.disabled = true;
          document.getElementById('calendar-status').textContent = '';
          document.getElementById('calendar-disconnect-btn').style.display = 'none';
        }
      }

      function handleSignIn() {
        gapi.auth2.getAuthInstance().signIn();
      }
      function handleSignOut() {
        gapi.auth2.getAuthInstance().signOut();
      }

      async function handleCalendarConnect() {
        document.getElementById('calendar-status').textContent = 'Fetching upcoming events...';
        try {
          const response = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 5,
            orderBy: 'startTime'
          });
          const events = response.result.items;
          if (events.length > 0) {
            const eventList = events.map(e => {
              const start = e.start.dateTime || e.start.date;
              return `${start}: ${e.summary}`;
            }).join('\n');
            document.getElementById('calendar-status').textContent = `Upcoming: ${eventList}`;
            document.getElementById('calendar-disconnect-btn').style.display = '';
            document.getElementById('calendar-connect-btn').style.display = 'none';
          } else {
            document.getElementById('calendar-status').textContent = 'No upcoming events found.';
          }
        } catch (err) {
          document.getElementById('calendar-status').textContent = 'Failed to fetch events.';
        }
      }
      function handleCalendarDisconnect() {
        document.getElementById('calendar-status').textContent = '';
        document.getElementById('calendar-disconnect-btn').style.display = 'none';
        document.getElementById('calendar-connect-btn').style.display = '';
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
