// Config
const firebaseConfig = {
  apiKey: "AIzaSyBVQFGHbFGHbFGHbFGHbFGHbFGHbFGHbFGH",
  authDomain: "academic-allies-464901.firebaseapp.com",
  projectId: "academic-allies-464901",
  storageBucket: "academic-allies-464901.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678"
};
const GOOGLE_CLIENT_ID = "93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com";
const CAL_SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);
firebase.onAuthStateChanged(auth, user => updateFirebaseStatus(user ? "Authenticated" : "Connected (Not Authenticated)", "connected"));

function updateFirebaseStatus(text, cls) {
  const el = document.getElementById('firebase-status-text');
  el.textContent = text;
  el.className = cls;
}
updateFirebaseStatus("Connected", "connected");

// Google Sign-In
document.getElementById('google-signin-btn').onclick = () => {
  google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleCredentialResponse });
  google.accounts.id.prompt();
};

async function handleCredentialResponse(resp) {
  const userInfo = parseJwt(resp.credential);
  document.getElementById('google-user').textContent = userInfo.name || userInfo.email;
  document.getElementById('google-user').style.display = 'inline';
  document.getElementById('google-signin-btn').style.display = 'none';
  document.getElementById('google-signout-btn').style.display = 'inline';
  document.getElementById('calendar-connect-btn').disabled = false;
  try {
    const cred = firebase.GoogleAuthProvider.credential(resp.credential);
    await firebase.signInWithCredential(auth, cred);
  } catch (e) {
    console.error(e);
    updateFirebaseStatus("Auth Failed","error");
  }
}

document.getElementById('google-signout-btn').onclick = async () => {
  await firebase.signOut(auth);
  document.getElementById('google-user').style.display = 'none';
  document.getElementById('google-signin-btn').style.display = 'inline';
  document.getElementById('google-signout-btn').style.display = 'none';
  document.getElementById('calendar-connect-btn').disabled = true;
  document.getElementById('calendar-status').textContent = '';
  updateFirebaseStatus("Connected (Not Authenticated)","connected");
};

function parseJwt(t) {
  try {
    const p = t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    return JSON.parse(decodeURIComponent(atob(p).split('').map(c=>'%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  } catch { return {}; }
}

// Google Calendar
let gapiInited=false, gisInited=false, tokenClient;
window.gapiOnLoad = async () => {
  await gapi.client.init({ discoveryDocs:['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'] });
  gapiInited = true;
};
window.gisOnLoad = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: CAL_SCOPES,
    callback: async resp => {
      if (resp.error) return document.getElementById('calendar-status').textContent = 'Calendar auth failed';
      const now = new Date().toISOString();
      const res = await gapi.client.calendar.events.list({
        calendarId:'primary', timeMin:now, showDeleted:false, singleEvents:true, maxResults:10, orderBy:'startTime'
      });
      const items = res.result.items||[];
      document.getElementById('calendar-status').textContent =
        items.length
          ? items.map(e=>`${e.summary} (${e.start.dateTime||e.start.date})`).join('\n')
          : 'No upcoming events.';
    }
  });
  gisInited = true;
};
document.getElementById('calendar-connect-btn').onclick = () => {
  if (!gapiInited||!gisInited) return document.getElementById('calendar-status').textContent='Loading…';
  tokenClient.requestAccessToken({ prompt:'consent' });
  document.getElementById('calendar-connect-btn').style.display='none';
  document.getElementById('calendar-disconnect-btn').style.display='inline';
};
document.getElementById('calendar-disconnect-btn').onclick = () => {
  document.getElementById('calendar-status').textContent='';
  document.getElementById('calendar-connect-btn').style.display='inline';
  document.getElementById('calendar-disconnect-btn').style.display='none';
};
