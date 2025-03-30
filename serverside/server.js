import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import router from "./routes/Products.js";
import connectDB from "./config/db.js";
dotenv.config();

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", router);

app.get("/", (req, res) => {
  res.send("Welcome to the MERN Auth API");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
