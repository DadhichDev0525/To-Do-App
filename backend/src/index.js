import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configuration/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoute from "./routes/protectedRoutes.js";
import todoRoutes from './routes/todoRoutes.js'
import subTodoRoutes from './routes/subTodoRoutes.js'

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected",protectedRoute)
app.use("/api/todos",todoRoutes)
app.use("/api/subtodos",subTodoRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
