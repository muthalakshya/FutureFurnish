import ProductUpload3dSchema from '../models/productUpload3DModel.js'
import {v2 as cloudinary} from "cloudinary"
// Controller for handling product-related operations

const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Image upload handling
    if (productData.imageUrl && productData.imageUrl.startsWith("data:image")) {
      try {
        const uploadResult = await cloudinary.uploader.upload(productData.imageUrl, {
          folder: "uploadManual",
          public_id: `uploadManual_${Date.now()}`,
          resource_type: "image"
        });
        productData.imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
          error: uploadError.message
        });
      }
    } else {
      productData.imageUrl = null;
    }

    // Sides handling - upload images for sides if they exist
    if (productData.sides && Array.isArray(productData.sides)) {
      try {
        // Only process sides with images
        const updatedSides = await Promise.all(
          productData.sides.map(async (side) => {
            // Check if side has a base64 image
            if (side.image && side.image.base64.startsWith("data:image")) {
              try {
                const result = await cloudinary.uploader.upload(side.image.base64, {
                  folder: "productSides",
                  public_id: `side_${Date.now()}`,
                  resource_type: "image"
                });
                // Update side with Cloudinary URL
                return { ...side, image: result.secure_url };
              } catch (sideUploadError) {
                console.error("Side Image Upload Error:", sideUploadError);
                // Return original side if upload fails
                return side;
              }
            }
            return side;
          })
        );

        // Update sides with processed URLs
        productData.sides = updatedSides;
      } catch (sidesProcessError) {
        console.error("Sides Processing Error:", sidesProcessError);
      }
    }

    // Create a new product with the updated data
    const product = new ProductUpload3dSchema(productData);

    console.log("Product Data for Creation:", JSON.stringify(productData, null, 2));

    // Save product to database
    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

  // Create a new product
  // const createProduct = async (req, res) => {
  //   try {
  //     const productData = req.body;
  
  //     // Check if productData.imageUrl exists and is in Base64 format
  //     if (productData.imageUrl && productData.imageUrl.startsWith("data:image")) {
  //       try {
  //         // Upload image to Cloudinary
  //         const uploadResult = await cloudinary.uploader.upload(productData.imageUrl, {
  //           folder: "uploadManual",
  //           public_id: `uploadManual_${Date.now()}`,
  //           resource_type: "image"
  //         });
  
  //         // Update imageUrl with Cloudinary secure URL
  //         productData.imageUrl = uploadResult.secure_url;
  //       } catch (uploadError) {
  //         console.error("Cloudinary Upload Error:", uploadError);
  //         return res.status(500).json({
  //           success: false,
  //           message: "Image upload failed",
  //           error: uploadError.message
  //         });
  //       }
  //     } else {
  //       // If imageUrl is null or not in Base64 format, keep it null
  //       productData.imageUrl = null;
  //     }
  
  //     // Create a new product with the updated data
  //     const product = new ProductUpload3dSchema(productData);
  
  //     console.log("Product Data:", productData);
  
  //     // Save product to database
  //     const savedProduct = await product.save();
  
  //     return res.status(201).json({
  //       success: true,
  //       message: "Product created successfully",
  //       data: savedProduct
  //     });
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Failed to create product",
  //       error: error.message
  //     });
  //   }
  // };

  // const createProduct = async (req, res) => {
  //   try {
  //     const productData = req.body;
  
  //     // Check if sides exist and contain images
  //     if (productData.sides && Array.isArray(productData.sides)) {
  //       // Upload images to Cloudinary and update their URLs
  //       const updatedSides = await Promise.all(
  //         productData.sides.map(async (side) => {
  //           if (side.image) {
  //             const result = await cloudinary.uploader.upload(side.image, {
  //               resource_type: 'image',
  //             });
  //             side.image = result.secure_url; // Update image with Cloudinary URL
  //           }
  //           return side;
  //         })
  //       );
  
  //       productData.sides = updatedSides;
  //     }
  
  //     // Create new product with updated data
  //     const product = new ProductUpload3dSchema(productData);
  //     const savedProduct = await product.save();
  
  //     return res.status(201).json({
  //       success: true,
  //       message: 'Product created successfully',
  //       data: savedProduct,
  //     });
  //   } catch (error) {
  //     console.error('Error creating product:', error);
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Failed to create product',
  //       error: error.message,
  //     });
  //   }
  // };
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
// const getProductById =  async (req, res) =>{
//     try {
//       const { id } = req.params;
//       const product = await ProductUpload3dSchema.findById(id);
      
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: 'Product not found'
//         });
//       }
      
//       return res.status(200).json({
//         success: true,
//         data: product
//       });
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to fetch product',
//         error: error.message
//       });
//     }
//   }

const getProductById =  async (req, res) =>{
  try {
    const { email } = req.body;
    const product = await ProductUpload3dSchema.find({emailId:email});
    console.log(product)
    
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