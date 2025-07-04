// Academic Allies Application JavaScript

// Application State
let currentUser = null;
let isAdmin = false;
let currentView = 'dashboard';
let selectedEmoji = '😊';
let dailyStatus = 0;
let labsUsage = 12;
let labsLimit = 50;

// Mock Data
const mockData = {
  users: [
    { id: 1, name: "Student User", role: "Student", isAdmin: false },
    { id: 2, name: "Support Person", role: "Support", isAdmin: true },
    { id: 3, name: "Family Member", role: "Family", isAdmin: false },
    { id: 4, name: "BYU-I Staff", role: "BYU-I Staff", isAdmin: false }
  ],
  emergencyContacts: [
    { name: "Campus Security", number: "555-0123" },
    { name: "Counseling Center", number: "555-0456" },
    { name: "Emergency Services", number: "911" },
    { name: "Crisis Hotline", number: "988" }
  ],
  checkInHistory: [
    { date: "2025-07-03", status: 4, notes: "Good day overall", emoji: "😊" },
    { date: "2025-07-02", status: 3, notes: "Manageable", emoji: "😐" },
    { date: "2025-07-01", status: 2, notes: "Rough morning", emoji: "😔" },
    { date: "2025-06-30", status: 5, notes: "Excellent day!", emoji: "🤗" },
    { date: "2025-06-29", status: 1, notes: "Very difficult", emoji: "😰" }
  ],
  assets: [
    { name: "accommodation-report.pdf", type: "PDF", size: "245 KB", icon: "📄" },
    { name: "support-chart.png", type: "Image", size: "128 KB", icon: "📊" },
    { name: "protocol-data.csv", type: "CSV", size: "32 KB", icon: "📈" },
    { name: "mini-app.html", type: "HTML", size: "18 KB", icon: "🌐" }
  ],
  auditLog: [
    { 
      action: "Protocol Updated", 
      details: "Modified daily check-in protocol", 
      timestamp: "2025-07-03 14:30:00",
      user: "Support Person"
    },
    { 
      action: "User Added", 
      details: "Added Family Member to support network", 
      timestamp: "2025-07-02 09:15:00",
      user: "Support Person"
    },
    { 
      action: "Labs Query", 
      details: "Generated accommodation report", 
      timestamp: "2025-07-01 16:45:00",
      user: "Support Person"
    }
  ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  loadAccessibilitySettings();
});

function initializeApp() {
  console.log('Initializing Academic Allies Application...');
  
  // Check for saved user session
  const savedUser = localStorage.getItem('academicAlliesUser');
  if (savedUser) {
    const userData = JSON.parse(savedUser);
    loginUser(userData);
  } else {
    showLoginScreen();
  }
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });

  // Mode selector
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      switchMode(this.dataset.mode);
    });
  });

  // Status circle
  document.querySelectorAll('.status-controls .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const value = parseInt(this.textContent);
      updateStatus(value);
    });
  });

  // Check-in form
  const checkinForm = document.getElementById('checkin-form');
  if (checkinForm) {
    checkinForm.addEventListener('submit', handleCheckinSubmit);
  }

  // Emoji selector
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      selectEmoji(this.dataset.emoji);
    });
  });

  // Logs view toggle
  document.querySelectorAll('.logs-view-toggle .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      switchLogsView(this.dataset.view);
    });
  });

  // Calendar toggle
  const calendarToggle = document.getElementById('calendar-toggle');
  if (calendarToggle) {
    calendarToggle.addEventListener('change', handleCalendarToggle);
  }

  // Admin form
  const addUserForm = document.getElementById('add-user-form');
  if (addUserForm) {
    addUserForm.addEventListener('submit', handleAddUser);
  }

  // Labs tabs
  document.querySelectorAll('.labs-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchLabsTab(this.dataset.tab);
    });
  });

  // Accessibility settings
  document.querySelectorAll('.accessibility-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleAccessibilityChange);
  });
}

// Authentication Functions
function loginWithPerplexity() {
  // Mock OAuth flow
  setTimeout(() => {
    const demoUser = { id: 1, name: "Demo User", role: "Student", isAdmin: false };
    loginUser(demoUser);
  }, 1000);
}

function loginAsStudent() {
  const studentUser = mockData.users.find(u => u.role === "Student");
  loginUser(studentUser);
}

function loginAsAdmin() {
  const adminUser = mockData.users.find(u => u.isAdmin);
  loginUser(adminUser);
}

function loginUser(user) {
  currentUser = user;
  isAdmin = user.isAdmin;
  
  // Save session
  localStorage.setItem('academicAlliesUser', JSON.stringify(user));
  
  // Update UI
  document.getElementById('user-name').textContent = user.name;
  showMainApp();
  setupUserInterface();
  
  console.log(`Logged in as: ${user.name} (${user.role})`);
}

function logout() {
  currentUser = null;
  isAdmin = false;
  localStorage.removeItem('academicAlliesUser');
  showLoginScreen();
  console.log('Logged out successfully');
}

function showLoginScreen() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
}

function showMainApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

function setupUserInterface() {
  // Show/hide admin features
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(el => {
    el.style.display = isAdmin ? 'block' : 'none';
  });

  // Show/hide labs features
  const labsElements = document.querySelectorAll('.labs-only');
  labsElements.forEach(el => {
    el.style.display = (isAdmin || currentUser.role === 'Pro') ? 'block' : 'none';
  });

  // Load initial data
  loadDashboardData();
  if (isAdmin) {
    loadAdminData();
  }
}

// Navigation Functions
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tabName}-tab`).classList.add('active');

  currentView = tabName;
}

function switchMode(mode) {
  // Update mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  console.log(`Switched to ${mode} mode`);
  
  if (mode === 'labs') {
    console.log('Labs mode activated - Deep research and code execution available');
  }
}

// Dashboard Functions
function loadDashboardData() {
  loadEmergencyContacts();
  loadCheckInHistory();
  updateStatusCircle();
  updateCalendarStatus();
  updateUsageDisplay();
}

function loadEmergencyContacts() {
  const contactsContainer = document.getElementById('emergency-contacts');
  if (!contactsContainer) return;

  contactsContainer.innerHTML = '';
  
  mockData.emergencyContacts.forEach(contact => {
    const contactEl = document.createElement('div');
    contactEl.className = 'emergency-contact';
    contactEl.innerHTML = `
      <div class="contact-info">
        <div class="contact-name">${contact.name}</div>
        <div class="contact-number">${contact.number}</div>
      </div>
      <button class="call-btn" onclick="makeCall('${contact.number}')">
        📞 Call
      </button>
    `;
    contactsContainer.appendChild(contactEl);
  });
}

function makeCall(number) {
  // Mock call functionality
  alert(`Calling ${number}...`);
  console.log(`Emergency call initiated to: ${number}`);
}

function updateStatus(value) {
  dailyStatus = value;
  updateStatusCircle();
  
  // Log the status change
  console.log(`Status updated to: ${value}`);
}

function updateStatusCircle() {
  const statusValue = document.getElementById('status-value');
  const segments = document.querySelectorAll('.status-segment');
  
  if (statusValue) {
    statusValue.textContent = dailyStatus;
  }
  
  segments.forEach((segment, index) => {
    const segmentValue = parseInt(segment.dataset.value);
    if (segmentValue <= dailyStatus) {
      segment.classList.add('active');
    } else {
      segment.classList.remove('active');
    }
  });
}

function selectEmoji(emoji) {
  selectedEmoji = emoji;
  
  // Update emoji buttons
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  document.querySelector(`[data-emoji="${emoji}"]`).classList.add('selected');
}

function handleCheckinSubmit(e) {
  e.preventDefault();
  
  const notes = document.getElementById('checkin-notes').value;
  const today = new Date().toISOString().split('T')[0];
  
  if (dailyStatus === 0) {
    alert('Please select a status rating (1-5) before submitting your check-in.');
    return;
  }
  
  const newEntry = {
    date: today,
    status: dailyStatus,
    notes: notes,
    emoji: selectedEmoji
  };
  
  // Add to history
  mockData.checkInHistory.unshift(newEntry);
  
  // Clear form and reset status
  document.getElementById('checkin-notes').value = '';
  selectEmoji('😊');
  updateStatus(0); // Reset status circle
  
  // Refresh logs
  loadCheckInHistory();
  
  console.log('Check-in submitted:', newEntry);
  
  // Success message with more details
  alert(`✅ Check-in submitted successfully!\n\nStatus: ${newEntry.status}/5\nEmoji: ${newEntry.emoji}\nNotes: ${newEntry.notes || 'None'}`);
}

function loadCheckInHistory() {
  loadLogsList();
  loadLogsChart();
  loadLogsCalendar();
}

function loadLogsList() {
  const listContainer = document.getElementById('logs-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  listContainer.className = 'logs-list';
  
  mockData.checkInHistory.forEach(entry => {
    const entryEl = document.createElement('div');
    entryEl.className = 'log-entry';
    entryEl.innerHTML = `
      <div class="log-date">${formatDate(entry.date)}</div>
      <div class="log-emoji">${entry.emoji}</div>
      <div class="log-details">
        <div class="log-status">
          <div class="status-indicator status-${entry.status}">${entry.status}</div>
          <span>Status: ${entry.status}/5</span>
        </div>
        <div class="log-notes">${entry.notes}</div>
      </div>
    `;
    listContainer.appendChild(entryEl);
  });
}

function loadLogsChart() {
  const chartCanvas = document.getElementById('status-chart');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');
  const data = mockData.checkInHistory.slice(0, 7).reverse();
  
  // Simple chart drawing
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
  
  const padding = 40;
  const chartWidth = chartCanvas.width - (padding * 2);
  const chartHeight = chartCanvas.height - (padding * 2);
  
  // Draw axes
  ctx.strokeStyle = '#626c71';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, chartCanvas.height - padding);
  ctx.lineTo(chartCanvas.width - padding, chartCanvas.height - padding);
  ctx.stroke();
  
  // Draw grid lines
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 0.5;
  for (let i = 1; i <= 5; i++) {
    const y = chartCanvas.height - padding - (i * (chartHeight / 5));
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(chartCanvas.width - padding, y);
    ctx.stroke();
  }
  
  // Draw data points and lines
  if (data.length > 0) {
    ctx.strokeStyle = '#21808d';
    ctx.fillStyle = '#21808d';
    ctx.lineWidth = 2;
    
    data.forEach((entry, index) => {
      const x = padding + (index * (chartWidth / Math.max(data.length - 1, 1)));
      const y = chartCanvas.height - padding - (entry.status * (chartHeight / 5));
      
      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw line to next point
      if (index > 0) {
        const prevX = padding + ((index - 1) * (chartWidth / Math.max(data.length - 1, 1)));
        const prevY = chartCanvas.height - padding - (data[index - 1].status * (chartHeight / 5));
        
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });
  }
  
  // Y-axis labels
  ctx.fillStyle = '#626c71';
  ctx.font = '12px Arial';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 1; i <= 5; i++) {
    const y = chartCanvas.height - padding - (i * (chartHeight / 5));
    ctx.fillText(i.toString(), padding - 10, y);
  }
  
  // X-axis labels
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  data.forEach((entry, index) => {
    const x = padding + (index * (chartWidth / Math.max(data.length - 1, 1)));
    const date = new Date(entry.date);
    const label = date.getDate().toString();
    ctx.fillText(label, x, chartCanvas.height - padding + 10);
  });
}

function loadLogsCalendar() {
  const calendarContainer = document.getElementById('calendar-grid');
  if (!calendarContainer) return;

  calendarContainer.innerHTML = '';
  
  // Generate calendar for current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // Create calendar days
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    dayEl.textContent = date.getDate();
    
    if (date.getMonth() !== month) {
      dayEl.style.opacity = '0.3';
    }
    
    // Check if there's an entry for this date
    const dateString = date.toISOString().split('T')[0];
    const hasEntry = mockData.checkInHistory.some(entry => entry.date === dateString);
    
    if (hasEntry) {
      dayEl.classList.add('has-entry');
    }
    
    calendarContainer.appendChild(dayEl);
  }
}

function switchLogsView(view) {
  // Update buttons
  document.querySelectorAll('.logs-view-toggle .btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-view="${view}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.logs-view').forEach(viewEl => {
    viewEl.classList.remove('active');
  });
  document.getElementById(`logs-${view}`).classList.add('active');
  
  if (view === 'chart') {
    // Redraw chart when switching to chart view
    setTimeout(() => loadLogsChart(), 100);
  }
}

function handleCalendarToggle() {
  const toggle = document.getElementById('calendar-toggle');
  const status = document.getElementById('calendar-status');
  
  if (toggle.checked) {
    status.innerHTML = '<span class="status status--success">Connected to BYU-I Calendar</span>';
  } else {
    status.innerHTML = '<span class="status status--info">Connected to Google Calendar</span>';
  }
  
  console.log(`Calendar switched to: ${toggle.checked ? 'BYU-I' : 'Google'}`);
}

// Admin Functions
function loadAdminData() {
  loadUserList();
  loadAuditLog();
  loadAssetList();
}

function loadUserList() {
  const userListContainer = document.getElementById('user-list');
  if (!userListContainer) return;

  userListContainer.innerHTML = '';
  
  mockData.users.forEach(user => {
    const userEl = document.createElement('div');
    userEl.className = 'user-item';
    userEl.innerHTML = `
      <div class="user-info">
        <div class="user-name">${user.name}</div>
        <div class="user-role">${user.role}${user.isAdmin ? ' (Admin)' : ''}</div>
      </div>
      <div class="user-actions">
        <button class="btn btn--secondary" onclick="editUser(${user.id})">Edit</button>
        <button class="btn btn--outline" onclick="removeUser(${user.id})">Remove</button>
      </div>
    `;
    userListContainer.appendChild(userEl);
  });
}

function handleAddUser(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
  const role = formData.get('role') || e.target.querySelector('select').value;
  const isAdmin = e.target.querySelector('input[type="checkbox"]').checked;
  
  if (!name || !role) {
    alert('Please fill in all required fields');
    return;
  }
  
  const newUser = {
    id: mockData.users.length + 1,
    name: name,
    role: role,
    isAdmin: isAdmin
  };
  
  mockData.users.push(newUser);
  loadUserList();
  
  // Add to audit log
  addAuditEntry('User Added', `Added ${name} with role ${role}`, currentUser.name);
  
  // Clear form
  e.target.reset();
  
  console.log('User added:', newUser);
  alert(`✅ User "${name}" added successfully with role "${role}"`);
}

function editUser(userId) {
  const user = mockData.users.find(u => u.id === userId);
  if (user) {
    const newName = prompt('Edit user name:', user.name);
    if (newName && newName !== user.name) {
      const oldName = user.name;
      user.name = newName;
      loadUserList();
      addAuditEntry('User Modified', `Updated user name from ${oldName} to ${newName}`, currentUser.name);
      alert(`✅ User updated successfully: ${oldName} → ${newName}`);
    }
  }
}

function removeUser(userId) {
  const user = mockData.users.find(u => u.id === userId);
  if (user && confirm(`Are you sure you want to remove "${user.name}" from the support network?`)) {
    const userIndex = mockData.users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
      const removedUser = mockData.users.splice(userIndex, 1)[0];
      loadUserList();
      addAuditEntry('User Removed', `Removed ${removedUser.name} (${removedUser.role})`, currentUser.name);
      alert(`✅ User "${removedUser.name}" removed successfully`);
    }
  }
}

function runLabsProtocol() {
  const protocolText = document.getElementById('protocol-text').value;
  if (!protocolText.trim()) {
    alert('Please enter protocol instructions');
    return;
  }
  
  if (labsUsage >= labsLimit) {
    alert('⚠️ Labs usage limit reached. Please upgrade or wait for monthly reset.');
    return;
  }
  
  // Mock Labs execution
  console.log('Running Labs protocol:', protocolText);
  
  // Show processing state
  const runBtn = document.querySelector('button[onclick="runLabsProtocol()"]');
  runBtn.textContent = 'Processing...';
  runBtn.disabled = true;
  
  // Update usage
  labsUsage++;
  updateUsageDisplay();
  
  // Simulate generating assets
  setTimeout(() => {
    const timestamp = Date.now();
    const newAsset = {
      name: `protocol-output-${timestamp}.html`,
      type: 'HTML',
      size: `${Math.floor(Math.random() * 100) + 10} KB`,
      icon: '🌐'
    };
    
    mockData.assets.push(newAsset);
    loadAssetList();
    
    // Update app preview
    const appPreview = document.getElementById('app-preview');
    appPreview.innerHTML = `
      <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: white;">
        <h3>Generated Mini-App</h3>
        <p><strong>Protocol:</strong> ${protocolText.substring(0, 100)}${protocolText.length > 100 ? '...' : ''}</p>
        <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 4px;">
          <strong>Output:</strong> Analysis complete. Generated interactive dashboard with accommodation recommendations based on your protocol.
        </div>
        <div style="background: #e8f4f5; padding: 10px; margin: 10px 0; border-radius: 4px;">
          <strong>Generated Assets:</strong> ${newAsset.name}
        </div>
        <button style="background: #21808d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          View Full Results
        </button>
      </div>
    `;
    
    addAuditEntry('Labs Protocol Executed', `Executed: ${protocolText.substring(0, 50)}...`, currentUser.name);
    
    // Reset button
    runBtn.textContent = 'Run Labs';
    runBtn.disabled = false;
    
    alert('✅ Labs protocol executed successfully!\n\nGenerated new assets and mini-app preview.');
  }, 2000);
}

function updateUsageDisplay() {
  const usageCount = document.getElementById('labs-usage-count');
  const usageProgress = document.getElementById('usage-progress');
  
  if (usageCount) {
    usageCount.textContent = labsUsage;
  }
  
  if (usageProgress) {
    const percentage = (labsUsage / labsLimit) * 100;
    usageProgress.style.width = `${percentage}%`;
    
    if (percentage > 90) {
      usageProgress.style.background = 'var(--color-error)';
    } else if (percentage > 80) {
      usageProgress.style.background = 'var(--color-warning)';
    } else {
      usageProgress.style.background = 'var(--color-primary)';
    }
  }
}

function switchLabsTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.labs-tab').forEach(tabEl => {
    tabEl.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.labs-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`labs-${tab}`).classList.add('active');
}

function loadAssetList() {
  const assetListContainer = document.getElementById('asset-list');
  if (!assetListContainer) return;

  assetListContainer.innerHTML = '';
  
  if (mockData.assets.length === 0) {
    assetListContainer.innerHTML = '<p style="text-align: center; color: #626c71; padding: 20px;">No assets generated yet. Run a Labs protocol to create files.</p>';
    return;
  }
  
  mockData.assets.forEach((asset, index) => {
    const assetEl = document.createElement('div');
    assetEl.className = 'asset-item';
    assetEl.innerHTML = `
      <div class="asset-info">
        <div class="asset-icon">${asset.icon}</div>
        <div class="asset-details">
          <div class="asset-name">${asset.name}</div>
          <div class="asset-type">${asset.type} • ${asset.size}</div>
        </div>
      </div>
      <button class="download-btn" onclick="downloadAsset(${index})">
        📥 Download
      </button>
    `;
    assetListContainer.appendChild(assetEl);
  });
}

function downloadAsset(index) {
  const asset = mockData.assets[index];
  console.log(`Downloading: ${asset.name}`);
  alert(`📥 Downloaded: ${asset.name}\n\nFile saved to your default downloads folder.`);
}

function addAuditEntry(action, details, user) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const entry = {
    action: action,
    details: details,
    timestamp: timestamp,
    user: user
  };
  
  mockData.auditLog.unshift(entry);
  loadAuditLog();
}

function loadAuditLog() {
  const auditLogContainer = document.getElementById('audit-log');
  if (!auditLogContainer) return;

  auditLogContainer.innerHTML = '';
  
  if (mockData.auditLog.length === 0) {
    auditLogContainer.innerHTML = '<p style="text-align: center; color: #626c71; padding: 20px;">No audit entries yet.</p>';
    return;
  }
  
  mockData.auditLog.forEach(entry => {
    const entryEl = document.createElement('div');
    entryEl.className = 'audit-entry';
    entryEl.innerHTML = `
      <div class="audit-info">
        <div class="audit-action">${entry.action}</div>
        <div class="audit-details">${entry.details} • by ${entry.user}</div>
      </div>
      <div class="audit-timestamp">${entry.timestamp}</div>
    `;
    auditLogContainer.appendChild(entryEl);
  });
}

// Accessibility Functions
function showAccessibilityPanel() {
  const panel = document.getElementById('accessibility-panel');
  panel.classList.add('open');
}

function closeAccessibilityPanel() {
  const panel = document.getElementById('accessibility-panel');
  panel.classList.remove('open');
}

function handleAccessibilityChange(e) {
  const setting = e.target.id;
  const enabled = e.target.checked;
  
  // Save setting
  localStorage.setItem(`accessibility-${setting}`, enabled);
  
  // Apply setting
  applyAccessibilitySetting(setting, enabled);
  
  console.log(`Accessibility setting ${setting}: ${enabled}`);
}

function applyAccessibilitySetting(setting, enabled) {
  const body = document.body;
  
  switch (setting) {
    case 'high-contrast':
      body.classList.toggle('high-contrast', enabled);
      break;
    case 'large-buttons':
      body.classList.toggle('large-buttons', enabled);
      break;
    case 'bad-brain-day':
      body.classList.toggle('bad-brain-day', enabled);
      break;
  }
}

function loadAccessibilitySettings() {
  const settings = ['high-contrast', 'large-buttons', 'bad-brain-day'];
  
  settings.forEach(setting => {
    const saved = localStorage.getItem(`accessibility-${setting}`);
    if (saved === 'true') {
      const checkbox = document.getElementById(setting);
      if (checkbox) {
        checkbox.checked = true;
        applyAccessibilitySetting(setting, true);
      }
    }
  });
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

// Labs Control Functions
document.addEventListener('DOMContentLoaded', function() {
  const pauseBtn = document.getElementById('pause-labs');
  const cancelBtn = document.getElementById('cancel-labs');
  
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function() {
      console.log('Labs execution paused');
      alert('⏸️ Labs execution paused');
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      console.log('Labs execution cancelled');
      alert('⏹️ Labs execution cancelled');
    });
  }
});

// Export functions for global access
window.loginWithPerplexity = loginWithPerplexity;
window.loginAsStudent = loginAsStudent;
window.loginAsAdmin = loginAsAdmin;
window.logout = logout;
window.showAccessibilityPanel = showAccessibilityPanel;
window.closeAccessibilityPanel = closeAccessibilityPanel;
window.updateStatus = updateStatus;
window.makeCall = makeCall;
window.editUser = editUser;
window.removeUser = removeUser;
window.runLabsProtocol = runLabsProtocol;
window.downloadAsset = downloadAsset;

console.log('Academic Allies Application Loaded Successfully');