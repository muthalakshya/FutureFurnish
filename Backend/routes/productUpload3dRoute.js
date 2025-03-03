import express from 'express'

import {deleteProduct, updateProduct, getProductById, createProduct, getAllProducts} from '../controllers/productUpload3dController.js';
// const auth = require('../middleware/auth');


const product3dUploadRouter = express.Router();
// Create a new product
product3dUploadRouter.post('/createProduct',  createProduct);

// Get all products
product3dUploadRouter.get('/getAllProducts', getAllProducts);

// Get a single product by ID
// product3dUploadRouter.get('/:id', getProductById);

// Update a product
// router.put('/:id', auth, updateProduct);

// Delete a product
// router.delete('/:id', auth, deleteProduct);

export default product3dUploadRouter;