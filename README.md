# Final-Project
Hospital Appointment Management API

Team Members:
1.Isaac Pasapera 
2.Mmusi Hubona 
3.Andrea Ramos 

🔧 Deployment Instructions
To properly configure and run the project with GitHub OAuth and Swagger on Render, follow these steps:
Update swagger.json

Change the host value to match your own Render deployment URL: "host": "your-app-name.onrender.com"

Set up your .env variables:
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://your-localhost-or-render-url/auth/github/callback
SESSION_SECRET=your_secret_key

Update GitHub OAuth Settings
Go to your GitHub Developer Settings > OAuth Apps, and update:

Homepage URL:
https://your-app-name.onrender.com

Authorization callback URL:
https://your-app-name.onrender.com/auth/github/callback
