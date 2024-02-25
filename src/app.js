import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import db from "./db.js";
import authRoutes from "./routes/auth.js";
import session from "express-session";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "No envs again. I am too lazy to add them.",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRoutes);

db.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
});
