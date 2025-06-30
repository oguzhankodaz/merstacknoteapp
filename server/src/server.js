/** @format */
import express from "express";
import notesRoutes from "./routes/notesRoutes.js"; // .js uzantısı şart
import { connectDB } from "./config/db.js";
import { limiter } from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";

//app.use(limiter)  BÜTÜN YAPIYA UYGULAR

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//middleware

// 2. JSON parse middleware
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));
// 3. Logger (opsiyonel)
app.use((req, res, next) => {
  console.log(`Method: ${req.method} - URL: ${req.url}`);
  next();
});

// 4. Routes
app.use("/api/notes", limiter, notesRoutes);

// 5. Veritabanı bağlantısı ve server başlatma

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Bağlantı olmazsa uygulamayı kapat
  }
};
startServer();
