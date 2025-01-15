const express =require('express');
const {userAuth} = require("../middlewarws/userauth")
const { validateProfileEditData } = require("../utis/validation");

const profileRouter =express.Router();
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = await req.user;
  
      res.send(user); // Send the response
    } catch (err) {
      res.status(400).send("ERROR: " + err.message); 
    }
  });

  profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    
    try{

      if(!validateProfileEditData(req)){
        throw new Error ("invalid edit field")
      }
      const loggedInUser = req.user;
      
     Object.keys(req.body).forEach((key)=> (loggedInUser[key]= req.body[key]) );
     
     
      await loggedInUser.save()
      res.json({
        message:"profile update successfully",
        data:loggedInUser
      })
      res.send("user updated successfully")
    }catch(error){
      res.status(400).send("ERROR : " + error.message)
    }
  })


module.exports = profileRouter