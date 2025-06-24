# 🏥 Final Project – Hospital Appointment Management API

**Description:**  
RESTful API for managing hospital appointment scheduling. Includes GitHub OAuth authentication, Swagger documentation, unit testing with Jest, and transactional email handling via Mailtrap. This is a collaborative project developed by BYU–Idaho students as part of a software development certification.

---

## 👥 Team Members

- Isaac Pasapera  
- Mmusi Hubona  
- Andrea Ramos  
- Folusho Sanni  

---

## 🚀 Tech Stack

- Node.js + Express  
- MongoDB + Mongoose  
- GitHub OAuth  
- Mailtrap SMTP  
- Swagger  
- Jest  
- Render (deployment)  
- dotenv  

---

## 🌐 Deployed Link

🔗 [Live API – Login Endpoint](https://final-project-zx8v.onrender.com/auth/login)

---

## 📄 Swagger Documentation

Access and test all endpoints via Swagger:  
🔗 [Swagger UI](https://final-project-zx8v.onrender.com/api-docs)

---

## ⚙️ Setup & Deployment Instructions

### 1. Clone the repository

```bash
git clone https://github.com/isaacpassnav/Final-Project.git
cd Final-Project
npm install
```

### 2. Create and configure your `.env` file

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://your-app-name.onrender.com/auth/github/callback
SESSION_SECRET=your_secret_session_key

# Mailtrap SMTP Configuration
MAILTRAP_HOST=your_mailtrap_host
MAILTRAP_PORT=your_mailtrap_port
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
```

### 3. Start the application

```bash
npm run dev
```

### 4. Run unit tests

```bash
npm run test
```

---

## 🧪 Unit Testing with Jest

Jest is used to validate key endpoints, middleware, and application logic. Tests can be found in the `tests/` directory.

---

## 📬 Email Handling with Mailtrap

Transactional emails are handled via **Mailtrap SMTP** in development. Email notifications are triggered for actions like:

- Appointment confirmations  
- Admin notifications  
- *(Optional)* Password recovery  

Environment credentials should be securely stored in your `.env` file.

---

## 🔐 GitHub OAuth Setup

GitHub OAuth is integrated for secure user login.

### Configuration Steps:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new **OAuth App** or update an existing one
3. Use the following:

```
Homepage URL: https://your-app-name.onrender.com
Authorization Callback URL: https://your-app-name.onrender.com/auth/github/callback
```

---

## 📁 Project Structure

```
Final-Project/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── tests/
├── config/
├── utils/
├── swagger.json
├── app.js
├── .env.example
```

---

## 🧠 Key Learnings

- Real-world version control using Git and GitHub  
- Secure authentication with GitHub OAuth  
- Modular backend architecture  
- Use of Swagger for API documentation  
- Email integration with Mailtrap  
- Unit testing with Jest  
- Team collaboration in a remote setting
