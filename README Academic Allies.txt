# Academic Allies

**Your disability accommodations and support network**

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
