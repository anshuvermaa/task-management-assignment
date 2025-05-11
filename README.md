# Task Management App

A full-stack task management application built using **React**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

This application allows users to create, manage, and organize tasks within boards, providing features like user authentication, CRUD operations, and drag-and-drop functionality for tasks.

---

## Features

- **User Authentication**:
  - Register, login, and authentication via JWT.
  
- **Boards**:
  - Create, update, and delete boards.
  - View a list of all boards belonging to a user.

- **Tasks**:
  - Create, update, and delete tasks.
  - Drag and drop tasks to reorder or change their status.

- **Status Columns**:
  - Users can add and manage columns to represent different task statuses.

- **Frontend**:
  - Built with **React**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management.
  - Validation with **React Hook Form** and **Zod**.

- **Backend**:
  - Built with **Node.js**, **Express**, **Prisma ORM**, **PostgreSQL**.
  - **JWT** authentication and **Prisma** for database interactions.

---

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand (State management)
  - React Hook Form
  - TanStack Query & Router

- **Backend**:
  - Node.js
  - Express.js
  - Prisma ORM
  - PostgreSQL
  - JWT Authentication

---

## Installation

### 1. Clone the repository


git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app




## Installation Steps (2-5)

### 2. Install dependencies

```
# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install



DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/taskmanager"
JWT_SECRET="your_secret_key"


 Run Prisma migration
bash
Copy
cd backend
npx prisma migrate dev --name init
npx prisma generate


 Run the Development Servers
Start the backend server:
bash
Copy
cd backend
pnpm dev
Start the frontend server:
bash
Copy
cd frontend
pnpm dev
```

## Usage

### User Registration and Authentication:

- **Send a POST request to** `/api/users/register` with `{ email, password }` to create a new user.
- **Send a POST request to** `/api/users/login` with `{ email, password }` to log in and receive a JWT token.

### Boards:

- **Create a board**: `POST /api/boards` with `{ title }`
- **Get all boards**: `GET /api/boards`
- **Update a board**: `PUT /api/boards/:id` with `{ title }`
- **Delete a board**: `DELETE /api/boards/:id`

### Tasks:

- **Create a task**: `POST /api/tasks` with `{ title, status, boardId }`
- **Update a task**: `PUT /api/tasks/:id` with `{ title, status }`
- **Delete a task**: `DELETE /api/tasks/:id`

### Status Columns:

- **Add a status column**: Implement a UI that allows users to add new columns (e.g., "To Do", "In Progress", "Completed") for task organization.

  # Video demo

https://github.com/user-attachments/assets/1eb271a4-a022-4837-8500-c41f1595d8d5






