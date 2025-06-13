const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRouter");
const especialtyRouter = require("./routes/specialtyRouter");
const hospitalRouter = require("./routes/hospitalRouter");
const userRouter = require("./routes/userRouter")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/doctors", doctorRoutes);
app.use("/api/specialties", especialtyRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`✅ Web server running at port: ${PORT}`);
});
