import mongoose from "mongoose";

const sideSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, default: "#d4b895" },
  image: { type: String, default: null },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  up: { type: Number, required: true },
  right: { type: Number, required: true },
  forward: { type: Number, required: true }
});

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Table" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  sides: [sideSchema], // Store all sides of the Table
  createdAt: { type: Date, default: Date.now }
});

const TableModel = mongoose.model("Table", tableSchema);
export default TableModel;
