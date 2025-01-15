const express = require("express");
const app = express();
const { adminAuth } = require("./middlewarws/auth");
const connectDB = require("./configs/database");
const cookiesParser = require("cookie-parser");
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
// const authRouter = require("./routes/auth")

app.use(express.json());
app.use(cookiesParser());






app.use("/",authRouter);
app.use("/",profileRouter);



connectDB()
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(4000, () => {
      console.log("server is running successfully ...");
    });
  })
  .catch((err) => {
    console.log("MongoDB not connected...");
  });
