const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a valid EmailId Address");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["Male", "Female"].includes(value)) {
                throw new Error("Not a valid Gender");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    },
    about: {
        type: String,
        default: "This is default"
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
)

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEVTinder@$123", {
        expiresIn: "1d"
    })
    return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}


const User = mongoose.model("User", userSchema);
module.exports = User;