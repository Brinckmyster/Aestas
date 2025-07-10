// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVQFGHbFGHbFGHbFGHbFGHbFGHbFGH",
  authDomain: "academic-allies-464901.firebaseapp.com",
  projectId: "academic-allies-464901",
  storageBucket: "academic-allies-464901.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678"
};
firebase.initializeApp(firebaseConfig);

// Load status circle component
fetch('components/status-circle/status-circle.html')
  .then(res => res.text())
  .then(html => document.getElementById('status-circle-container').innerHTML = html)
  .catch(console.error);

document.addEventListener('DOMContentLoaded', () => {
  // Emergency contact button
  document.getElementById('emergencyBtn').addEventListener('click', () => {
    window.location.href = 'emergency.html';
  });
  // Daily check-in
  document.getElementById('checkInBtn').addEventListener('click', () => {
    window.location.href = 'checkin.html';
  });
  // Calendar
  document.getElementById('calendarBtn').addEventListener('click', () => {
    window.location.href = 'calendar.html';
  });

  // Recent activity placeholder
  const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
  const container = document.getElementById('logsContainer');
  logs.forEach(log => {
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerHTML = `<span class="log-date">${log.date}</span> <span class="log-status ${log.status}">${log.label}</span>`;
    container.appendChild(div);
  });
});
