import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoute);
mongoose
  .connect(process.env.MOGODB_URL)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on 5000");
});
