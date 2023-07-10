const productModel = require("../models/productsModel");

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      desc,
      price,
      offerPrice,
      discount,
      brand,
      capacity,
      features,
      colour,

      //  productImage:[{
      //     type:Array,
      //     default:""
      //  }],
      //  price:{
      //     type:Number,
      //     default:0
      //  },
      //  offerPrice:{
      //     type:Number,
      //     default:0
      //  },
      //  discount:{
      //     type:Number,
      //     default:0
      //  },
      //  brand:{
      //     type:String,
      //     default:""
      //  },
      //  capacity:{
      //     type:String,
      //     default:""
      //  },
      //  features:[{
      //     type:String,
      //     default:""
      //  }],
      //  colour:{
      //     type:String,
      //     default:""
      //  },
      //  deliveryCharges:{
      //    type:String,
      //    default:""
      //  },
      //  availableStock:{
      //    type:String,
      //    default:""
      //  },
      //  warranty:{
      //    type:String,
      //    default:""
      //  },
      //  replacement:{
      //    type:String,
      //    default:""
      //  }
    } = req.body;

    const vendorId = req.user._id;

    // Validate input
    if (!productName || !productType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = new productModel({
      vendorId,
      productName,
      productType,
      desc,
      price,
      offerPrice,
      discount,
      brand,
      capacity,
      features,
      colour,
    });
    newProduct.offerPrice = price - (price * discount) / 100;
    const savedProduct = await newProduct.save();
    res.status(201).send({
      status: 200,
      message: "Registered successfully ",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).send({
      status: 200,
      message: "success",
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).send({
      status: 200,
      message: "success",
      data: product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      productType,
      desc,
      price,
      offerPrice,
      discount,
      brand,
      capacity,
      features,
      colour,
    } = req.body;

    // Validate input
    if (!productName || !productType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingProduct = await productModel.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    existingProduct.productName = productName;
    existingProduct.productType = productType;
    existingProduct.desc = desc;
    existingProduct.price = price;
    existingProduct.offerPrice = offerPrice;
    existingProduct.discount = discount;
    existingProduct.brand = brand;
    existingProduct.capacity = capacity;
    existingProduct.features = features;
    existingProduct.colour = colour;

    const updatedProduct = await existingProduct.save();
    res.status(200).send({
      status: 200,
      message: "updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).send({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProductImages = async (req, res) => {
  try {
    // Extract the product ID and image array from the request body
    let productImage = [];
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      const product = await productModel.findOneAndUpdate({ _id: req.params.id },{$push: {productImage: req.files[i].path,},},{ new: true }
      );
    }
    const product = await productModel.findById({ _id: req.params.id })

    res.status(200).json({message: "Product images updated successfully.",data: product,});
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.addProductReview = async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const productId = req.params.id;

    // Validate input
    if (!userId || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the review array
    product.review.push({ userId, rating });

    // Calculate the average rating and total rating
    let Rating = 0;
    let avgStarRating = 0;

    product.review.forEach((review) => {
      Rating += review.rating;
    });

    avgStarRating = Rating / product.review.length;

    // Update the product with the new average rating and total rating
    product.totalRating = product.review.length;
    product.avgStarRating = avgStarRating;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error adding product review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addProductReview = async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const productId = req.params.id;

    if (!userId || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if user already gave a rating
    const existingReview = product.review.find(
      (review) => review.userId.toString() === userId.toString()
    );

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "User already gave a rating for this product" });
    }

    // Update the review array
    product.review.push({ userId, rating });

    // Calculate the average rating and total rating
    let totalRating = 0;
    let avgStarRating = 0;

    product.review.forEach((review) => {
      totalRating += review.rating;
    });

    avgStarRating = totalRating / product.review.length;

    // Update the product with the new average rating and total rating
    product.totalRating = totalRating;
    product.avgStarRating = avgStarRating;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error adding product review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
