// --- Google Sign-In logic ---
function handleCredentialResponse(response) {
  // This will show a message when login works
  document.body.innerHTML += "<p style='color:green; text-align:center;'>Logged in with Google!</p>";
  // In the future: decode the JWT to show/hide Admin features based on user info
}

window.onload = function() {
  // Google Sign-In setup
  if (window.google && window.google.accounts && window.google.accounts.id) {
    google.accounts.id.initialize({
      client_id: "93996985456-ftjjdrj4t32h106o7cmstiuqut32vf0g.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large" }
    );
  }

  // --- Navigation logic for multi-mode app ---
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
