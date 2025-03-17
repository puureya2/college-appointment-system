import express from 'express';
import cors from 'cors';
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/users/userRoutes.js";
import appointmentRoutes from "./routes/appointments/appointmentRoutes.js";
import dateParser from "./middleware/dateParser.js";


const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(dateParser);

// connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);


// default app route
app.get("/", (req, res) => {
    res.send("College Appointment System API is running...");
});

// start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
