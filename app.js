// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// 1. Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDk9mwSZgk9I65RpYlus7by9mB8tN_oskE",
  authDomain: "academic-allies-464901.firebaseapp.com",
  projectId: "academic-allies-464901",
  storageBucket: "academic-allies-464901.firebasestorage.app",
  messagingSenderId: "93996985456",
  appId: "1:93996985456:web:c697df7623bbceeb1d18b5"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// 2. Google Sign-In Setup
window.onload = () => {
  google.accounts.id.initialize({
    client_id: "93996985456-ftjjd.apps.googleusercontent.com", // Academic Allies Web Client ID
    callback: async resp => {
      const cred = GoogleAuthProvider.credential(resp.credential);
      await signInWithCredential(auth, cred);
    }
  });
  google.accounts.id.renderButton(
    document.getElementById("googleSignInContainer"),
    { theme: "outline", size: "large" }
  );
};

// 3. Auth State Listener
onAuthStateChanged(auth, user => {
  document.getElementById("userName").textContent =
    user ? (user.displayName || user.email) : "Guest";
  document.getElementById("googleSignInContainer").style.display =
    user ? "none" : "flex";
  renderAll();
});

// 4. Navigation Functionality
function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelector(`.nav-btn[data-sec="${id}"]`).classList.add("active");
  renderAll();
}
document.getElementById("homeBtn").addEventListener("click", () => show("dashboard"));
document.querySelectorAll(".nav-btn").forEach(btn =>
  btn.addEventListener("click", () => show(btn.dataset.sec))
);

// 5. Day-Mode (“Check-Ins”) Logic
let appStatus = "normal";
const statusCircle = document.getElementById("statusCircle");
function updateStatusCircle() {
  statusCircle.style.background = `var(--color-${appStatus})`;
  statusCircle.setAttribute("aria-label", `Current status: ${appStatus}`);
}
statusCircle.addEventListener("click", () => {
  document.getElementById("segmentView").checked =
    !document.getElementById("segmentView").checked;
  updateStatusCircle();
});
document.getElementById("statusSelect").addEventListener("change", e => {
  appStatus = e.target.value;
  updateStatusCircle();
  saveCheckIn();
});

// 6. Save Check-In to Firestore
async function saveCheckIn() {
  if (!auth.currentUser) return;
  await addDoc(collection(db, "checkins"), {
    userId: auth.currentUser.uid,
    status: appStatus,
    timestamp: serverTimestamp()
  });
  renderLogs();
}

// 7. Render Logs from Firestore
async function renderLogs() {
  const list = document.getElementById("logsList");
  const q = query(collection(db, "checkins"), orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  list.innerHTML = snap.empty
    ? "<p>No logs yet.</p>"
    : snap.docs.map(d => {
        const dt = d.data();
        return `<p>${new Date(dt.timestamp.toDate()).toLocaleString()}: ${dt.status}</p>`;
      }).join("");
}

// 8. Messaging Functionality
async function sendMessage() {
  if (!auth.currentUser) return;
  const txt = document.getElementById("messageInput").value.trim();
  if (!txt) return;
  await addDoc(collection(db, "messages"), {
    userId: auth.currentUser.uid,
    message: txt,
    timestamp: serverTimestamp()
  });
  document.getElementById("messageInput").value = "";
  renderMessages();
}
async function renderMessages() {
  const grid = document.getElementById("contactGrid");
  const snap = await getDocs(collection(db, "messages"));
  grid.innerHTML = snap.empty
    ? "<p>No messages yet.</p>"
    : snap.docs.map(d => {
        const m = d.data();
        return `<p>${new Date(m.timestamp.toDate()).toLocaleString()}: ${m.message}</p>`;
      }).join("");
}

// 9. Emergency Contacts Rendering
function renderEmergencyContacts() {
  document.getElementById("emergencyContacts").innerHTML = `
    <p>Mom: <a href="tel:+1234567890">Call</a> | <a href="mailto:mom@example.com">Email</a></p>
    <p>You: <a href="tel:+1234567891">Call</a></p>
  `;
}

// 10. Full UI Refresh
function renderAll() {
  updateStatusCircle();
  renderLogs();
  renderMessages();
  renderEmergencyContacts();
  document.getElementById("perplexity-ai-panel").style.display =
    auth.currentUser?.email === "your-admin-email@example.com"
      ? "block"
      : "none";
}

// 11. AI Panel Hook (Optional)
document.getElementById("ai-send")?.addEventListener("click", async () => {
  /* existing Perplexity AI integration code */
});
