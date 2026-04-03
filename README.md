# Finance Backend API

A role-based finance dashboard backend built with Node.js, Express, and PostgreSQL.

## Tech Stack
- Node.js + Express
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   npm install

3. Create a .env file using .env.example as reference:
   cp .env.example .env

4. Fill in your PostgreSQL credentials in .env

5. Run the database schema:
   Open pgAdmin, connect to your DB, and run schema.sql

6. Start the server:
   node index.js

Server runs on http://localhost:3000

## Role Permission Table

| Action              | Viewer | Analyst | Admin |
|---------------------|--------|---------|-------|
| View records        | ✅     | ✅      | ✅    |
| Create records      | ❌     | ❌      | ✅    |
| Update records      | ❌     | ❌      | ✅    |
| Delete records      | ❌     | ❌      | ✅    |
| View dashboard      | ✅     | ✅      | ✅    |
| Manage users        | ❌     | ❌      | ✅    |

## API Endpoints

### Auth
- POST /api/users/register — Register a new user
- POST /api/users/login — Login and get JWT token

### Users (Admin only)
- GET /api/users — Get all users
- PATCH /api/users/:id/role — Update user role

### Records
- GET /api/records — Get all records (with filters)
- POST /api/records — Create a record (Admin)
- PATCH /api/records/:id — Update a record (Admin)
- DELETE /api/records/:id — Soft delete a record (Admin)

### Dashboard
- GET /api/dashboard/summary — Get summary analytics

## Filtering Records
GET /api/records?type=income&category=salary&from=2024-01-01&to=2024-12-31&page=1&limit=10

## Assumptions
- First registered user with role "admin" is the system admin
- Soft deletes are used — records are never permanently deleted
- JWT tokens expire after 24 hours
- All amounts are stored in numeric format with 2 decimal places
