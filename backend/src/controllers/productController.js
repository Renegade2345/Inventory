const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");


/**
 * Create new product
 * Only logged-in users can add products
 */
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  if (!name || price === undefined || quantity === undefined || !category) {
    throw new ApiError(400, "Required product fields are missing");
  }

  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    category,
  });

  res.status(201).json({
    status: "success",
    data: product,
  });
});


/**
 * Fetch all products
 * Supports search, category filter and price sorting
 */
exports.getProducts = asyncHandler(async (req, res) => {
  const { search, category, sort } = req.query;

  let query = {};

  // If search keyword is provided, match against name & description
  if (search) {
    query.$text = { $search: search };
  }

  // If category filter is provided
  if (category) {
    query.category = category;
  }

  let productQuery = Product.find(query);

  // Sorting logic based on query param
  if (sort === "price_asc") {
    productQuery = productQuery.sort({ price: 1 });
  }

  if (sort === "price_desc") {
    productQuery = productQuery.sort({ price: -1 });
  }

  const products = await productQuery;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});


/**
 * Get single product by ID
 */
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});


/**
 * Update product details
 * Only authenticated users allowed
 */
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});


/**
 * Delete product from inventory
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});
