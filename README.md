# 🧍‍♂️ Posture Coach

## 🚀 Overview

**Posture Coach** is a real-time posture analysis and correction tool designed to help users maintain a healthy posture using webcam-based pose estimation and feedback.

This project includes a **frontend** UI for real-time feedback and a **backend** for posture analytics and potential model training.

## 📂 Features

🎯 Real-time posture detection  
📹 Webcam feed posture scoring  
📊 Visual feedback & improvement tips  
📌 Modular backend & frontend

## 🧱 Tech Stack

| Component | Tech |
|-----------|------|
| Frontend | React.js / TypeScript |
| Backend | Node.js / Express |
| Model | Pose estimation (Tensorflow.js / MediaPipe) |
| Deployment | Netlify |

## 🚀 Getting Started

### 1️⃣ Clone repository
```bash
git clone https://github.com/bhumibansal06/posture-coach.git
cd posture-coach
```
2️⃣ Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

3️⃣ Run locally

Backend
```bash
cd backend
npm start
```

Frontend

```bash
cd frontend
npm start
```

Open your browser at http://localhost:3000

## 📦 Deployment

This project is deployed on Netlify: [Live Demo](https://posturecoach.netlify.app/)

Optional: For full-stack deployment or local containerized development, Docker can be used:

```bash
docker build -t posture-coach .
docker run -p 3000:3000 posture-coach
```

🧪 Testing

We recommend writing:

npm test


Backend: Unit and integration tests

Frontend: UI snapshot/E2E tests

🤝 Contributing

We ❤️ contributions! To contribute:

Fork the repository

Create a feature branch

Submit a pull request

