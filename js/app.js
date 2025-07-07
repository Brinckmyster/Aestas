// --- Status Circle Logic ---
let currentView = localStorage.getItem('statusCircleView') || 'single';
let showEmoji = localStorage.getItem('showEmoji') !== 'false';
const statusCircle = document.getElementById('statusCircle');
const banner = document.getElementById('banner');

function updateStatusCircle(view = currentView) {
  currentView = view;
  localStorage.setItem('statusCircleView', view);
  statusCircle.innerHTML = '';
  let segmentCount = 0, colorClass = '', bannerText = '';
  if (view === 'single') {
    segmentCount = 1; colorClass = 'segment-1';
  } else if (view === 'pie') {
    segmentCount = 5; colorClass = 'segment-1';
  } else if (view === 'custom') {
    segmentCount = 2; colorClass = 'segment-4';
    bannerText = 'Status circle is currently showing auto-detected metric';
    // In a real app, send alert to Admin here
    console.log('Admin alert: Custom view selected');
  }
  if (segmentCount > 1) {
    statusCircle.classList.add('segments');
    for (let i = 0; i < segmentCount; i++) {
      const segment = document.createElement('div');
      segment.className = `status-segment ${colorClass}`;
      segment.style.transform = `rotate(${i * 360 / segmentCount}deg)`;
      segment.style.clipPath = 'polygon(50% 50%, 50% 0%, 0% 0%)';
      statusCircle.appendChild(segment);
    }
  } else {
    statusCircle.classList.remove('segments');
    const segment = document.createElement('div');
    segment.className = `status-segment ${colorClass}`;
    statusCircle.appendChild(segment);
  }
  if (showEmoji) {
    const emoji = document.createElement('div');
    emoji.style.fontSize = '24px';
    emoji.style.zIndex = 2;
    emoji.textContent = '😊';
    statusCircle.appendChild(emoji);
  }
  if (view === 'custom') {
    banner.textContent = bannerText;
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}
function toggleDefaultView() {
  currentView = currentView === 'single' ? 'pie' : 'single';
  updateStatusCircle(currentView);
}
function toggleEmoji() {
  showEmoji = document.getElementById('showEmoji').checked;
  localStorage.setItem('showEmoji', showEmoji);
  updateStatusCircle(currentView);
}
document.getElementById('showEmoji').checked = showEmoji;
updateStatusCircle(currentView);

// --- Perplexity AI Integration ---
document.getElementById('ai-send').addEventListener('click', async () => {
  const input = document.getElementById('ai-input').value.trim();
  const responseDiv = document.getElementById('ai-response');
  if (!input) {
    responseDiv.textContent = 'Please enter a question or update.';
    return;
  }
  responseDiv.textContent = 'Thinking...';
  try {
    // Replace with your real Perplexity AI endpoint and API key
    const res = await fetch('https://api.perplexity.ai/v1/your-endpoint', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: input })
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    responseDiv.textContent = data.result || 'No response from Perplexity AI.';
  } catch (e) {
    responseDiv.textContent = 'There was an error reaching Perplexity AI.';
  }
});
function showAdminPanel() {
  document.getElementById('ai-panel').style.display = 'block';
}

// --- Health Connect/HealthKit Integration (pseudo, replace with real plugin/API) ---
async function fetchHealthData() {
  // Replace with real Health Connect/HealthKit API calls
  document.getElementById('heartRate').textContent = Math.floor(Math.random() * 40) + 60;
  document.getElementById('sleepHours').textContent = (Math.random() * 3 + 5).toFixed(1);
}

// --- Google Calendar Integration ---
function googleSignIn() {
  // Replace with real Google OAuth2 flow
  alert('Google Calendar integration requires OAuth2 setup. See README for instructions.');
  // After successful OAuth, fetch and display events:
  // fetchCalendarEvents();
}
function fetchCalendarEvents() {
  // Example: fetch events and display in #calendarEvents
  document.getElementById('calendarEvents').innerHTML = '<ul><li>Sample Event 1</li><li>Sample Event 2</li></ul>';
}

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker failed', err));
}
