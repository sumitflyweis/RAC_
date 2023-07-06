const mongoose = require("mongoose");
const schema = mongoose.Schema;
const DocumentSchema = schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "user"
  },
  vendorId: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  Orders: {
    type: schema.Types.ObjectId,
    ref: "Order",
  },
  reason: {
    type: String
  },
  orderStatus: {
    type: String,
    enum: ["return", "cancel"],
  },
  refundStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },
}, { timestamps: true })
module.exports = mongoose.model("cancelReturnOrder", DocumentSchema);