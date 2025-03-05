import mongoose from 'mongoose'

const sideSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, default: "#d4b895" },
  image: { type: String, default: null }, // Store image URL or Base64
  width: { type: String, required: true }, // Keeping it as string since your values are in quotes
  height: { type: String, required: true },
  up: { type: String, required: true },
  right: { type: String, required: true },
  forward: { type: String, required: true },
});

const ProductUpload3dSch = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
   emailId: { type: String, required: true},
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0,
    default: 0
  },
  compareAtPrice: {
    type: Number,
    min: 0,
    default: 0
  },
  costPerItem: {
    type: Number,
    min: 0,
    default: 0
  },
  profit: {
    type: String,
    default: '—'
  },
  margin: {
    type: String,
    default: '—'
  },
  chargeTax: {
    type: Boolean,
    default: true
  },
  trackQuantity: {
    type: Boolean,
    default: true
  },
  continueWhenOutOfStock: {
    type: Boolean,
    default: false
  },
  hasSKU: {
    type: Boolean,
    default: false
  },
  isPhysical: {
    type: Boolean,
    default: true
  },
  sides: { type: [sideSchema], required: false },
  weight: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Archived'],
    default: 'Active'
  },
  type: {
    type: String,
    trim: true
  },
  vendor: {
    type: String,
    trim: true
  },
  collections: {
    type: String,
    trim: true
  },
  tags: {
    type: String,
    trim: true
  },
  dimensions: {
    height: {
      type: Number,
      default: 0
    },
    breadth: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 0
    }
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ProductUpload3dSch.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ProductUpload3dSchema = mongoose.models.ProductUpload3d ||  mongoose.model('ProductUpload3d', ProductUpload3dSch)
export default ProductUpload3dSchema;

// import mongoose from "mongoose";

// const fs = new mongoose.Schema({}, { strict: false });

// const ProductUpload3dSchema = mongoose.model("ProductUpload3d", fs);

// export default ProductUpload3dSchema;