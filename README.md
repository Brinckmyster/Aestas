# Academic Allies

**Your disability accommodations and support network**

---

> **This project is for educational and accessibility purposes.  
> Please contact me if you use it for a major institutional project or commercial deployment—I’d love to collaborate and share credit!**

---

## 🚩 Help Wanted: First-Time App Creator

This is my **first-ever app** and a major project, created to support my sister (and, hopefully, many other students) as she returns to BYU-Idaho after a brain injury.  
**I am not a professional developer—just a determined sibling and alum trying to make a difference.**

If you have experience with accessibility, web apps, Perplexity AI integration, or just want to help a unique, student-centered project, **your advice, code reviews, and contributions are very welcome!**

- All feedback and suggestions are appreciated.
- I am happy to share credit for any meaningful help.
- Please be kind and constructive—this is a learning journey!

**If you’re interested in collaborating, open an Issue or Pull Request, or contact me directly. Thank you!**

---

## Overview

Academic Allies is a customizable web app for students with disabilities and their support network.  
It integrates **Perplexity Labs** so Admins can live-edit care protocols without redeploying code.

## Features

- Student Dashboard: status circle, daily check-ins, logs (list/chart/calendar), calendar integration, emergency contacts.  
- Admin Panel: user/role management and live protocol editing via Labs.  
- Labs Mode: deep research, code execution, file generation, mini-app deployment in-app.

## Labs Integration

1. Mode selector: Search | Research | Labs  
2. Assets tab: View/download HTML, CSS, JS, charts, CSVs, images  
3. App tab: Preview mini-apps built by Labs  
4. Protocol Editor: textarea + “Run Labs” → Perplexity Labs API  
5. Audit trail: timestamped log of every Labs change

## Getting Started

1. Clone repo & open in VS Code  
2. `npm install` (or equivalent)  
3. Add `REACT_APP_PERPLEXITY_API_KEY` to `.env`  
4. `npm start` to run locally  
5. Deploy when ready (Netlify, GitHub Pages, BYU-I, etc.)

## Auth & Permissions

OAuth via Perplexity. Admin role reveals Labs panel. All Labs edits logged.

## Accessibility

High-contrast, large fonts, dyslexia-friendly, keyboard/voice nav, “bad brain day” mode.

## Deployment

Edit code → redeploy for UI/logic changes. Use Labs panel for live protocol updates.

## Compliance

Data encrypted in transit & at rest. FERPA/HIPAA compliant.

## License & Usage

This project is licensed under the MIT License.  
**For educational and accessibility purposes.  
Please contact me if you use it for a major institutional project or commercial deployment—I’d love to collaborate and share credit!**
