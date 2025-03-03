import ProductUpload3dSchema from '../models/productUpload3DModel.js'

// Controller for handling product-related operations

  // Create a new product
const createProduct =  async (req, res)=> {
    try {
      const productData = req.body;
      
      // Create new product with data from the request
      const product = new ProductUpload3dSchema(productData);
      
      // Save product to database
      const savedProduct = await product.save();
      
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: savedProduct
      });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create product',
        error: error.message
      });
    }
  }

  // Get all products
const getAllProducts =  async (req, res)=> {
    try {
      const products = await ProductUpload3dSchema.find({});
      
      return res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message
      });
    }
  }

  // Get a single product by ID
const getProductById =  async (req, res) =>{
    try {
      const { id } = req.params;
      const product = await ProductUpload3dSchema.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch product',
        error: error.message
      });
    }
  }

  // Update a product
const updateProduct =  async (req, res)=> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const product = await ProductUpload3dSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update product',
        error: error.message
      });
    }
  }

  // Delete a product
const  deleteProduct = async (req, res)=> {
    try {
      const { id } = req.params;
      
      const product = await ProductUpload3dSchema.findByIdAndDelete(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete product',
        error: error.message
      });
    }
  }


export {deleteProduct, updateProduct, getProductById, createProduct, getAllProducts};