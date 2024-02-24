import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
