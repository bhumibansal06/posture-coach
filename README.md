# Posture Coach

**Real-time posture monitoring and feedback using webcam pose detection.**

Project Interface
<img width="1366" height="636" alt="image" src="https://github.com/user-attachments/assets/7d73eb1b-280b-40c3-a458-090acea6c94c" />

---

## 🚀 Live Demo

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

---

## 📌 Project Overview

Posture Coach is a **full-stack application** that helps users receive real-time feedback on their posture while working or studying.

**Use Cases:**
- Office workers
- Students studying for long hours
- fitness enthusiasts interested in posture awareness

---

## ✨ Features

- Real-time posture detection using webcam  
- Visual posture feedback indicators 
- Frontend dashboard with posture status  
- Demo-level posture history storage using an in-memory backend
- Optional future features: mobile support, metrics tracking, historical charts  

---

Architecture Diagram
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/2f22318c-55d8-4310-9aee-0cc6c61a1748" />
 
---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Pose Detection:** TensorFlow.js (pose-detection models)
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

| Endpoint        | Method | Description                                  |
| --------------- | ------ | -------------------------------------------- |
| `/api/history`  | POST   | Store posture metrics (demo, in-memory)      |
| `/api/history`  | GET    | Fetch posture session history (demo)         |


Request Example:

```bash
POST /api/history
Body: { postureStatus, angles, timestamp }

Response Example:
{
  "postureStatus": "good",
  "angles": { "neck": 175 },
  "timestamp": 1712345678
}
```

🧪 Testing

Testing: Manual testing during development
Automated testing planned as future work)

🔮 Future Work

Deploy backend (Render / Heroku)

Historical posture charts for user insights

Notifications / sounds for poor posture

Mobile / tablet support

CI/CD integration with automated tests

🤝 Contributing

Contributions are welcome! Please submit a pull request or open an issue.
