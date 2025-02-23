# 💪 Fitness Point - Gym Management System 🏋️‍♂️

## 🌟 Overview

Fitness Point is a comprehensive platform dedicated to helping individuals achieve their health and wellness goals. It provides personalized workout plans, expert guidance, and valuable insights to empower users on their fitness journey. The platform ensures a seamless and engaging user experience while maintaining security and efficiency.

## 🔥 Features

- **🔑 User Registration & Login** (JWT Authentication, bcrypt-encrypted passwords)
- **📑 Trainer Application System** (Multer for resume uploads)
- **📅 Booking System for Workout Sessions**
- **🏋️ Personalized Workout Plans**
- **🔒 Secure User & Trainer Management**
- **📊 Google Analytics Integration**
- **🖥️ User-Friendly Interface**
- **💾 Data Storage using MongoDB**

## 🛠️ Technologies Used

### 🎨 Frontend:

- HTML
- CSS
- JavaScript
- Handlebars.js (HBS)

### 🖥️ Backend:

- Node.js
- Express.js
- MongoDB (MongoDB Atlas for cloud storage)

### 🔐 Security & Authentication:

- JWT (JSON Web Tokens) for authentication & authorization
- bcrypt for password encryption

### 📂 File Handling:

- Multer (for trainer resume uploads)

### 📈 Analytics:

- Google Analytics (for tracking user engagement and performance)

## ⚙️ Installation and Setup

### 📌 Prerequisites

Ensure you have the following installed on your system:

- Node.js (v20.11.1 recommended)
- MongoDB (or MongoDB Atlas for cloud storage)

### 📥 Clone the Repository

```sh
git clone https://github.com/your-username/Fitness-Point.git
cd Fitness-Point
```

### 📦 Install Dependencies

Navigate to the project folder and install the required dependencies:

```sh
npm install
```

### 🔧 Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 🚀 Run the Application

Start the backend server:

```sh
npm start
```

The server will run on `http://localhost:5000/`

## 📡 API Endpoints

### 🔑 User Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### 👨‍🏫 Trainer Management

- `POST /api/trainers/apply` - Apply as a trainer (Multer for file upload)
- `GET /api/trainers` - Get list of trainers

### 📆 Booking System

- `POST /api/bookings` - Book a workout session
- `GET /api/bookings/user/:id` - Get user booking history

## 🗄️ Database Structure

The application uses MongoDB with the following collections:

- **🧑‍💻 Users Collection**: Stores user details and credentials
- **🏋️ Trainers Collection**: Stores trainer profiles and expertise
- **📄 Applications Collection**: Stores trainer applications and resumes
- **📅 Bookings Collection**: Stores user session bookings

## 🚢 Deployment

To deploy the project:

1. 🛠️ Set up MongoDB Atlas or a remote database.
2. ☁️ Use a cloud hosting service like Heroku, Vercel, or DigitalOcean.
3. 🔧 Configure the `.env` variables accordingly.

---
