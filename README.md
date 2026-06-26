#  YouTube Clone - MERN Stack

A full-stack YouTube Clone built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project allows users to register, log in, upload videos, create channels, watch videos, like/dislike videos, comment, manage playlists, subscribe to channels, and maintain watch history.

---

#  Features

##  User Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Profile
- Logout

---

##  Home Page
- Responsive Navbar
- Sidebar Navigation
- Video Grid
- Video Thumbnails
- Search Bar
- Dark Mode

---

##  Video Features

- Upload Video
- Watch Video
- Video Player
- View Counter
- Like Video
- Dislike Video
- Recommended Videos
- Video Details

---

##  Comments

- Add Comment
- View Comments
- Comments stored in MongoDB

---

##  Channel Features

- Create Channel
- View Channel
- Display Channel Videos
- Subscribe Channel
- Unsubscribe Channel
- Subscriber Count

---

##  Playlist Features

- Create Playlist
- View Playlist
- Add Videos to Playlist
- Remove Videos from Playlist
- Delete Playlist

---

##  Watch History

- Save watched videos
- Display recently watched videos

---

## Trending

- Trending Videos Page
- Videos sorted according to views

---

## 🔍 Search

- Search videos by title

---

##  Dark Mode

- Toggle between Light Mode and Dark Mode

---

#  Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

#  Project Structure

```
YouTube Clone
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/youtube-clone.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a **.env** file

```env
PORT=5000
MONGO_URI=Your MongoDB Connection String
JWT_SECRET=Your Secret Key
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

---

## Videos

```
GET    /api/videos
GET    /api/videos/:id
POST   /api/videos
PUT    /api/videos/:id
DELETE /api/videos/:id

POST /api/videos/:videoId/like
POST /api/videos/:videoId/dislike
POST /api/videos/:videoId/view

GET /api/videos/search/:keyword
GET /api/videos/trending
GET /api/videos/category/:category
GET /api/videos/:videoId/reactions
```

---

## Channels

```
POST /api/channels
GET  /api/channels/:id
GET  /api/channels/:channelId/videos
```

---

## Comments

```
POST   /api/comments/:videoId
GET    /api/comments/:videoId
PUT    /api/comments/:commentId
DELETE /api/comments/:commentId
```

---

## Playlists

```
POST   /api/playlists
GET    /api/playlists
GET    /api/playlists/:id
PUT    /api/playlists/:id
DELETE /api/playlists/:id

POST   /api/playlists/:playlistId/videos/:videoId
DELETE /api/playlists/:playlistId/videos/:videoId
```

---

## Subscriptions

```
POST /api/subscriptions/:channelId/subscribe
POST /api/subscriptions/:channelId/unsubscribe
GET  /api/subscriptions/:channelId/subscribers
GET  /api/subscriptions/my-subscriptions
```

---

## History

```
POST /api/history/:videoId
GET  /api/history
```

---

#  Authentication

JWT (JSON Web Token) is used to secure protected routes.

After successful login:

- JWT Token is generated
- Token is stored in Local Storage
- Protected APIs require Authorization Header

```
Authorization: Bearer <token>
```

---

# Database Collections

- Users
- Videos
- Channels
- Comments
- Playlists
- History

---

# Future Improvements

- Responsive Design
- Category Filter Buttons
- Edit/Delete Comments from UI
- Edit/Delete Videos from Channel
- Better YouTube-like UI
- Notifications
- Real Video Upload using Cloudinary
- User Avatar Upload

---

# Author

Developed by **CDG Inspection**
