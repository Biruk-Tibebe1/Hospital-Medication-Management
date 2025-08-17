# Hospital Medication Manager

A modern, secure, and user-friendly hospital medication management system for patient care, staff coordination, and medication tracking.

## Overview

This project provides hospitals with a complete solution for managing patient medications, staff roles, notifications, and secure user authentication. It features a professional dashboard, responsive UI, and robust backend.

## Features

+ **User Authentication & Role Management**: Secure signup, login, persistent login, and admin approval. Roles include Admin, Doctor, Nurse, and Cardroom.
+ **Patient Management**: Register, view, and manage patient details and medication history. Cardroom users have view-only registration and editing.
+ **Medication Management**: Assign, update, and track medications for each patient.
+ **Notifications**: Automated alerts for medication times, admin approval requests, and notification sound.
+ **Profile Management**: Users can upload and update their profile picture and personal info.
+ **Dashboard**: Modern card-based layout, vibrant colors, quick stats, recent activity, announcements, and easy navigation via sidebar.
+ **Security**: JWT authentication, strong password enforcement, input validation, and protected routes. Approval requests are permanently removed after action.
+ **Responsive UI**: Works on desktop, tablet, and mobile devices.
+ **File Uploads**: Profile picture upload and preview.

## Technology Stack

+ **Frontend**: React, Tailwind CSS
+ **Backend**: Node.js, Express, MongoDB (Mongoose)
+ **Authentication**: JWT, bcryptjs
+ **File Uploads**: Multer

## Getting Started

1. **Clone the repository**
2. **Install dependencies**

+ Backend: `npm install` in `server/`
+ Frontend: `npm install` in `client/`
3.**Set up MongoDB**
+ Use MongoDB Community Server or Atlas
4.**Configure environment variables**
+ Set `MONGO_URI` and `JWT_SECRET` in `.env` file
5.**Run the backend**
+`npm start` in `server/`
6.**Run the frontend**
+`npm start` in `client/`
7.**Access the app**

+ Frontend: `http://localhost:3000`
+ Backend API: `http://localhost:5050`

## Usage

+ **Signup**: Register as a user and await admin approval.
+ **Login**: Access your dashboard based on your role. Login is persistent until logout.
+ **Dashboard**: View quick stats, recent activity, announcements, and enjoy a modern UI.
+ **Patients**: Add and manage patient records and medications. Cardroom users have view-only registration/editing.
+ **Medications**: Assign and update medications for patients.
+ **Notifications**: Receive alerts for medication times, admin actions, and notification sound.
+ **Profile**: Upload your profile picture and update your info.

## Security & Compliance

+ All sensitive routes require authentication.
+ Passwords must be strong (8+ chars, upper/lowercase, number, symbol).
+ Admin approval required for new users. Approval requests are permanently removed after approval/cancel.
+ Data validation on all forms and API endpoints.

## Deployment

+ Deploy backend and frontend to a secure server.
+ Use HTTPS in production.
+ Configure environment variables and MongoDB connection.

## Support & Documentation

+ For issues or questions, contact the project maintainer.
+ API documentation and user/admin guides available upon request.

## License

MIT

---
Inspired by the family background and the gap between patient and their poor medication time management. Designed for hospital use.
