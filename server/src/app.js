import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import levelRoutes from "./routes/levelRoutes";
import skillRoutes from "./routes/skillRoutes";
import mentorRoutes from "./routes/mentorRoutes";

dotenv.config();

const port = process.env.port;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { exp } = await jwt.verify(accessToken, process.env.JWT_KEY);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
    next();
  } else {
    next();
  }
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/mentors", mentorRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
