<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Academic Allies</title>
  <meta name="description" content="Academic Allies - Your disability accommodations and support network">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Link to your CSS and JS files -->
  <link rel="stylesheet" href="style.css">
  <script defer src="app.js"></script>
  <style>
    .tagline { font-size: 1.15em; color: #4b6cb7; margin-top: 0.5em; text-align: center; }
    .admin-section { margin-top: 2em; }
    .ai-panel { margin-top: 2em; }
    .ai-response { margin-top: 1em; background: #f3f6fa; padding: 1em; border-radius: 8px; }
  </style>
</head>
<body>
  <header style="text-align:center; margin-top:2em;">
    <h1 style="font-size:2.2em; font-weight:bold; color:#2a4b7c;">Academic Allies</h1>
    <p class="tagline">Your disability accommodations and support network</p>
  </header>

  <!-- Google Sign-In button (top of page) -->
  <div id="g_id_onload"
      data-client_id="93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com"
      data-login_uri="https://brinckmyster.github.io/Academic-Allies/"
      data-auto_prompt="false">
  </div>
  <div id="g_id_signin" class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="sign_in_with"
      data-size="large"
      data-logo_alignment="left">
  </div>
  <script src="https://accounts.google.com/gsi/client" async defer></script>

  <!-- Main App Navigation -->
  <nav style="margin-top:2em; text-align:center;">
    <button class="nav-btn" data-section="dashboard">Dashboard</button>
    <button class="nav-btn" data-section="checkins">Check-Ins</button>
    <button class="nav-btn" data-section="logs">Logs</button>
    <button class="nav-btn" data-section="admin-panel">Admin Panel</button>
    <button class="nav-btn" data-section="messages">Messages</button>
    <button class="nav-btn" data-section="settings">Settings</button>
  </nav>

  <!-- Dashboard Section -->
  <div id="dashboard" class="content-section active">
    <div class="status-indicator" id="statusIndicator">
      <div class="status-circle" id="statusCircle"></div>
    </div>
    <h2>Welcome!</h2>
    <p>Today's overview and quick actions.</p>
    <!-- Add more dashboard content as needed -->
  </div>

  <!-- Check-Ins Section -->
  <div id="checkins" class="content-section">
    <h2>Daily Check-Ins</h2>
    <div class="checkin-section">
      <div class="checkin-reassurance">
        <p>You don't need to answer if you're not sure. Academic Allies already checks for signs of pain, fatigue, or brain fog in the background using your typing and heart rate patterns. No action is needed from you unless you want to add more details.</p>
      </div>
      <h3>Did you experience any significant pain, fatigue, or brain fog today?</h3>
      <div class="checkin-options">
        <button class="btn" data-answer="no">No</button>
        <button class="btn" data-answer="yes">Yes</button>
        <button class="btn" data-answer="skip">Skip for today</button>
      </div>
      <!-- Add more check-in questions as needed -->
    </div>
  </div>

  <!-- Logs Section -->
  <div id="logs" class="content-section">
    <h2>Logs</h2>
    <div class="log-options">
      <button class="log-option" data-view="list">Show as List</button>
      <button class="log-option" data-view="chart">Show as Chart</button>
    </div>
    <div id="log-display"></div>
  </div>

  <!-- Admin Panel Section -->
  <div id="admin-panel" class="content-section admin-section">
    <h2>Admin Panel</h2>
    <!-- AI Access Controls, Support Network, etc. can go here -->

    <!-- Perplexity AI Panel (mock/demo) -->
    <div id="perplexity-ai-panel" class="ai-panel">
      <h2>Perplexity AI Protocol Support Editor</h2>
      <p>
        Only Admins with Perplexity AI access can use this tool to update protocols, triggers, and support settings.<br>
        All changes are logged and visible to the student and Admins.
      </p>
      <textarea id="ai-input" rows="4" style="width:100%;" placeholder="Type your question or update here..."></textarea>
      <button id="ai-send" style="margin-top:0.5em;">Send to Perplexity AI</button>
      <div id="ai-response" class="ai-response"></div>
    </div>
  </div>

  <!-- Messages Section -->
  <div id="messages" class="content-section">
    <h2>Messages</h2>
    <p>In-app messaging coming soon.</p>
  </div>

  <!-- Settings Section -->
  <div id="settings" class="content-section">
    <h2>Settings</h2>
    <p>Accessibility and encouragement options coming soon.</p>
  </div>
</body>
</html>
