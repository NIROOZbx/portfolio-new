# Nirooz VP — Portfolio

Personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS 4.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite 8** — Build tool
- **Tailwind CSS 4** — Utility-first CSS
- **lucide-react** — Icons
- **@emailjs/browser** — Contact form delivery

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_EMAIL` | Recipient email for contact form |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add the environment variables above in Vercel project settings

## Project Structure

```
src/
  App.tsx                  — Root component with tab routing
  main.tsx                 — Entry point
  index.css                — Global styles, fonts, Tailwind theme
  config/constants.ts      — Site config (socials, projects, email)
  services/contact.ts      — EmailJS integration
  assets/                  — Images, icons, tech stack logos
  components/
    Home.tsx               — Hero section
    Services.tsx           — Services listing
    ServiceCard.tsx        — Service card
    Projects.tsx           — Projects listing
    ProjectCard.tsx        — Project card
    About.tsx              — About page
    TechStack.tsx          — Tech stack badges
    Contact.tsx            — Contact form
    Navbar.tsx             — Sidebar / bottom nav
    GitHub.tsx             — GitHub contribution graph
```
