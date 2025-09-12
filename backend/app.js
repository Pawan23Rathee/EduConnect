const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", authRoutes);
app.use("/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
