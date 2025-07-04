// --- Google Sign-In logic ---
function handleCredentialResponse(response) {
  // Hide the Google Sign-In button
  const signinDiv = document.getElementById("g_id_signin");
  if (signinDiv) signinDiv.style.display = "none";
  // Hide the One Tap prompt
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.cancel();
  }

  // Decode the JWT to get user info
  const user = parseJwt(response.credential);

  // Show profile in the status indicator (top right)
  const statusIndicator = document.getElementById("statusIndicator");
  if (statusIndicator) {
    statusIndicator.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.5em;justify-content:flex-end;">
        <img src="${user.picture}" alt="Profile" style="width:48px;height:48px;border-radius:50%;border:2px solid #3b82f6;">
        <span style="font-size:1.1em;color:#3b82f6;">${user.name || user.email}</span>
      </div>
    `;
  }

  // Also show a "Logged in" message for clarity
  document.body.insertAdjacentHTML("afterbegin", `<p style='color:green; text-align:center;'>Logged in with Google!</p>`);
}

// Helper to decode JWT (Google credential)
function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// --- Navigation logic for multi-mode app ---
window.onload = function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.getAttribute('data-section');
      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(section).classList.add('active');
    });
  });

  // Show Dashboard by default
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById('dashboard').classList.add('active');
};

// --- Perplexity AI Panel (mock/demo) ---
document.addEventListener('DOMContentLoaded', function() {
  const aiSend = document.getElementById('ai-send');
  if (aiSend) {
    aiSend.addEventListener('click', async () => {
      const input = document.getElementById('ai-input').value.trim();
      const responseDiv = document.getElementById('ai-response');
      if (!input) {
        responseDiv.textContent = "Please enter a question or update.";
        return;
      }
      responseDiv.textContent = "Thinking...";
      // This is a mock response. For real AI, you would add an API call here.
      setTimeout(() => {
        responseDiv.textContent = "This is a mock response from Perplexity AI. Replace with real API integration.";
      }, 1200);
    });
  }
});
