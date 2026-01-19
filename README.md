# 📚 Library Management System API

A backend REST API for managing a library system, built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. The system handles books, borrowers, borrowing workflows, due dates, overdue tracking, and includes security features like rate limiting.

---

## ✨ Features

* 📖 Book management (CRUD)
* 👤 Borrower management (CRUD)
* 🔁 Borrowing workflow

  * Checkout books
  * Return books
  * Track active borrowings
* ⏰ Due date tracking
* ⚠️ Overdue books listing
* 🔒 Global rate limiting
* 🧾 Request logging
* 🛡️ Security headers with Helmet

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL**
* **Express Rate Limit**
* **Helmet, CORS, Compression**

---

## 📂 Project Structure

```
server/
├── book/
├── borrower/
├── borrowing/
├── common/
│   ├── middleware/
│   └── utils/
├── config/
├── prisma/
├── router.js
└── app.js
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/library"
PORT=5001
API_BASE_PATH=/api
```

### 4️⃣ Prisma setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 5️⃣ Run the server

```bash
npm run dev
```

---

## 🧩 Database Schema (Core Models)

* **Book**
* **Borrower**
* **Borrowing**

  * Tracks checkout history
  * `returnedAt = null` → active borrowing
  * `dueDate < now && returnedAt = null` → overdue

---

## 🔁 Borrowing Logic

### Checkout

* Validates borrower & book
* Prevents duplicate active borrowing
* Atomically decrements available quantity
* Creates borrowing record with due date

### Return

* Finds active borrowing
* Sets `returnedAt`
* Increments book quantity

---

## ⏰ Overdue Books

A borrowing is **overdue** when:

```text
returnedAt IS NULL AND dueDate < NOW()
```

Supported endpoints:

* All overdue borrowings
* Overdue books per borrower

---

## 🚦 Rate Limiting

Global rate limiting is enabled:

* **100 requests / 15 minutes / IP**
* Applied before all API routes

---

## 🧪 Error Handling

* Centralized error handler
* Consistent error responses
* Custom error classes (e.g. `NotFoundErrorResponse`)

---

## 📌 API Base Path

All endpoints are prefixed with:

```
/api
```

---

## 🚀 Future Improvements

* Authentication & authorization
* Role-based access control
* Pagination & filtering
* Swagger / OpenAPI docs
* Redis-backed rate limiting

---

## 🧑‍💻 Author

**Yousef Hanafy**

---

## 📄 License

MIT License


