import validator from 'validator';
import bcrypt from  'bcryptjs';
import jwt from "jsonwebtoken";  // Import jsonwebtoken
import userModel from '../models/userModel.js';  // Keep the .js extension

// Function to create JWT token
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '100h' });
};

// Route for user login
const loginUser = async (req, res) => {
    // Implement login logic here
    try {
        const { email, password, userType } = req.body;
        const user = await userModel.findOne({email});
        console.log(user)

        if (!user)
            return res.json({success:false, message: "User doesn't exists"})

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            const userTypeData = user.userType
            res.json({success : true, token,userTypeData})
        }
        else {
            res.json({success: false, message: 'Invalid credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
};

const userProfile = async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find user in the database
    const user = await userModel.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send success response
    res.json({ success: true, user });

  } catch (error) {
    console.error("User Profile Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const registerUser = async (req, res) => {
    try {
      const { fullName, email, phoneNumber, password, userType, ...rest } = req.body;
      // Validate required fields
      if (!fullName || !email || !phoneNumber || !password || !userType) {
        return res.json({ success: false, message: "All fields are required" });
      }
      // Validate user type
      if (!["customer", "consultant", "industry"].includes(userType)) {
        return res.json({ success: false, message: "Invalid user type" });
      }
  
      // Check if the user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, message: "User already exists" });
      }
  
      // Validate email and password
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Invalid email format" });
      }
      if (password.length < 8) {
        return res.json({ success: false, message: "Password must be at least 8 characters long" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user object based on userType
      let userData = { fullName, email, phoneNumber, password: hashedPassword, userType };
  
      if (userType === "customer") {
        userData.address = rest.address;
      } else if (userType === "consultant") {
        userData.expertise = rest.expertise || [];
        userData.yearsOfExperience = rest.yearsOfExperience;
        userData.linkedInProfile = rest.linkedInProfile;
        userData.introduction = rest.introduction;
        userData.resume = rest.resume;
      } else if (userType === "industry") {
        // userData.businessOwner = rest.businessOwner;
        userData.businessName = rest.businessName;
        userData.businessType = rest.businessType;
        userData.address = rest.address;
        userData.additionalInfo = rest.additionalInfo;
        userData.message = rest.message;
      }
  
      // Save the user to the database
      const user = await userModel.create(userData);
  
      // Generate a token
      const token = createToken(user._id);
  
      res.json({ success: true, message: "User registered successfully", token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

// Route for admin login
const adminLogin = async (req, res) => {
    // Implement admin login logic here
    try {
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt. sign(email+password, process. env. JWT_SECRET);
            res.json( {success : true, token} )
        } else {
            res.json( {success: false, message: "Invalid credentials"})
        }
    } catch(error) {
        console.log(error);
        res.json({ success: false, message: error.message})
    }
};


export { loginUser, registerUser, adminLogin, userProfile };