# Academic Allies

**Your disability accommodations and support network**

---

> **This project is for educational and accessibility purposes.  
> Please contact me if you use it for a major institutional project or commercial deployment—I’d love to collaborate and share credit!**

---

## 🚩 Help Wanted: First-Time App Creator

This is my **first-ever app** and a major project, created to support my sister (and, hopefully, many other students) as she returns to BYU-Idaho after a brain injury.  
**I am not a professional developer—just a determined sibling and alum trying to make a difference.**

If you have experience with accessibility, web apps, AI integration, or just want to help a unique, student-centered project, **your advice, code reviews, and contributions are very welcome!**

- All feedback and suggestions are appreciated.
- I am happy to share credit for any meaningful help.
- Please be kind and constructive—this is a learning journey!

**If you’re interested in collaborating, open an Issue or Pull Request, or contact me directly. Thank you!**

---

## Overview

Academic Allies is a customizable web app for students with disabilities and their support network.  
It integrates an **AI Protocol Editor** in the Admin panel—by default using Perplexity Labs, but designed to support any compatible AI provider (such as Hugging Face, OpenRouter, Ollama, etc.). The AI panel is “plug-and-play”: you can swap out the AI backend by updating the API endpoint in the code, making it flexible for future needs or institutional requirements.

## Features

- Student Dashboard: status circle (single or up to 5 segments), daily check-ins, logs (list/chart/calendar), calendar integration, emergency contacts.
- Admin Panel: user/role management, live protocol editing via the AI Protocol Editor, audit logs.
- Logs: visual, beginner-friendly logs with toggleable list, chart, and calendar views.
- Calendar: Google Calendar, BYU-I Academic, and Health Reminders integration.
- Emergency Contacts: default and custom contacts, call/email buttons, add/edit/remove.
- Accessibility: high contrast, large fonts/buttons, dyslexia-friendly, minimal words on bad brain days, keyboard/voice navigation.
- Support Network: invite family, friends, and BYU-I staff; assign/revoke Admin; manage Perplexity AI access.
- Messaging: in-app thread, compose, read/unread, autosave drafts.
- Settings: encouragement style (gentle, cheerleader, or just the facts), custom encouragements, accessibility options.
- Institutional/Disability Services: FERPA/HIPAA compliant, bulk onboarding, explicit consent, audit logs.

## AI Protocol Editor Integration

- The Admin panel includes an AI Protocol Editor, which can connect to Perplexity Labs or any compatible AI provider (e.g., Hugging Face, OpenRouter, Ollama).
- The AI panel is modular: you can configure which AI service to use by changing the API endpoint and key in the code.
- This enables live protocol suggestions, workflow editing, and content support for Admins, regardless of the chosen AI backend.
- Perplexity Labs is the default, but the app is not vendor-locked—future updates or institutional deployments can use any AI service that supports prompt/response APIs.

## Getting Started

1. Clone repo & open in VS Code  
2. `npm install` (or equivalent, if using a build system)  
3. Add your chosen AI API key (e.g., `REACT_APP_PERPLEXITY_API_KEY` or Hugging Face token) to `.env` or directly in the code (for local testing only—never upload real keys to public repos)  
4. `npm start` to run locally, or open `index.html` in your browser  
5. Deploy when ready (Netlify, GitHub Pages, BYU-I, etc.)

## Auth & Permissions

- Admins log in and access the Admin panel and AI Protocol Editor.
- All protocol edits and changes are logged and visible to the student and Admins.

## Accessibility

- High contrast, large fonts, dyslexia-friendly, keyboard/voice navigation, “bad brain day” mode.
- Minimal words, maximum visuals on bad brain days.
- Consistent layout and navigation to minimize confusion.
- No flashing or pulsing—always reassuring and calm.

## Deployment

- Edit code → redeploy for UI/logic changes.
- Use the AI Protocol Editor panel for live protocol updates.
- Can be hosted as a web app, PWA, or packaged for Google Play/iOS via PWABuilder or similar tools.

## Compliance

- Data encrypted in transit & at rest.
- FERPA/HIPAA compliant.
- No data shared with BYU-I or staff without explicit student consent.
- Audit logs for all changes and access.

## License & Usage

This project is licensed under the MIT License.  
**For educational and accessibility purposes.  
Please contact me if you use it for a major institutional project or commercial deployment—I’d love to collaborate and share credit!**
