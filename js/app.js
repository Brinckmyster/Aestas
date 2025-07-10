// js/app.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Use the auth instance exposed on window
const auth = window.firebaseAuth;

// Render status circle component
fetch('components/status-circle/status-circle.html')
  .then(res => res.text())
  .then(html => document.getElementById('status-circle-container').innerHTML = html)
  .catch(console.error);

document.addEventListener('DOMContentLoaded', () => {
  // Quick-action buttons
  document.getElementById('emergencyBtn').onclick = () => window.location.href = 'emergency.html';
  document.getElementById('checkInBtn').onclick = () => window.location.href = 'checkin.html';
  document.getElementById('calendarBtn').onclick = () => window.location.href = 'calendar.html';

  // Authentication state handler
  onAuthStateChanged(auth, user => {
    if (user) {
      // User signed in
      console.log('Signed in as', user.email);
    } else {
      // No user, prompt sign-in
      console.log('No user signed in');
    }
  });

  // Load activity logs
  const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
  const container = document.getElementById('logsContainer');
  logs.forEach(log => {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-date">${log.date}</span>
      <span class="log-status ${log.status}">${log.label}</span>
    `;
    container.appendChild(entry);
  });
});
