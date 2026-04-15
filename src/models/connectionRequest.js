const mongoose =require('mongoose');


const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps:true
})
connectionRequestSchema.pre("save", function(){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself..")
    }
    // next()
})

// const ConnectionRequest = new mongoose.model("ConnectionRequet",connectionRequestSchema);
module.exports = new mongoose.model("ConnectionRequet",connectionRequestSchema)