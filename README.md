# CardMaxer

CodePath WEB103 Final Project

Designed and developed by: Mohamed Ismail, Tanvir Pulak, Jose Fuentes, Alexander Pulido, and Andrew Quach (Group 13)

🔗 Link to deployed app:

## About

### Description and Purpose

CardMaxer is a full-stack credit card research and tracking application. Visitors can search a catalog of 50 U.S. credit cards and review each card's annual fee, foreign transaction fee, signup bonus, reward categories, benefits, recommended credit-score threshold, and user reviews.

The rule-based card matcher filters the catalog using an estimated credit-score range, one to three preferred reward categories, and an optional card type. After logging in with GitHub, users can save favorite cards, store or update their credit score, and create, edit, or delete one review per card. Card matches are informational and are not approval guarantees.

### Inspiration

Our team owns and uses credit cards and is interested in understanding how different cards reward different spending habits. We wanted one organized place where users could browse card terms, focus on the reward categories they value, save a shortlist, and share their experiences with other users.

## Tech Stack

Frontend:

React, React Router, Vite, HTML, and CSS

Backend:

Node.js, Express, PostgreSQL, Passport.js, GitHub OAuth, and server-side sessions

## Features

### ✅ GitHub Authentication

Users can log in with GitHub, remain authenticated through a server-side session, see their username, and securely log out.

![GitHub authentication demo](gifs/auth.gif)

### ✅ Browse and Search Cards

Visitors can browse the 50-card catalog, paginate through results, and search by card name, issuer, network, card type, or reward category.

![Credit card catalog demo](gifs/discover.gif)

### ✅ Preference-Based Card Matcher

Users can select an estimated credit-score range, up to three reward goals, and an optional card type to see matching catalog cards. They can also broaden results to include partial goal matches or cards with lower score requirements.

![Preference-based card matcher demo](gifs/recommend.gif)

### ✅ Credit Card Details

Each card has a dedicated page showing its issuer, network, fees, recommended score, reward structure, signup bonus, benefits, market, catalog update date, and user reviews.

![Credit card details demo](gifs/view.gif)

### ✅ Favorite Cards

Authenticated users can favorite or unfavorite cards and manage their saved-card shortlist from the Favorites page or profile.

![Favorite cards demo](gifs/favorite.gif)

### ✅ User Reviews

Visitors can read card reviews. Authenticated users can create, edit, or delete one review per card and revisit their reviews from a dedicated page.

![User reviews demo](gifs/reviews.gif)

### ✅ Credit Score and Profile

Authenticated users can save or update a credit score and use the profile page to review their recent activity, saved cards, and reviews.

![Credit score and profile demo](gifs/profile.gif)

## Installation Instructions

1. Install the client dependencies:

   ```powershell
   cd src/client
   npm install
   ```

2. Install the server dependencies:

   ```powershell
   cd ../server
   npm install
   ```

3. Create `src/server/.env` with the following configuration:

   ```dotenv
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   DATABASE_SSL=false
   SESSION_SECRET=replace-with-a-long-random-value
   GITHUB_CLIENT_ID=your-github-oauth-client-id
   GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
   CLIENT_URL=http://localhost:5173
   SERVER_URL=http://localhost:3001
   ```

   Instead of `DATABASE_URL`, PostgreSQL can be configured with `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT`, and `PGDATABASE`. The `PG*` configuration uses TLS by default for compatibility with hosted databases; set `DATABASE_SSL=false` for a local database without TLS. When using `DATABASE_URL`, set `DATABASE_SSL=true` if the host requires it.

4. Configure the GitHub OAuth application's callback URL as `http://localhost:3001/auth/github/callback`.

5. Create the database schema and load the card catalog:

   ```powershell
   cd src/server
   npm run reset
   ```

   This command is destructive and recreates the CardMaxer tables, removing existing users, favorites, and reviews.

6. Start the API server:

   ```powershell
   cd src/server
   npm run dev
   ```

7. In a separate terminal, start the client:

   ```powershell
   cd src/client
   npm run dev
   ```

8. Open `http://localhost:5173` in a browser.

The client uses `http://localhost:3001` by default. To use another API origin, set `VITE_API_URL` in `src/client/.env`.

Card terms and signup offers can change. Users should verify current terms and eligibility with the issuer before making a financial decision.
