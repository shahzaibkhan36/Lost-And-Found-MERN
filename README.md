# Lost & Found - MERN Web App

A full stack platform for reporting and reconnecting with lost or found belongings, built with MongoDB, Express, React, and Node.js. My responsibility on this Final Year Project was building this MERN stack web app; the other two teammates built a Flutter mobile app for the same project.

## Live Site

**Frontend:** add-your-vercel-frontend-url-here
**Backend:** add-your-vercel-backend-url-here
**Database:** MongoDB Atlas

---

## Features

- Register, login, and manage your profile
- Report a lost item or a found item, with photo upload
- Browse and search all reports, filter by lost / found
- Claim an item that matches something you lost or found
- Admin dashboard — manage all users and reports, promote/revoke admins
- About & Contact pages with the project and team details
- Fully responsive — desktop nav bar, mobile drawer menu

---

## Run Locally

### Backend
```
cd backend
npm install
cp .env.example .env
```
Fill in your `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_random_string
CLIENT_URL=http://localhost:5173
ADMIN_SECRET_CODE=choose_a_secret_admin_code
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
```
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`. No `.env` needed for local development — the Vite dev server automatically proxies API requests to the backend.

---

## Deploy to Vercel

### Backend
1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New Project**
3. Import your GitHub repository
4. Set **Root Directory** to `backend`
5. Set **Framework Preset** to **Other**
6. Add these Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = your secret key
   - `CLIENT_URL` = your Vercel frontend URL
   - `ADMIN_SECRET_CODE` = your chosen admin code
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` = your Cloudinary credentials (required in production — local disk storage doesn't persist on Vercel)
7. Click **Deploy**
8. Copy the live backend URL — you'll need it for the frontend

### Frontend
1. Click **Add New Project** again on Vercel
2. Import the same GitHub repository
3. Set **Root Directory** to `frontend`
4. Set **Framework Preset** to **Vite**
5. Add this Environment Variable:
   - `VITE_API_URL` = your live backend URL from above + `/api`
6. Click **Deploy**
7. Your frontend is now live

### After any code change
```
git add .
git commit -m "your message"
git push origin main
```
Vercel redeploys both frontend and backend automatically.

---

## Push to GitHub
```
git add .
git commit -m "your message"
git push origin main
```

---

## About This Project

This Lost & Found project was built as a Final Year Project with three team members. My part was this MERN stack web app. The other two teammates built a Flutter mobile app with the same idea and UI.

**Flutter mobile app repo:** https://github.com/shahzaibkhan36/LostAndFoundApp.git

## Team

- **Shahzaib Khan** — MERN stack web app (this repo) — https://github.com/shahzaibkhan36
- **Mohsin Khan** — Flutter UI design — https://github.com/mohsin-khann
- **Malik Iatazaz Altaf** — Flutter backend — https://github.com/MalikIatazazAltaf

---

Built by Shahzaib Khan
