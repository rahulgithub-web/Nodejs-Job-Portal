import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;
  //   if (!name) {
  //     next("name is required");
  //   }
  //   if (!email) {
  //     next("email is required");
  //   }
  //   if (!password) {
  //     next("password is required & greater than 6 characters");
  //   }
  //   const existingUser = await userModel.findOne({ email });
  //   if (existingUser) {
  //     next("Email Already Register! Please Login!");
  //   }
  const user = await userModel.create({ name, email, password });
  //token
  const token = user.createJWT();
  return res
    .status(201)
    .send({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
};

export const loginController = async (req, res, next) => {
  const {email, password} = req.body;

  // validation 
  if(!email || !password) {
    next('Please provide email and password')
  }

  // find user by email 
  const user = await userModel.findOne({email}).select("+password")
  if(!user) {
    next('Invalid username or password')
  }

  // compare password  
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    next('Invalid username or password')
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({success: true, message: 'user logged in successfully', user, token })
};