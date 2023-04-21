import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name must be present"],
    },
    lastName : {
        type: String,
    },
    email : {
        type : String,
        required : [true, "Email must be present"],
        unique : true,
        validate : validator.isEmail
    },
    password : {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "password length must be at least 6 characters"],
        select: true
    },
    location : {
        type: String,
        default: "India",
    }
}, 
    { timestamps : true }
);

// middlewares 
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

// Compare Passswords 
userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

// JSON Webtoken 
userSchema.methods.createJWT = function() {
    return JWT.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

export default mongoose.model('User', userSchema);
