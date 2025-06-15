const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
require("./config/passport")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routes/authRouter")
app.use("/auth", authRouter)

// Routes
const apiRoutes = require("./routes");
app.use("/", apiRoutes);

// Server
app.listen(PORT, () => {
  console.log(`✅ Web server running at port: ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});