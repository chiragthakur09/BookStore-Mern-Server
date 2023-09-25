import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(express.json());

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
