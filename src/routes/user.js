const express = require("express");
const { userAuth } = require("../middlewarws/userauth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user")

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender photoUrl");
    
    const data = connectionRequest.map((row) => row.fromUserId);

    res.json({
      message: "data fetched successfully",
      data,
    });
  } catch (err) {toString()
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedUser._id, status: "accepted" },
        { fromUserId: loggedUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", "firstName lastName age gender photoUrl").populate("toUserId", "firstName lastName age gender photoUrl");
    const data = connectionRequests.map((row) =>{
      if(row.fromUserId._id.toString() === loggedUser._id.toString()){
        return toUserId
      }
     return row.fromUserId
    });
    res.json({
      message: "data fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


userRouter.get("/user/feed", userAuth, async (req, res) => {
  try{
    const loggedUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;

    limit = limit > 50 ? 50 : limit;

  const  skip = (page-1)*limit;

    const connectionRequest = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedUser._id},
        {toUserId:loggedUser._id}
      ]
    }).select("fromUserId toUserId");

   const hideUserFromFeed =new Set()
   connectionRequest.forEach((req)=>{
    hideUserFromFeed.add(req.fromUserId.toString());
    hideUserFromFeed.add(req.toUserId.toString())

   });

   const user = await User.find({
    $and:[
      {_id:{$nin: Array.from(hideUserFromFeed)}},
      {_id:{$ne: loggedUser._id}}
    ]
   }).select("firstName lastName age gender photoUrl skills").skip(skip).limit(limit)
    

    res.json({message:"feed fetched successful",
      user
    })
  }catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})
module.exports = userRouter;
