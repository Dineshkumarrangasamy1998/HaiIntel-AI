# HaiIntel Chat Widget

A floating AI chat widget prototype built with React + Vite, Tailwind CSS and Framer Motion.

## Features
- Floating launcher that expands into a responsive chat window.
- Dark / Light theme toggle to fit HaiIntel brand (default dark).
- User & AI message bubbles, typing animation, and streaming text effect (simulated).
- Static JSON-based simulated AI responses inspired by HaiIntel.com content.
- Follow-up suggestion buttons after AI responses.
- Session persistence using `localStorage`.
- Login modal (credentials: **admin / admin@123**) and a 'Full' button to toggle full-screen chat view.
- Code quality and performance considerations included in documentation.

## Tech stack
- React + Vite
- Tailwind CSS
- Framer Motion

## Run locally
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open `http://localhost:5173`

## Deploy
This project can be deployed on Vercel. Create a new Vercel project and point it to this repo.

## AI Collaboration Note
While building this widget, AI tools were used to:
- Draft the initial component structure and UX flows.
- Generate the simulated responses JSON inspired by HaiIntel site copy.
- Produce the README and suggestions for accessibility and testing.

Validation and safety steps performed:
- Manual review of generated code to ensure it runs in a Vite + React stack.
- Simplified static responses used (no live model calls).
- Testing the streaming effect and login flow locally.
- Ensured no secrets or external API keys are embedded.

## Files included
- `src/` — React app source
- `tailwind.config.cjs`, `postcss.config.cjs` — Tailwind setup
- `package.json`, `vite.config.js` — build & dev

## Notes / Next steps
- Replace static `responses.json` with a real AI backend or vector-retrieval for accurate answers.
- Add unit tests and E2E tests for the login and chat flows.
- Integrate accessibility improvements (ARIA live regions) for streaming updates.

