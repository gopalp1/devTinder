const express =require('express');
const bcrypt = require("bcrypt");
const { validateSignUpData,validateProfileEditData } = require("../utis/validation");
const User = require("../models/user");

const authRouter =express.Router();
authRouter.post("/signup", async (req, res) => {
    try {
      // validation of data
      validateSignUpData(req);
  
      // bcrypt password
      const { password, firstName, lastName, age, emailId } = req.body;
  
      const passowrdHash = await bcrypt.hash(password, 10);
  
      const user = new User({
        password: passowrdHash,
        firstName,
        lastName,
        age,
        emailId,
      });
      await user.save();
      res.send("Signed up successfully...");
    } catch (error) {
      console.error(error);
      res.status(400).send("ERROR :" + error.message);
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { password, emailId } = req.body;
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("invalid credential");
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (passwordValid) {
        // jwt token
        const token = await user.getJwt()
  
        // store into cookies
  
        res.cookie("token", token);
        res.send("login successfully");
      } else {
        throw new Error("invalid credential");
      }
  
    } catch (error) {
     
      res.status(401).send("ERROR :" + error.message);
    }
  });

  authRouter.post("/logout", async (req, res) => {
    res.cookie("token",null,{
        expires: newDate(Date.now())
    });
    res.send("logout Successfully")
  })
module.exports = authRouter