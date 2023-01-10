const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
	console.log("Connected To MongoDB...");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/task", taskRoute);

app.listen(8000, () => {
	console.log("Server is running...");
});
