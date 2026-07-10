# URL Shortener

A full-stack URL shortening web application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. The application allows users to register, log in, create short URLs, and manage their links through a simple dashboard.

## Features

* 🔐 User Authentication (Register & Login)
* 🍪 Cookie-based session authentication
* 🔗 Generate short URLs
* 🚀 Redirect short URLs to their original destination
* 📊 Track visit history for each shortened URL
* 👤 User-specific dashboard
* 🗄️ MongoDB database integration
* 🎨 Server-side rendered UI using EJS

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* EJS
* HTML
* CSS

### Authentication

* JWT
* Cookie Parser

## Project Structure

```text
URL-Shortner/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── views/
├── connect.js
├── index.js
├── package.json
└── .env
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/dutta-bikram/URL-Shortner.git
cd URL-Shortner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=8001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the server

```bash
npm start
```

Visit:

```
http://localhost:8001
```

## Future Improvements

* QR code generation
* Custom short aliases
* Link expiration
* Password-protected URLs
* REST API support
* Docker support
* Rate limiting
* Admin dashboard
* Click analytics with charts

## Author

**Bikram Dutta**

* GitHub: https://github.com/dutta-bikram
* LinkedIn: *https://www.linkedin.com/in/dutta-bikram/*
