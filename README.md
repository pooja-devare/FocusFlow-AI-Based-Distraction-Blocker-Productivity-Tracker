# FocusFlow – AI-Based Distraction Blocker & Productivity Tracker

This is a full-stack project to track productivity, block distractions, and provide AI-based insights.

## Features
- User Authentication (Register/Login)
- Track focused minutes and distractions blocked
- Simple productivity dashboard
- Backend with Node.js, Express, MongoDB
- Frontend with React

## Setup

### Backend
1. Navigate to `/backend`
2. Create `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
3. Install dependencies and start server:
   ```bash
   npm install
   npm run dev
   ```

### Frontend
1. Navigate to `/frontend`
2. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```

### Notes
- Backend runs on port 5000
- Frontend runs on port 3000 (default for React)
- API calls are made to `http://localhost:5000`