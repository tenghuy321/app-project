import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config(); // MUST be at the very top

const app = express();

app.use(cors({
  origin: "https://demo.lthtitan.online",  // frontend domain
  credentials: true,
}))
app.use(express.json());

// Debug: check if environment variable is loaded
console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
