// Five app statuses: normal, semi-nope, nope, bad brain, recovery
let appStatus = 'normal';
function setStatus(s) {
  appStatus = s;
  document.body.classList.toggle('minimal-ui', s === 'nope' || s === 'semi-nope');
  renderAll();
}

// Offline-first sync with PouchDB → two free CouchDB endpoints
const localDB = new PouchDB('academic_allies');
['https://YOUR-COUCHDB-1', 'https://YOUR-COUCHDB-2']
  .forEach(url => localDB.sync(url, { live: true, retry: true }));

// Google OAuth & Calendar
const CLIENT_ID = '93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com';
function initGapi() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });
  });
}
function handleCredentialResponse(resp) {
  const u = JSON.parse(atob(resp.credential.split('.')[1]));
  document.getElementById('userName').textContent = u.given_name || u.name;
  document.getElementById('googleSignInContainer').style.display = 'none';
}
window.onload = initGapi;
google.accounts.id.initialize({
  client_id: CLIENT_ID,
  callback: handleCredentialResponse,
  ux_mode: 'popup'
});
google.accounts.id.renderButton(
  document.getElementById('googleSignInContainer'),
  { theme: 'outline', size: 'large' }
);

// Navigation setup
const modes = ['dashboard', 'checkins', 'logs', 'admin', 'messages', 'emergency', 'settings'];
modes.forEach((m, i) => {
  const btn = document.createElement('button');
  btn.textContent = m.charAt(0).toUpperCase() + m.slice(1);
  btn.dataset.sec = m;
  if (i === 0) btn.classList.add('active');
  btn.onclick = () => show(m);
  document.getElementById('mainNav').append(btn);
});
function show(sec) {
  modes.forEach(s => {
    document.querySelector(`[data-sec="${s}"]`).classList.toggle('active', s === sec);
    document.getElementById(s).classList.toggle('active', s === sec);
  });
}

// Status circle toggle
let statusView = 'single';
function toggleStatusView() {
  statusView = statusView === 'single' ? 'pie' : 'single';
  updateStatusCircle();
}
function updateStatusCircle() {
  const c = document.getElementById('statusCircle');
  const d = new Date().getDay();
  c.innerHTML = ''; c.className = 'status-circle';
  if (statusView === 'pie') {
    c.classList.add('segments');
    const cnt = (d === 6 || d === 0) ? 2 : 5;
    for (let i = 0; i < cnt; i++) {
      const key = (d === 6) ? 'spiritual' : (d === 0) ? 'social' :
        ['mental','physical','spiritual','academic','social'][i];
      const seg = document.createElement('div');
      seg.className = `status-segment segment-${key}`;
      seg.style.transform = `rotate(${i * 360 / cnt}deg)`;
      seg.title = key + ' status';
      seg.tabIndex = 0;
      c.append(seg);
    }
  } else {
    c.style.background = 'var(--color-success)';
    c.title = 'Overall status';
  }
}

// Render each section
function renderDashboard() {
  const d = document.getElementById('dashboard');
  const n = new Date();
  d.innerHTML = `
    <div class="dashboard-summary">
      <h2>Welcome back, <span id="userName">Mary</span>!</h2>
      <p class="date-time">${n.toLocaleString(undefined,{
        weekday:'long',year:'numeric',month:'long',day:'numeric',
        hour:'2-digit', minute:'2-digit'})}</p>
      <div class="status-grid">
        <div><strong>Brain Fog:</strong> Moderate</div>
        <div><strong>Cognitive:</strong> 35</div>
        <div><strong>Checklist:</strong> 4/6</div>
      </div>
      <div class="quick-actions">
        <button onclick="show('checkins')">Start Check-In</button>
        <button onclick="show('logs')">See Logs</button>
        <button onclick="show('messages')">Send Message</button>
        <button onclick="show('emergency')">Emergency</button>
      </div>
      <div class="calendar-preview">
        <strong>Calendar:</strong>
        <label><input type="checkbox" checked> Google</label>
        <ul id="todaysEvents"><li>Loading…</li></ul>
      </div>
    </div>`;
  gapi.auth2.getAuthInstance().signIn()
    .then(() => gapi.client.load('calendar','v3'))
    .then(() => gapi.client.calendar.events.list({
      calendarId:'primary',
      timeMin:(new Date()).toISOString(),
      singleEvents:true
    }))
    .then(res => {
      document.getElementById('todaysEvents').innerHTML =
        res.result.items.map(e => `<li>${(e.start.dateTime||e.start.date)} – ${e.summary}</li>`).join('');
    });
}
function renderCheckins() {
  document.getElementById('checkins').innerHTML = `
    <h2>Daily Check-Ins</h2>
    <div class="checkin-reassurance">No need to answer if unsure…</div>
    <h3>Any significant pain, fatigue, or brain fog today?</h3>
    <div class="checkin-options">
      <button class="btn" onclick="submitCheckin('symptoms','no')">No</button>
      <button class="btn" onclick="submitCheckin('symptoms','yes')">Yes</button>
      <button class="btn" onclick="submitCheckin('symptoms','skip')">Skip</button>
    </div>
    <div id="symptomChecklist" style="display:none;">
      ${['headache','muscle pain','joint pain','fatigue','brain fog','dizziness','nausea','other']
        .map(s=>`<label><input type="checkbox" value="${s}"> ${s}</label>`).join('')}
      <button class="btn" onclick="submitSymptoms()">Submit</button>
    </div>
    <div id="checkinStatus"></div>`;
}
function renderLogs() {
  document.getElementById('logs').innerHTML =
    '<h2>Logs & History</h2><p>Data visualization coming soon.</p>';
}
function renderAdmin() {
  document.getElementById('admin').innerHTML = `
    <h2>Admin Panel</h2>
    <h3>Support Network</h3>
    <ul class="support-list">
      <li>Mary (Student)</li>
      <li>Brinckmyster (Admin)</li>
      <li>Mom (Family)</li>
      <li>Support test (Support) <span class="role-desc">KarenBrinckFH@gmail.com</span></li>
      <li>Nearby Help test (Nearby Help) <span class="role-desc">KarenBrinck@gmail.com</span></li>
    </ul>`;
}
function renderMessages() {
  document.getElementById('messages').innerHTML =
    '<h2>Messages</h2><button class="btn" onclick="composeMessage()">Compose</button><div id="messageThread"></div>';
  refreshMessages();
}
function renderEmergency() {
  document.getElementById('emergency').innerHTML =
    '<h2>Emergency Contacts</h2><div class="contact-grid"><div class="contact-card"><h4>Disability Services</h4><p>📞 (208) 496-1158</p></div></div>';
}
function renderSettings() {
  document.getElementById('settings').innerHTML = `
    <h2>Settings</h2>
    <label><input type="radio" name="circleView" value="single" checked onchange="updateStatusCircle()"> Single Color</label><br>
    <label><input type="radio" name="circleView" value="pie" onchange="updateStatusCircle()"> Pie Chart</label>`;
}

// Check-in handlers
function submitCheckin(type, ans) {
  const s = document.getElementById('checkinStatus');
  if (type === 'symptoms') {
    if (ans === 'yes') {
      document.getElementById('symptomChecklist').style.display = 'block';
      s.innerHTML = '';
    } else {
      document.getElementById('symptomChecklist').style.display = 'none';
      s.innerHTML = ans === 'no'
        ? '<strong>✓ Logged:</strong> No symptoms.'
        : '<strong>⊝ Skipped.</strong>';
    }
  }
}
function submitSymptoms() {
  const chosen = Array.from(document.querySelectorAll('#symptomChecklist input:checked'))
    .map(i => i.value);
  document.getElementById('symptomChecklist').style.display = 'none';
  document.getElementById('checkinStatus').innerHTML =
    `<strong>✓ Symptoms:</strong> ${chosen.join(', ')}`;
}

// Messaging via PouchDB
async function refreshMessages() {
  const result = await localDB.find({ selector: { type: 'message' } });
  document.getElementById('messageThread').innerHTML =
    result.docs.map(m => `<p><strong>${m.sender}:</strong> ${m.text}</p>`).join('');
}
function composeMessage() {
  const text = prompt('Message:');
  if (!text) return;
  localDB.post({ type: 'message', sender: 'Me', text, timestamp: Date.now() })
    .then(refreshMessages);
}

// Initial render
function renderAll() {
  renderDashboard();
  renderCheckins();
  renderLogs();
  renderAdmin();
  renderMessages();
  renderEmergency();
  renderSettings();
  updateStatusCircle();
}
document.addEventListener('DOMContentLoaded', renderAll);
</script>
