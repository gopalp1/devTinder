const validator=require('validator');

const validateSignUpData=(req)=>{
 const {firstName,lastName,emailId,password} = req.body 

 if(!firstName || !lastName){
    throw new Error ("name is not valid")
 }else if(!validator.isEmail(emailId)){
    throw new Error ("Email is a not valid")

 }else if(!validator.isStrongPassword(password)){
    throw new Error ("Please enter a strong password")
    
 }
}

const validateProfileEditData =  (req) =>{
   const allowed_updates = [
              "firstName",
              "lastName",
              "gender",
              "age",
              "photoUrl",
              "skills",
            ];
            const isUpadateAllowed = Object.keys(req.body).every(key => 
              allowed_updates.includes(key)
            );

            return isUpadateAllowed;
}

module.exports={validateSignUpData,
   validateProfileEditData
}