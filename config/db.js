// password : 1hXVxc1XPVjnQnFX
// username : rahulbarnwalonlyu2
//MONGO_URI : mongodb+srv://rahulbarnwalonlyu2:1hXVxc1XPVjnQnFX@cluster0.crf1v2d.mongodb.net/job-app

import mongoose from "mongoose";
import colors from "colors";

const connectDB = async (req, res) => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb Database: ${mongoose.connection.host}`.bgMagenta.white)
    } catch (err) {
        console.log(`MongoDB Error: ${err}`.bgRed.white)
    };
};

export default connectDB;
