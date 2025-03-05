import JuteBag from "../models/product3dModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import TableModels from "../models/TableModel.js";
import {v2 as cloudinary} from "cloudinary"



// const addJuteBag = async (req, res) => {
//   try {
//     const { userId, sides, email } = req.body;

//     if (!userId || !sides) {
//       return res.status(400).json({ error: "Missing userId or sides data" });
//     }

//     console.log(sides[0].image)

//     const juteBag = new JuteBag({ userId, sides, email, createdAt: new Date() });
//     await juteBag.save();

//     res.status(201).json({ message: "Jute Bag added successfully!", id: juteBag._id });
//   } catch (error) {
//     console.error("Error adding Jute Bag:", error);
//     res.status(500).json({ error: "Failed to add Jute Bag.", details: error.message });
//   }
// };


const addJuteBag = async (req, res) => {
  try {
    const { userId, sides, email } = req.body;

    if (!userId || !sides) {
      return res.status(400).json({ error: "Missing userId or sides data" });
    }

    const processedSides = await Promise.all(
      sides.map(async (side) => {
        const updatedSide = { ...side };
        
        // Check if side has an image with a URL
        if (side.image && side.image.base64) {
          try {
            // const convertBlobToBase64 = (file) => {
            //   return new Promise((resolve, reject) => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onloadend = () => resolve(reader.result); // Get Base64
            //     reader.onerror = (error) => reject(error);
            //   });
            // };
            // try {
            //   const base64String = await convertBlobToBase64(side.image.url);
            //   setBase64(base64String);
            //   console.log("Base64 Image:", base64String); // Log Base64 Data
            // } catch (error) {
            //   console.error("Error converting Blob to Base64:", error);
            // }
            // Check if the URL is a base64 data URL
            // console.log(side.image.url)
            if (side.image.base64.startsWith('data:image')) {
              // console.log(`Uploading base64 image for side ${side.id}`);
              
              const uploadResult = await cloudinary.uploader.upload(side.image.base64, {
                folder: "jute-bags",
                public_id: `jute_${side.id}_${Date.now()}`,
                resource_type: "image"
              });
              
              // Update image with Cloudinary data
              updatedSide.image = {
                ...side.image,
                url: uploadResult.secure_url,
                cloudinaryId: uploadResult.public_id,
                // Keep width, height, and other properties
                width: side.image.width,
                height: side.image.height,
                up: side.image.up,
                right: side.image.right,
                forward: side.image.forward
              };
              
              // console.log(`Successfully uploaded image for side ${side.id}`);
            } else {
              console.warn(`Image for side ${side.id} is not in base64 format, keeping original URL`);
            }
          } catch (uploadError) {
            console.error(`Error uploading image for side ${side.id}:`, uploadError);
            // Keep original data if upload fails
          }
        }
        
        return updatedSide;
      })
    );

    const juteBag = new JuteBag({
      userId,
      sides: processedSides,
      email,
      createdAt: new Date(),
    });

    await juteBag.save();

    res.status(201).json({
      message: "Jute Bag added successfully!",
      id: juteBag._id,
    });
  } catch (error) {
    console.error("Error adding Jute Bag:", error);
    res.status(500).json({
      error: "Failed to add Jute Bag.",
      details: error.message,
    });
  }
};
const fetchJuteBags = async (req, res) => {
  try {
    // ✅ Extract token from headers
    const {email} = req.body
    // console.log(email,"f")
    if (!email) {
      return res.status(400).json({ error: "Email not found in token" });
    }

    // console.log("Fetching Jute Bags for Email:", email);

    // ✅ Find user by email
    const user = await JuteBag.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // console.log("User ID:", user._id);

    // ✅ Fetch all Jute Bags for the email
    const juteBags = await JuteBag.find({ email });
    // console.log(juteBags)
    if (!juteBags || juteBags.length === 0) {
      return res.status(404).json({ message: "No Jute Bags found for this email" });
    }

    res.status(200).json({success : true, message: "Jute Bags fetched successfully!", juteBags });
  } catch (error) {
    console.error("Error fetching Jute Bags:", error);
    res.status(500).json({ error: "Failed to fetch Jute Bags.", details: error.message });
  }
};
const removeJuteBag = async (req, res) => {
  try {
      await  JuteBag.findByIdAndDelete(req.body.userdId);
      res.json({success:true,message:"Deleted"})
  } catch (error) {
      console. log(error)
      res.json( {success : false, message: error. message})
  }
}

const addTable = async (req, res) => {
  try {
    const { userId, email, sides } = req.body; // Add `email`

    if (!userId || !sides || !email) {
      return res.status(400).json({ error: "Missing userId, sides, or email" });
    }

    const processedSides = await Promise.all(
      sides.map(async (side) => {
        const updatedSide = { ...side };
        
        // Check if side has an image with a URL
        if (side.image && side.image.base64) {
          try {
            // Check if the URL is a base64 data URL
            if (side.image.base64.startsWith('data:image')) {
              // console.log(`Uploading base64 image for side ${side.id}`);
              
              const uploadResult = await cloudinary.uploader.upload(side.image.base64, {
                folder: "tables",
                public_id: `table_${side.id}_${Date.now()}`,
                resource_type: "image"
              });
              
              // Update image with Cloudinary data
              updatedSide.image = {
                ...side.image,
                url: uploadResult.secure_url,
                cloudinaryId: uploadResult.public_id,
                // Keep width, height, and other properties
                width: side.image.width,
                height: side.image.height,
                up: side.image.up,
                right: side.image.right,
                forward: side.image.forward
              };
              
              // console.log(`Successfully uploaded image for side ${side.id}`);
            } else {
              console.warn(`Image for side ${side.id} is not in base64 format, keeping original URL`);
            }
          } catch (uploadError) {
            console.error(`Error uploading image for side ${side.id}:`, uploadError);
            // Keep original data if upload fails
          }
        }
        
        return updatedSide;
      })
    );
    const table = new TableModels({
      userId,
      sides: processedSides,
      email,
      createdAt: new Date(),
    });

    await table.save();

    res.status(201).json({
      message: "Table added successfully!",
      id: table._id,
    });
  } catch (error) {
    console.error("Error adding Table:", error);
    res.status(500).json({ error: "Failed to add Table.", details: error.message });
  }
};

const fetchTables = async (req, res) => {
  try {
    const { email } = req.body; // Fetch by email

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // console.log("Fetching Tables for Email:", email);

    // ✅ Find all Tables for the email
    const tables = await TableModels.find({ email });

    if (!tables || tables.length === 0) {
      return res.status(404).json({ message: "No Tables found for this email" });
    }

    res.status(200).json({ message: "Tables fetched successfully!", tables });
  } catch (error) {
    console.error("Error fetching Tables:", error);
    res.status(500).json({ error: "Failed to fetch Tables.", details: error.message });
  }
};




export { addJuteBag, fetchJuteBags, addTable, fetchTables, removeJuteBag };
