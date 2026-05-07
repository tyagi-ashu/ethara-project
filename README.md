# Ethara

A task management web application built with the MERN stack.

## About

Ethara is a simple project and task management tool where admins can create projects, assign tasks to members, and track their progress. Members can log in to view their assigned tasks and update their status.

## Features

- User authentication with session management
- Role based access — admin and member
- Admins can create and delete projects
- Admins can add members to projects
- Admins can create and assign tasks with priority and due date
- Members can view their assigned tasks and update task status
- Task filtering by status and overdue date

## Tech Stack

- **Frontend** — React, Redux Toolkit, RTK Query, React Router
- **Backend** — Node.js, Express
- **Database** — MongoDB Atlas, Mongoose
- **Auth** — Passport.js, express-session

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

```bash
git clone https://github.com/tyagi-ashu/ethara-project.git
cd ethara-project
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
DB_URL=mongodb://127.0.0.1:27017/ethara
SECRET=yoursecret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Run

```bash
# backend
node index.js

# frontend
npm run dev
```

## Deployment

- Backend hosted on Railway
- Frontend hosted on Railway
