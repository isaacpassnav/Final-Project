# Final-Project
## Hospital Appointment Management API

Team Members:
1.Isaac Pasapera 
2.Mmusi Hubona 
3.Andrea Ramos 
4.Folusho Sanni

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

## ✅ Running Tests with Jest
Follow these steps to properly run the project tests.
Make sure Jest is installed and properly configured in package.json.

To run all tests with a detailed output:
    npx jest __tests__ --verbose
To run a specific test file (for example, the doctor controller):
    npx jest __tests__/doctorController.test.js --verbose

Use --verbose to see detailed results for each test.