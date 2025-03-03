import JuteBag from "../models/product3dModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import TableModel from "../models/TableModel.js";


const addJuteBag = async (req, res) => {
  try {
    const { userId, sides, email } = req.body;

    if (!userId || !sides) {
      return res.status(400).json({ error: "Missing userId or sides data" });
    }

    const juteBag = new JuteBag({ userId, sides, email, createdAt: new Date() });
    await juteBag.save();

    res.status(201).json({ message: "Jute Bag added successfully!", id: juteBag._id });
  } catch (error) {
    console.error("Error adding Jute Bag:", error);
    res.status(500).json({ error: "Failed to add Jute Bag.", details: error.message });
  }
};

const fetchJuteBags = async (req, res) => {
  try {
    // ✅ Extract token from headers
    const {email} = req.body
    if (!email) {
      return res.status(400).json({ error: "Email not found in token" });
    }

    console.log("Fetching Jute Bags for Email:", email);

    // ✅ Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User ID:", user._id);

    // ✅ Fetch all Jute Bags for the email
    const juteBags = await JuteBag.find({ email });

    if (!juteBags || juteBags.length === 0) {
      return res.status(404).json({ message: "No Jute Bags found for this email" });
    }

    res.status(200).json({ message: "Jute Bags fetched successfully!", juteBags });
  } catch (error) {
    console.error("Error fetching Jute Bags:", error);
    res.status(500).json({ error: "Failed to fetch Jute Bags.", details: error.message });
  }
};

const addTable = async (req, res) => {
  try {
    const { userId, email, sides } = req.body; // Add `email`

    if (!userId || !sides || !email) {
      return res.status(400).json({ error: "Missing userId, sides, or email" });
    }

    console.log("Adding Table for:", email);

    const table = new TableModel({ userId, email, sides, createdAt: new Date() });
    await table.save();

    res.status(201).json({ message: "Table added successfully!", id: table._id });
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

    console.log("Fetching Tables for Email:", email);

    // ✅ Find all Tables for the email
    const tables = await TableModel.find({ email });

    if (!tables || tables.length === 0) {
      return res.status(404).json({ message: "No Tables found for this email" });
    }

    res.status(200).json({ message: "Tables fetched successfully!", tables });
  } catch (error) {
    console.error("Error fetching Tables:", error);
    res.status(500).json({ error: "Failed to fetch Tables.", details: error.message });
  }
};




export { addJuteBag, fetchJuteBags, addTable, fetchTables };
