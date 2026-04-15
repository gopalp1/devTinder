const express = require("express");
const app = express();
const { adminAuth } = require("./middlewarws/auth");
const connectDB = require("./configs/database");
const cookiesParser = require("cookie-parser");
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
const cors = require("cors")

app.use(express.json());
app.use(cookiesParser());
app.use(cors({
  origin:"",
  credentials:true
}))





app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);





connectDB()
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(4000, () => {
      console.log("server is running successfully on port 4000 ...");
    });
  })
  .catch((err) => {
    console.log("MongoDB not connected...");
  });
