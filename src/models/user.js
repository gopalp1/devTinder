const mongoose = require('mongoose');
const validator =require('validator')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        minLength:5,
        maxLingth:24,
    },
lastName:{
        type:String,
        required:true,

    },
    emailId:{
        type:String,
        // lowercase:true,
        required:true,
        unique:true,
        trim:true,
        // validate(value){
        //     if(!validator.isEmail.value){
        //         throw new Error("invalid email address") 
        //     }
        // }
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        min:18
    },

    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valide") 
            }
        }
    },
    photoUrl:{
        type:String,
        dafault:"https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
    },
    skills:{
        type:[String]
    },  
},
{
    timestamps:true
}
);
userSchema.methods.getJwt =async function(){
const user = this;
const token  = await jwt.sign({ _id: user._id }, "Gopal@123", {
    expiresIn: "7d",
  });
  return token
}

userSchema.methods.validatePassword =async function(){
    const user = this; 

}
module.exports= mongoose.model('User',userSchema);