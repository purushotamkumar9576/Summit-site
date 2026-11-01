# Superhumanly GTM Room

React (Vite) site with Firebase Hosting for deployment and Firestore for the sign-up form.

## What's inside

| Section | What visitors can do |
| --- | --- |
| How it works | Step through four stages from goal to running work |
| Live room (hero) | Review and approve two items, watch the feed update, replay the mission |
| Rooms | Switch GTM / Commerce / Business Operations, pick a utility, run the flow |
| Growth engines | Expand each card for a sample output |
| AI team | Choose a founder goal, watch the Startup Brain map re-route, select teammates |
| Podcast network | Filter by region, category and stage to rank illustrative show matches |
| Sign-up form | Saves email and goal to Firestore (preview mode if Firebase is not set up) |

Light and dark themes, SVG icons (no text symbols), Plus Jakarta Sans, keyboard accessible, works from phone to desktop, respects "reduce motion".

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy to Firebase (about 10 minutes)

1. **Create a project** at https://console.firebase.google.com (free Spark plan is enough).
2. **Add a web app**: Project settings > General > Your apps > `</>`. Copy the config values.
3. **Turn on Firestore**: Build > Firestore Database > Create database (production mode, pick a region).
4. **Add your keys**: copy `.env.example` to `.env.local` and paste the values.
5. **Set your project id** in `.firebaserc` (replace `your-firebase-project-id`).
6. **Install the CLI and sign in**:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
7. **Deploy** (builds the site, publishes hosting, and publishes the Firestore rules):
   ```bash
   npm run deploy
   ```
   Your site is live at `https://<project-id>.web.app`.

Hosting only (no rule changes): `npm run deploy:hosting`.
Try a throwaway preview URL first: `npm run build && firebase hosting:channel:deploy preview`.

### Custom domain
Firebase console > Hosting > Add custom domain, then add the DNS records it shows.

### Reading sign-ups
Firebase console > Firestore Database > `waitlist`. The rules in `firestore.rules` let visitors add one entry but never read or change any, so emails stay private.

### Auto-deploy from GitHub (optional)
`.github/workflows/firebase-hosting.yml` deploys on every push to `main` and posts a preview URL on pull requests. Run `firebase init hosting:github` once, then add the six `VITE_FIREBASE_*` values as repository secrets.

## Edit the content
- Copy, teammates, rooms, shows and missions: `src/data.js`
- Colors, fonts, spacing (light and dark): the top of `src/styles.css`
- Icons: `src/components/Icon.jsx` (add a path to add an icon)
- Sign-up logic: `src/firebase.js` and `src/components/Cta.jsx`

## Notes
- The Firebase web config keys are not secrets. Access is controlled by `firestore.rules`.
- Firebase is loaded only when someone submits the form, so it does not slow the first page load.
- Podcast matches are illustrative, built from format and audience. Replace `SHOWS` in `src/data.js` with real shows when you have them.
- The Commerce Room, Business Operations and teammate descriptions beyond Emmy are draft copy. Edit them to match your product.
