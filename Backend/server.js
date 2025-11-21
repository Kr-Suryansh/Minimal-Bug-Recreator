import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import generateRoutes from "./routes/generate.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", generateRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
