# 🧠 MindHaven

MindHaven is an AI-powered Mental Health Monitoring and Guidance Platform developed as a Final Year Project (FYP). The system helps monitor mental well-being through intelligent assessments, emotion analysis, and personalized guidance using Machine Learning and Deep Learning techniques.

---

# 🚀 Features

- 🔐 User Authentication & Authorization
- 🧠 Mental Health Assessments
- 📊 Weekly Analytics & Reports
- 🤖 AI-Based Depression Risk Prediction
- 😊 Emotion Detection & Analysis
- 💡 Personalized Mental Health Guidance
- 🔔 Notification System
- ☁️ Firebase Integration
- 📈 Real-Time Monitoring Dashboard

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Formik
- Framer Motion
- Firebase

## Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Firebase Admin SDK
- Node Cron

## AI Service

- Python
- TensorFlow / Keras
- Scikit-learn
- OpenCV
- Pickle Models

---

# 📁 Project Structure

```bash
MindHaven/
│
├── frontend/          # React Frontend
├── Backend/           # Node.js Backend
├── AI/                # AI Models & Services
│
├── README.md
└── .gitignore
```

---

# 📥 Download Pretrained AI Models

Due to GitHub file size limitations, pretrained AI model files are hosted externally.

## Google Drive Models Folder

[Download AI Models](https://drive.google.com/drive/folders/1hoUFSNaJNeFP9nOyzUURU1VOVzNhq7k3?usp=drive_link&utm_source=chatgpt.com)

---

# ⚠️ Important Setup Instructions

After downloading the model files:

1. Extract the downloaded folder (if compressed).
2. Copy all model files into:

```bash
AI/saved_models/
```

Your folder structure should look like:

```bash
MindHaven/
│
├── AI/
│   ├── saved_models/
│   │   ├── final_model.keras
│   │   ├── emotion_model.h5
│   │   └── ...
│
├── Backend/
├── frontend/
└── README.md
```

---

# 📋 Prerequisites

Make sure the following are installed:

- Node.js (v18 or above)
- Python (v3.10 or above)
- MongoDB
- Git

---

# ⚙️ Full Project Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repository-link>
cd MindHaven
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🖥️ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Create a `.env` file inside `Backend/`:

```env
PORT=

MONGO_URI=

JWT_SECRET=

EMAIL_USER=

EMAIL_PASS=

FIREBASE_CONFIG=
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🤖 AI Service Setup

Navigate to AI folder:

```bash
cd AI
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run AI service:

```bash
python api.py
```

OR

```bash
python app.py
```

(depending on your project file)

AI Service runs on:

```bash
http://localhost:8000
```

---

# 🔐 Environment Variables

Create `.env` files inside:

- `frontend/`
- `Backend/`
- `AI/`

Example variables:

```env
MONGO_URI=
JWT_SECRET=
FIREBASE_API_KEY=
OPENAI_API_KEY=
```

---

# 🔥 Firebase Admin SDK Setup

The Firebase Admin Service Account credentials are **not included** in this repository for security reasons.

To run the backend successfully:

## 1. Create a Firebase Project

Go to Firebase Console and create a new Firebase project.

## 2. Generate a Service Account Key

- Open **Project Settings**
- Select **Service Accounts**
- Click **Generate New Private Key**
- Download the JSON credentials file

## 3. Place the File in Backend Folder

Rename or keep the downloaded file and place it in:

```bash
Backend/mental-health-system.json
```

Expected structure:

```bash
MindHaven/
│
├── Backend/
│   ├── mental-health-system.json
│   ├── server.js
│   └── ...
│
├── frontend/
├── AI/
└── README.md
```

## 4. Important Security Notice

This file contains sensitive Firebase credentials and must never be uploaded to GitHub.

The repository's `.gitignore` file is configured to exclude:

```bash
Backend/mental-health-system.json
```

If you create your own Firebase project, generate your own service account key and place it in the Backend directory before starting the server.

# ▶️ Running the Complete System

Follow this order:

1. Start MongoDB
2. Start AI Service
3. Start Backend Server
4. Start Frontend
5. Open frontend URL in browser

---

# 📌 Important Notes

- Large AI model files are hosted externally to keep the repository lightweight.
- Do NOT upload:
  - `node_modules`
  - datasets
  - virtual environments
  - model checkpoints
  - `.env` files

- Ensure all downloaded models are placed correctly inside `AI/saved_models/`.

---

# 🔮 Future Improvements

- Dockerization
- CI/CD Pipelines
- Unit Testing
- Cloud Deployment
- Enhanced AI Explainability
- Real-Time Emotion Tracking
- Mobile Application Integration

---

# 👩‍💻 Author

**Hifza Sethi**
BS Computer Science
Islamia College Peshawar

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
