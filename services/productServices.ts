import Product, { IProduct } from "../models/Product";

export const createProduct = async (data: Partial<IProduct>) => {
  const product = new Product(data);
  return await product.save();
};

export const getProducts = async () => {
  return await Product.find().populate("createdBy", "name email");
};

export const getProductById = async (id: string) => {
  return await Product.findById(id).populate("createdBy", "name email");
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
