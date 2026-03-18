**Demo Video(Youtube Link)**

-->  https://www.youtube.com/watch?v=5z0t6QsEEPc

# 🚀 Workflow Engine

A full-stack Workflow Automation System with dynamic workflow creation, step execution, and request tracking.

---

## 📁 Project Structure

```
WorkflowEngine/
 ├── backend/   (Spring Boot - IntelliJ)
 └── frontend/  (React - VS Code)
```

---

## ⚙️ Tech Stack

### Backend

* Java
* Spring Boot
* MySQL
* JPA / Hibernate

### Frontend

* React.js
* Axios
* CSS

---

## 🛠️ Setup Instructions

### 🔹 Backend Setup

1. Open `backend` folder in IntelliJ
2. Configure `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/workflow_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the application

Backend runs on:

```
http://localhost:8080
```

---

### 🔹 Frontend Setup

1. Open `frontend` folder in VS Code
2. Install dependencies:

```
npm install
```

3. Start frontend:

```
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API Integration

Make sure frontend API URL points to backend:

Example:

```
http://localhost:8080/api/
```

---

## 📌 Features

* Create workflows
* Add multiple steps
* Assign roles to steps
* Track request status
* Execute workflow dynamically

---

## 🔄 Sample Workflow

### Example: Leave Approval System

1. Employee submits request
2. Manager reviews request
3. HR approves/rejects

Workflow Steps:

| Step | Role     | Action       |
| ---- | -------- | ------------ |
| 1    | Employee | Submit Form  |
| 2    | Manager  | Approve      |
| 3    | HR       | Final Review |

---
