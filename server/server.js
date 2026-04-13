require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict to the frontend origin
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://internship-tracker-gray.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Rate limiting on auth routes to prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api/auth", authLimiter);

require("./config/mongoose.config");

require("./routes/auth.routes")(app);
require("./routes/application.routes")(app);

app.get("/", (req, res) => res.json({ message: "Internship Tracker API running" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
