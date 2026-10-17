# Vortaxa — Standalone App

A standalone, mobile-friendly Vortaxa investment and earnings dashboard extracted from the Investment Tracker project.

## Features
- Dedicated Vortaxa dashboard and investment records
- Daily rate management
- FULE and PI FULE transaction history
- Earnings and withdrawal summaries
- Firebase Authentication and Firestore
- Responsive desktop sidebar and mobile bottom navigation
- Installable PWA

## Important compatibility notes
- The Firebase project configuration and Vortaxa Firestore collection paths are preserved from the original app.
- Existing Vortaxa records for the signed-in Firebase account should remain available.
- The calculation implementation in `src/utils/vortaxa/vortaxaCalculations.js` is carried over unchanged.
- The app uses the same authenticated user scope: `users/{uid}/vortaxaInvestors` and `users/{uid}/vortaxaRates`, with transactions stored as a subcollection of each Vortaxa investor.
- New standalone records use their own generated Vortaxa IDs and do not require the old app's shared investor registry.

## Run locally
1. Install Node.js (LTS).
2. Extract this project.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Build for deployment
Run `npm run build`. Deploy the generated `dist` folder to Vercel or another static host. Enable SPA rewrites so deep links such as `/vortaxa/<id>/transactions` resolve to `index.html`.

## Firebase
Use the existing Firebase project and enable the same Authentication provider used by the original app. Ensure Firestore security rules allow signed-in users to access only their own `users/{uid}/...` records.
