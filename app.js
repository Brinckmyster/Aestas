// --- Google Sign-In logic ---
function handleCredentialResponse(response) {
  // This is called directly by Google after login, no redirect or POST!
  document.body.innerHTML += "<p style='color:green; text-align:center;'>Logged in with Google!</p>";
  // You can decode response.credential (JWT) for user info if needed.
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
