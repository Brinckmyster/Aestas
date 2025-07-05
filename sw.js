import { googleClientId } from './config.js'; // if you use a config module; otherwise inline
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Grab the initialized instances from window
const auth = window.firebaseAuth;
const db = window.firebaseDB;

let appStatus = 'normal';
let user = null;

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn =>
  btn.addEventListener('click', () => show(btn.dataset.sec))
);
document.getElementById('homeBtn').addEventListener('click', () => show('dashboard'));

function show(sec) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(sec).classList.add('active');
  document.querySelector(`.nav-btn[data-sec="${sec}"]`).classList.add('active');
  renderAll();
}

// Status Circle
const statusCircle = document.getElementById('statusCircle');
statusCircle.addEventListener('click', () => {
  document.getElementById('segmentView').checked = !document.getElementById('segmentView').checked;
  updateStatusCircle();
});

function updateStatusCircle() {
  statusCircle.style.background = `var(--color-${appStatus})`;
  statusCircle.setAttribute('aria-label', `Current status: ${appStatus}`);
}

// Status Selection
document.getElementById('statusSelect').addEventListener('change', e => {
  appStatus = e.target.value;
  document.body.classList.toggle('minimal-ui', ['nope','semi-nope'].includes(appStatus));
  updateStatusCircle();
  saveCheckIn();
});

// Minimal UI Toggle
document.getElementById('minimalUIMode').addEventListener('change', e =>
  document.body.classList.toggle('minimal-ui', e.target.checked)
);

// Google Sign-In
window.onload = () => {
  google.accounts.id.initialize({
    client_id: "93996985456-abcdefg.apps.googleusercontent.com",
    callback: resp => { /* handle JWT if needed */ }
  });
  google.accounts.id.renderButton(
    document.getElementById('googleSignInContainer'),
    { theme: 'outline', size: 'large' }
  );
  onAuthStateChanged(auth, u => {
    user = u;
    document.getElementById('userName').textContent = u ? u.displayName || u.email : 'Guest';
    document.getElementById('googleSignInContainer').style.display = u ? 'none' : 'flex';
    renderAll();
  });
};

// Firestore Operations
async function saveCheckIn() {
  if (!user) return;
  await addDoc(collection(db,'checkins'), {
    userId: user.uid,
    status: appStatus,
    timestamp: serverTimestamp()
  });
  renderLogs();
}

async function renderLogs() {
  const list = document.getElementById('logsList');
  const q = query(collection(db,'checkins'), orderBy('timestamp','desc'));
  const snap = await getDocs(q);
  list.innerHTML = snap.empty ? '<p>No logs yet.</p>' : 
    snap.docs.map(d => {
      const data = d.data();
      return `<p>${new Date(data.timestamp?.toDate()).toLocaleString()}: ${data.status}</p>`;
    }).join('');
}

async function sendMessage() {
  if (!user) return;
  const text = document.getElementById('messageInput').value.trim();
  if (!text) return;
  await addDoc(collection(db,'messages'), {
    userId: user.uid,
    message: text,
    timestamp: serverTimestamp()
  });
  document.getElementById('messageInput').value = '';
  renderMessages();
}

async function renderMessages() {
  const grid = document.getElementById('contactGrid');
  const snap = await getDocs(collection(db,'messages'));
  grid.innerHTML = snap.empty ? '<p>No messages yet.</p>' :
    snap.docs.map(d => {
      const data = d.data();
      return `<p>${new Date(data.timestamp?.toDate()).toLocaleString()}: ${data.message}</p>`;
    }).join('');
}

function renderEmergencyContacts() {
  document.getElementById('emergencyContacts').innerHTML = `
    <p>Mom: <a href="tel:+1234567890">Call</a> | <a href="mailto:mom@example.com">Email</a></p>
    <p>You: <a href="tel:+1234567891">Call</a></p>
  `;
}

async function renderAll() {
  updateStatusCircle();
  renderLogs();
  renderMessages();
  renderEmergencyContacts();
  document.getElementById('perplexity-ai-panel').style.display = 
    (user && user.email === 'your-admin-email@example.com') ? 'block' : 'none';
}

export { saveCheckIn, sendMessage };
