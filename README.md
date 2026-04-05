# Finance Data Processing & Access Control Backend

## Overview

This project is a backend system built for managing financial records with role-based access control. It demonstrates core backend concepts including API design, data modeling, validation, access control, and database integration.

The system allows users to create, view, and analyze financial data such as income and expenses, while enforcing role-based permissions.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Database Driver:** pg
* **Testing Tool:** Postman

---

## Features Implemented

### 1. Financial Records Management

* Create financial records
* View all records
* Filter records based on:

  * type (income / expense)
  * category
  * date range

### 2. Dashboard Summary

* Total Income
* Total Expenses
* Net Balance

### 3. Access Control (Basic)

* Role-based restriction implemented
* Only `admin` can create records
* Other roles are restricted

### 4. Validation & Error Handling

* Input validation for required fields
* Type validation (income/expense)
* Proper HTTP status codes used
* Error handling for invalid inputs and server errors

### 5. Data Persistence

* PostgreSQL used for storing records
* Structured schema with constraints

---

## API Endpoints

### Create Record

```
POST /records
```

**Request Body:**

```json
{
  "amount": 500,
  "type": "expense",
  "category": "food",
  "date": "2026-04-03",
  "notes": "lunch"
}
```

---

### Get Records

```
GET /records
```

**Optional Query Params:**

```
/records?type=expense
/records?category=food
/records?startDate=2026-04-01&endDate=2026-04-05
```

---

### Dashboard Summary

```
GET /dashboard/summary
```

**Response:**

```json
{
  "totalIncome": 5000,
  "totalExpense": 2000,
  "netBalance": 3000
}
```

---

## Project Structure

```
src/
├── config/
│   └── db.js
├── controllers/
│   └── recordController.js
├── middleware/
│   ├── validateRecord.js
│   └── authMiddleware.js
├── routes/
│   └── recordRoutes.js
├── app.js
```

---

## Key Concepts Demonstrated

* Separation of concerns (routes, controllers, middleware)
* Middleware usage for validation and authorization
* SQL query construction and filtering
* Aggregation queries (SUM, conditional aggregation)
* REST API design principles

---

## Database Schema

```sql
CREATE TABLE financial_records (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    category VARCHAR(100),
    date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Setup Instructions

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Create a PostgreSQL database:

```
CREATE DATABASE finance_dashboard;
```

4. Create the table using the provided schema

5. Configure database connection in `.env` or `db.js`

6. Start the server:

```
npm run dev
```

---


## Final Note

This project focuses on demonstrating backend fundamentals including API structure, data handling, and logical flow rather than building a production-ready system.
