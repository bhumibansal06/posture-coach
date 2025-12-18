# Posture Coach

**Real-time posture monitoring and correction using webcam pose detection.**

<!-- Replace the image link below with a banner or screenshot of your app -->
![Project Banner](path/to/<img width="1366" height="636" alt="image" src="https://github.com/user-attachments/assets/7d73eb1b-280b-40c3-a458-090acea6c94c" />
)

---

## 🚀 Live Demo

<!-- Replace with your deployed frontend URL -->
[Try the live demo here](https://posturecoach.netlify.app/)

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Architecture](#architecture)  
4. [Tech Stack](#tech-stack)  
5. [Setup & Installation](#setup--installation)  
6. [API Endpoints](#api-endpoints)  
7. [Screenshots / Demo](#screenshots--demo)  
8. [Testing](#testing)  
9. [Future Work](#future-work)  
10. [Contributing](#contributing)  
11. [License](#license)

---

## 📌 Project Overview

Posture Coach is a **full-stack application** that helps users maintain correct posture while working or studying. Using webcam-based pose detection, it **provides real-time feedback** and visual alerts to prevent slouching or bad posture habits.

**Use Cases:**
- Office workers
- Students studying for long hours
- Fitness enthusiasts looking for posture correction

---

## ✨ Features

- Real-time posture detection using webcam  
- Visual cues and alerts for slouching  
- Frontend dashboard with posture status  
- Backend logging for user posture history  
- Optional future features: mobile support, metrics tracking, historical charts  

---

## 🏗 Architecture

Frontend (React + TypeScript)
 ├─ Pages
 ├─ Components
 └─ Services (API calls)

Backend (Node.js + Express)
 ├─ Controllers (Posture evaluation)
 ├─ Routes (API endpoints)
 └─ Services (Pose logic, database)

Database (Optional future)
 └─ User posture history, metrics
 
---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Pose Detection:** TensorFlow.js / MediaPipe  
- **Deployment:** Netlify (frontend), [Backend deployment TBD]  
- **Version Control:** Git / GitHub  

---

## ⚙️ Setup & Installation

### Clone the repo:

```bash
git clone https://github.com/bhumibansal06/posture-coach.git
cd posture-coach

```
Backend
```bash
cd backend
npm install
npm start
```

Frontend
```bash
cd frontend
npm install
npm start
```

Visit http://localhost:3000 to view the app.

| Endpoint       | Method | Description                           |
| -------------- | ------ | ------------------------------------- |
| `/api/posture` | POST   | Evaluate current posture from webcam  |
| `/api/history` | GET    | Fetch user posture history            |
| `/api/alert`   | POST   | Trigger alert if posture is incorrect |

Request Example:

```bash
POST /api/posture
{
  "imageData": "<base64-encoded image or video frame>"
}

Response Example:
{
  "posture": "good",
  "angle": 175,
  "alert": false
}
```

🧪 Testing

Frontend: React Testing Library for components

Backend: Jest + Supertest for APIs

E2E: Cypress for full workflow testing

🔮 Future Work

Deploy backend (Render / Heroku)

Historical posture charts for user insights

Notifications / sounds for poor posture

Mobile / tablet support

CI/CD integration with automated tests

🤝 Contributing

Contributions are welcome! Please submit a pull request or open an issue.
