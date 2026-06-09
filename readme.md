# TaskFlow Backend API

## Project Overview

TaskFlow Backend API is a RESTful backend service built using Node.js, Express.js, and MongoDB.

The API provides secure JWT-based authentication and task management functionality, including task creation, updating, deletion, search, filtering, pagination, and status management.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Zod Validation

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Current User Profile

### Task Management

- Create Task
- Get All Tasks
- Get Task By ID
- Update Task
- Delete Task
- Toggle Task Status

### Advanced Features

- Search Tasks
- Filter Tasks
- Pagination
- Request Validation
- Centralized Error Handling

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication Routes

| Method | Endpoint                | Description      |
| ------ | ----------------------- | ---------------- |
| POST   | `/api/v1/auth/register` | Register User    |
| POST   | `/api/v1/auth/login`    | Login User       |
| GET    | `/api/v1/auth/profile`  | Get Current User |

### Task Routes

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | `/api/v1/tasks`            | Create Task        |
| GET    | `/api/v1/tasks`            | Get All Tasks      |
| GET    | `/api/v1/tasks/:id`        | Get Task By ID     |
| PATCH  | `/api/v1/tasks/:id`        | Update Task        |
| DELETE | `/api/v1/tasks/:id`        | Delete Task        |
| PATCH  | `/api/v1/tasks/:id/status` | Toggle Task Status |

## Query Parameters

Example:

```http
GET /api/v1/tasks?page=1&limit=5&search=react&status=pending
```

Supported Parameters:

| Parameter | Description              |
| --------- | ------------------------ |
| page      | Current page number      |
| limit     | Number of tasks per page |
| search    | Search tasks by title    |
| status    | Filter tasks by status   |

## Authorization

All task routes are protected.

Include JWT token in request headers:

```http
Authorization: Bearer <your_jwt_token>
```

## Project Structure

```text
src
│
├── config
│   ├── db.js
│   └── env.js
│
├── middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── notFound.middleware.js
│   └── validate.middleware.js
│
├── models
│   ├── User.js
│   └── Task.js
│
├── modules
│   ├── auth
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   ├── auth.service.js
│   │   └── auth.validation.js
│   │
│   └── task
│       ├── task.controller.js
│       ├── task.routes.js
│       ├── task.service.js
│       └── task.validation.js
│
├── utils
│
├── app.js
└── server.js
```

## Security

- Password Hashing using bcryptjs
- JWT Authentication
- Protected Routes
- Request Validation
- Environment Variables
- Secure Password Storage

## Notes

This project was developed as part of a MERN Stack Internship Assignment and demonstrates authentication, task management, search, filtering, pagination, and REST API development using Node.js, Express.js, and MongoDB.
