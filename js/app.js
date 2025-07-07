document.addEventListener('DOMContentLoaded', function () {
  // Example: Google Calendar integration placeholder
  const dashboard = document.getElementById('dashboard');
  if (dashboard) {
    const calendarSection = document.createElement('div');
    calendarSection.innerHTML = `
      <h3>Google Calendar Events</h3>
      <button id="connect-calendar">Connect Google Calendar</button>
      <div id="calendar-error" style="color: #c00; margin-top: 0.5rem;"></div>
    `;
    dashboard.appendChild(calendarSection);

    document.getElementById('connect-calendar').addEventListener('click', () => {
      // Placeholder for calendar auth logic
      document.getElementById('calendar-error').textContent = 'Google Calendar failed to initialize.';
    });
  }

  // Example: Status circle import (if modularized as a component)
  // If using JS to inject, you can load the component here
  // fetch('components/status-circle/status-circle.html')
  //   .then(res => res.text())
  //   .then(html => {
  //     document.getElementById('status-circle-container').innerHTML = html;
  //   });
});
