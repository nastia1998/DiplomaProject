import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const port = process.env.port;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
