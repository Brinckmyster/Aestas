// Academic Allies Status Circle Logic - Place in js/app.js

// State
let currentView = localStorage.getItem('statusCircleView') || 'single';
let showEmoji = localStorage.getItem('showEmoji') === 'true';
const statusCircle = document.getElementById('statusCircle');
const banner = document.getElementById('banner');

// Color mapping
const colorMap = {
  good: '#22c55e',      // Green
  moderate: '#fbbf24',  // Yellow
  bad: '#ef4444',       // Red
  default: '#bdbdbd',   // Grey
  spiritual: '#3b82f6', // Blue
  social: '#8b5cf6'     // Purple
};

// Example status for demo; replace with real status logic
function getCurrentStatuses() {
  // Replace with real data fetch or calculation
  return {
    mental: 'good',
    physical: 'moderate',
    spiritual: 'good',
    academic: 'moderate',
    social: 'good'
  };
}

// Main update function
function updateStatusCircle(view = currentView) {
  currentView = view;
  localStorage.setItem('statusCircleView', view);
  statusCircle.innerHTML = '';
  statusCircle.className = 'status-circle';

  // Get current day
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const status = getCurrentStatuses();

  // Banner logic
  let showBanner = false;
  let bannerText = '';

  // Bad brain day logic (replace with real check)
  const isBadBrainDay = false; // Set to true to simulate
  const hasNewMessage = false; // Set to true to simulate

  if (isBadBrainDay && hasNewMessage) {
    statusCircle.innerHTML = '<div class="message-icon" aria-label="New message"></div>';
    banner.style.display = 'none';
    return;
  }

  // View logic
  if (view === 'single') {
    // Single color: overall status (for demo, use mental)
    statusCircle.style.background = colorMap[status.mental] || colorMap.default;
    statusCircle.setAttribute('aria-label', `Status: ${status.mental}`);
    showBanner = false;
  } else if (view === 'pie') {
    // Pie chart: 5 segments
    const segments = [
      { key: 'mental', color: colorMap[status.mental], label: 'Mental' },
      { key: 'physical', color: colorMap[status.physical], label: 'Physical' },
      { key: 'spiritual', color: colorMap.spiritual, label: 'Spiritual' },
      { key: 'academic', color: colorMap[status.academic], label: 'Academic' },
      { key: 'social', color: colorMap.social, label: 'Social' }
    ];
    const degrees = [0, 72, 144, 216, 288];
    segments.forEach((seg, i) => {
      const segment = document.createElement('div');
      segment.className = `status-segment segment-${seg.key}`;
      segment.style.background = seg.color;
      segment.style.transform = `rotate(${degrees[i]}deg) skewY(-54deg)`;
      segment.setAttribute('aria-label', `${seg.label} status`);
      statusCircle.appendChild(segment);
    });
    showBanner = false;
  } else if (view === 'custom') {
    // Custom view: show banner
    showBanner = true;
    bannerText = 'Status circle is currently showing current auto-detected metric';
    // For demo, use 2 segments
    const segments = [
      { key: 'custom1', color: colorMap.good, label: 'Auto Metric 1' },
      { key: 'custom2', color: colorMap.moderate, label: 'Auto Metric 2' }
    ];
    const degrees = [0, 180];
    segments.forEach((seg, i) => {
      const segment = document.createElement('div');
      segment.className = `status-segment segment-${seg.key}`;
      segment.style.background = seg.color;
      segment.style.transform = `rotate(${degrees[i]}deg) skewY(-54deg)`;
      segment.setAttribute('aria-label', `${seg.label}`);
      statusCircle.appendChild(segment);
    });
    // Simulate admin alert
    console.log('Admin alert: Custom view selected');
  }

  // Weekend logic
  if (dayOfWeek === 6) {
    // Saturday: Academic always grey
    const segments = [
      { key: 'mental', color: colorMap[status.mental], label: 'Mental' },
      { key: 'physical', color: colorMap[status.physical], label: 'Physical' },
      { key: 'spiritual', color: colorMap.spiritual, label: 'Spiritual' },
      { key: 'academic', color: colorMap.default, label: 'Academic (Saturday)' },
      { key: 'social', color: colorMap.social, label: 'Social' }
    ];
    const degrees = [0, 72, 144, 216, 288];
    statusCircle.innerHTML = '';
    segments.forEach((seg, i) => {
      const segment = document.createElement('div');
      segment.className = `status-segment segment-${seg.key}`;
      segment.style.background = seg.color;
      segment.style.transform = `rotate(${degrees[i]}deg) skewY(-54deg)`;
      segment.setAttribute('aria-label', `${seg.label}`);
      if (seg.key === 'academic') {
        segment.setAttribute('tabindex', '0');
        segment.setAttribute('data-tooltip', 'Grey: no school today. Still tracking.');
      }
      statusCircle.appendChild(segment);
    });
  } else if (dayOfWeek === 0) {
    // Sunday: Only spiritual
    statusCircle.innerHTML = '';
    const segment = document.createElement('div');
    segment.className = 'status-segment segment-spiritual sunday';
    segment.style.background = colorMap.spiritual;
    segment.setAttribute('aria-label', 'Spiritual status');
    segment.setAttribute('tabindex', '0');
    segment.setAttribute('data-tooltip', 'Sunday: Only spiritual check today. Others paused.');
    statusCircle.appendChild(segment);
  }

  // Emoji (if enabled in settings)
  if (showEmoji) {
    const emoji = document.createElement('div');
    emoji.style.fontSize = '24px';
    emoji.style.zIndex = 2;
    emoji.textContent = '😊'; // Replace with dynamic emoji if needed
    statusCircle.appendChild(emoji);
  }

  // Banner
  if (showBanner) {
    banner.textContent = bannerText;
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

// Toggle between default views
function toggleDefaultView() {
  currentView = currentView === 'single' ? 'pie' : 'single';
  updateStatusCircle(currentView);
}

// Emoji toggle
function toggleEmoji() {
  showEmoji = document.getElementById('showEmoji').checked;
  localStorage.setItem('showEmoji', showEmoji);
  updateStatusCircle(currentView);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('showEmoji').checked = showEmoji;
  updateStatusCircle(currentView);
});
