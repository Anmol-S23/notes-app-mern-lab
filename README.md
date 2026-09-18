# Student Notes CRUD Micro-App (MERN Stack)

Student ID: 2026204006
GitHub Repository: https://github.com/Anmol-S23/notes-app-mern-lab.git

A full-stack notes management app built with MongoDB, Express, React (Vite), and Node.js.

## Tech Stack

- Backend: Node.js, Express, Mongoose
- Frontend: React (Vite), Axios
- Database: MongoDB (local, `mongodb://localhost:27017/notes_db`)

## Prerequisites

- Node.js installed
- MongoDB running locally (`mongod` daemon active on default port 27017)

## Setup & Run Instructions

### 1. Backend (Server)

```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:8000`.

### 2. Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`.

### 3. Verify

- Make sure MongoDB is running locally before starting the server.
- Open `http://localhost:5173` in your browser to use the app.
- Test the REST endpoints directly with Postman if needed:
  - `POST http://localhost:8000/api/notes`
  - `GET http://localhost:8000/api/notes`
  - `DELETE http://localhost:8000/api/notes/:id`

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| POST   | `/api/notes`         | Create a new note                     |
| GET    | `/api/notes`         | Get all notes (newest first)          |
| DELETE | `/api/notes/:id`     | Delete a note by its MongoDB `_id`    |

## Folder Structure

```
notes-app/
|-- .gitignore
|-- README.md
|-- screenshots/
|-- server/
|   |-- config/db.js
|   |-- models/Note.js
|   |-- routes/noteRoutes.js
|   |-- package.json
|   |-- server.js
|-- client/
    |-- index.html
    |-- vite.config.js
    |-- package.json
    |-- src/
        |-- App.jsx
        |-- main.jsx
        |-- index.css
```
