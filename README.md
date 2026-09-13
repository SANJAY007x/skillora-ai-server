# 🚀 Skillora AI Backend

Backend REST API for **Skillora AI**, an AI-powered placement preparation platform built for students.

The backend handles authentication, AI interactions, placement practice, learning progress, interview evaluation, and database operations.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes

### 🤖 AI Integration

* Google Gemini API integration
* AI-powered question answering
* Placement preparation assistance
* English learning and interview evaluation support

### 🎯 Placement APIs

* Placement result management
* Latest result retrieval
* Progress tracking
* Performance analysis

### 🗣️ Interview APIs

* Save interview evaluation results
* Retrieve interview history
* Retrieve latest interview result
* Retrieve best interview result

### 📚 Learning & Progress

* Course progress tracking
* Lesson completion tracking
* Dashboard statistics
* Recent learning activity
* Continue-learning data

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* Google Gemini API
* CORS
* dotenv

---

## 📂 Project Structure

```text id="b8x0lw"
skillora-server/
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── CourseProgress.js
│   ├── PlacementResult.js
│   ├── InterviewResult.js
│   └── TopicPracticeResult.js
│
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── progressRoutes.js
│   ├── aiRoutes.js
│   ├── placementRoutes.js
│   └── interviewRoutes.js
│
├── server.js
├── package.json
└── README.md
```

---

## 🔗 API Routes

### Authentication

```text id="2q1dte"
POST /api/auth/signup
POST /api/auth/login
```

### AI

```text id="c7w2pz"
POST /api/ai/chat
```

### Dashboard

```text id="6l2r6p"
GET /api/dashboard/stats
GET /api/dashboard/activity
GET /api/dashboard/continue
```

### Learning Progress

```text id="1ec1xv"
GET /api/progress/:courseName
POST /api/progress/:courseName
```

### Placement

```text id="6b4d1c"
GET /api/placement/results/latest
GET /api/placement/results/progress
POST /api/placement/results
```

### Interview

```text id="4b1j7p"
POST /api/interview/results
GET /api/interview/results
GET /api/interview/results/latest
GET /api/interview/results/best
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash id="4n2f6m"
git clone https://github.com/SANJAY007x/skillora-ai-server.git
cd skillora-ai-server
```

### 2. Install dependencies

```bash id="b4p6y1"
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```text id="7m4d0s"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

**Never commit `.env` to GitHub.**

### 4. Start the server

```bash id="5y7z8p"
node server.js
```

The local backend runs at:

```text id="x2h4v9"
http://localhost:5000
```

---

## 🌐 Production Deployment

The backend is deployed using **Render**.

Production API:

https://skillora-ai-server.onrender.com

Database:

**MongoDB Atlas**

AI service:

**Google Gemini API**

---

## 🔒 Security

The backend uses:

* JWT authentication
* bcrypt password hashing
* Protected API routes
* Environment variables for secrets
* CORS configuration
* MongoDB Atlas access controls

Sensitive credentials such as MongoDB connection strings, JWT secrets, and Gemini API keys are not stored in the repository.

---

## 🔗 Related Project

### Frontend

https://github.com/SANJAY007x/skillora-ai

### Live Application

https://skillora-ai.onrender.com

---

## 👨‍💻 Developer

**Sanjay S**

Computer Science & Engineering Student

Interested in:

* Full Stack Development
* Java
* MERN Stack
* Data Structures & Algorithms
* Artificial Intelligence
