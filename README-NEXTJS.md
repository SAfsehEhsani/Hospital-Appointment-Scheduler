# Hospital Appointment Scheduler - Next.js Version

Modern hospital appointment scheduling system built with Next.js 14.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- CSS3 (Custom Styling)
- LocalStorage for data persistence

## Features
- ✅ Add Doctor with ID, name, specialization, and max daily patients
- ✅ View all doctors with current appointment status
- ✅ Book appointments with fair allocation (fewest appointments first)
- ✅ Automatic rejection when all doctors are full
- ✅ Persistent data storage using localStorage
- ✅ Clean, responsive UI with animations
- ✅ Medical-themed animated background

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

**Build Settings:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

## Vanilla JS Version

The original vanilla JavaScript version is available in the `vanilla-version/` folder.

## License
MIT
