const validator = require('validator')

const ValidateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Enter the name");
        
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email Id not Valid");
        
    }
    else if(!validator.isStrongPassword(password)){{
        throw new Error("Password is not strong");
        
    }}
}

const validateEditProfileData=(req)=>{
    const allowedEditFields = ["firstName","lastName", "photoUrl", "about", "gender", "age", "skills"];
    const isEditAllowed = Object.keys(req.body).every((k) => allowedEditFields.includes(k));
    return isEditAllowed
}

module.exports={ValidateSignUpData,validateEditProfileData}