const mongoose = require("mongoose");
const schema = mongoose.Schema;
const DocumentSchema = schema({
  orderId: {
    type: String
  },
  userId: {
    type: schema.Types.ObjectId,
    ref: "user"
  },
  vendorId: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: schema.Types.ObjectId,
    ref: "Category",
  },
  productId: {
    type: schema.Types.ObjectId,
    ref: "Product"
  },
   productPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    default: 1
  },
   cGst: {
    type: Number,
  },
  sGst: {
    type: Number,
  },
  total: {
    type: Number,
    default: 0
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  address: {
    street1: {
      type: String,
    },
    street2: {
      type: String
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String
    }
  },


  
    vendorIdService: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    subCategoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "subCategory",
    },
    subsubCategoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "subsubcategory",
    },
    serviceId: {
      type: schema.Types.ObjectId,
      ref: "seviceName",
    },
    servicePrice: {
      type: Number,
    },
    cGstService: {
      type: Number,
    },
    sGstService: {
      type: Number,
    },
    quantityService: {
      type: Number,
      default: 1,
    },
    totalService: {
      type: Number,
      default: 0,
    },
  paidAmountService: {
    type: Number,
    default: 0
  },
  addressService: {
    street1: {
      type: String,
    },
    street2: {
      type: String
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String
    }
  },

  userPhone: {
    type: String,
  },
  pickUpaddress: {
    street1: {
      type: String,
    },
    street2: {
      type: String
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String
    }
  },
  pickUpInstruction: {
    type: String,
  },
  deliveryInstruction: {
    type: String,
  },
  courierWithBag: {
    type: Boolean,
    default: false
  },
  notificationRecipent: {
    type: Boolean,
    default: false
  },
  discountId: {
    type: schema.Types.ObjectId,
    ref: "discount"
  },
  parcelValue: {
    type: Number,
    default: 0
  },
  yourPhone: {
    type: String,
  },
  vendorPhone: {
    type: String,
  },
  sending: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
  },
  returnStatus: {
    type: String,
    enum: ["return", "cancel", ""],
    default: ""
  },
  returnOrder: {
    type: schema.Types.ObjectId,
    ref: "cancelReturnOrder",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  orderType: {
    type: String,
    enum: ["Package", "Other"],
    default: "Other"
  },
  preparingStatus: {
    type: String,
    enum: ["New", "Preparing", "Ready", "out_for_delivery", "delivered", ""],
    default: "New"
  },
  deliveryStatus: {
    type: String,
    enum: ["assigned", "out_for_delivery", "delivered", ""],
    default: ""
  },
  acceptOrRejected:{
    type:String,
    enum:["accept","reject","pending"],
    default:"pending"
  },
  startTime:{
    type:String,
    default:""
  },
  endTime:{
    type:String,
    default:""
  },
  otp:{
    type:Number,
    default:""
  },
  otpExpiration: {
    type: Date,
  },
  accountVerification: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })
module.exports = mongoose.model("Order", DocumentSchema);