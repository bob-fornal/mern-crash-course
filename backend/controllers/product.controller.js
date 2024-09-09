import mongoose from 'mongoose';

import Product from '../models/product.model.js';

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({});
    response.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const createProduct = async (request, response) => {
  const product = request.body;

  if (!product || !product.name || !product.price || !product.image) {
    return response.status(400).json({
      success: false,
      message: 'Please fill all fields',
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    response.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const updateProduct = async (request, response) => {
  const { id } = request.params;
  const product = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).json({
      success: false,
      message: 'Invalid Product Id',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    response.status(200).json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const deleteProduct = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).json({
      success: false,
      message: 'Invalid Product Id',
    });
  }
  
  try {
    await Product.findByIdAndDelete(id);
    response.status(200).json({
      success: true,
      message: 'Product deleted',
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};