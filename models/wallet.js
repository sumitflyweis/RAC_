const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: objectId,
      ref: "user",
      required: false,
    },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
