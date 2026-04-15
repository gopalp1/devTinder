const express = require("express");
const { userAuth } = require("../middlewarws/userauth");
const User = require("../models/user")
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"].includes(status);
      if (!allowedStatus) {
        return res
          .status(400)
          .json({ message: "status type is not valid" + status });
      }
      const user = await User.findById(toUserId);
      if (!user) {
        return res
          .status(400)
          .json({ message: "User not found" });
      }
      const existingConnection = await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
      });
      if (existingConnection) {
        return res
          .status(400)
          .json({ message: "Connection request Already exists!" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "request sent successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try{

      const loggedUser = req.user;
      const {status,requestId} = req.params
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status type is not valid: " + status });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedUser._id,
        status:"interested"
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found!!" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({message:"connection request "+ status,
        data
      })
    }catch(err){
      res.status(400).send("ERROR : " + err.message)
    }
  })

module.exports = requestRouter;
