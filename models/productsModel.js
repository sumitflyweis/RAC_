const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const productSchema = mongoose.Schema({
  vendorId: {
    type: objectId,
    ref: "user",
  },
  productName: {
    type: String,
    default: "",
  },
  productType: {
    type: String,
    enum: ["home", "domestic", "other", ""],
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  review: [
    {
      userId: {
        type: objectId,
        ref: "user",
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalRating: {
    type: Number,
    default: 0,
  },
  avgStarRating: {
    type: Number,
    default: 0,
  },
  productImage: {
    type: Array,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  offerPrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    default: "",
  },
  capacity: {
    type: String,
    default: "",
  },
  features: [
    {
      type: String,
      default: "",
    },
  ],
  colour: {
    type: String,
    default: "",
  },
  deliveryCharges: {
    type: String,
    default: "",
  },
  availableStock: {
    type: String,
    default: "",
  },
  warranty: {
    type: String,
    default: "",
  },
  replacement: {
    type: String,
    default: "",
  },
});
const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
