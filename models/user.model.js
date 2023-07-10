const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
var userSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    customerSupportNo: {
      type: String,
    },
    customerRegistrationNo: {
      type: String,
    },
    GST: {
      type: String,
    },
    typeOfProducts:{
      type:Array
    },
    /////////////////////////////////////////
    fullName: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    language: {
      type: String,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      //minLength: 10,
      default: "",
    },
    password: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    address: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
    },
    otpExpiration: {
      type: Date,
    },
    accountVerification: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: ["USER", "VENDOR", "ADMIN"],
    },
    status: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
    },
    currentLocation: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    wallet: {
      type: Number,
      default: 0,
    },
    lead: {
      type: Number,
      default: 0,
    },
    serviceArea: {
      type: objectId,
      ref: "seviceArea",
    },
    serviceDistance: {
      type: objectId,
      ref: "seviceDist",
    },
    serviceName: {
      type: objectId,
      ref: "seviceName",
    },
    ///////////////////////////////////////////////
    uploadSelfie: {
      type: String,
    },
    pancard: {
      type: String,
    },
    uploadPanCard: {
      type: String,
    },
    aadharCard: {
      type: String,
    },
    frontSide: {
      type: String,
    },
    backSide: {
      type: String,
    },
    document: {
      type: String,
    },
    //////////////////////////////////////////
    BankName: {
      type: String,
      default: "",
    },
    BranchName: {
      type: String,
      default: "",
    },
    AccountNumber: {
      type: String,
      default: "",
    },
    confirmAccountNumber: {
      type: String,
      default: "",
    },
    ifscCode: {
      type: String,
      default: "",
    },
    //////////////////////////////////////////////
    referalCodeUnique: {
      type: String,
      default: "",
    },
    referalCode: {
      type: String,
      default: "",
    },
    referalBy: {
      type: objectId,
      ref: "user",
    },
    referalData: [],
    ///////////////////////////////////////////////////
    Coin: {
      type: Number,
      default: 0,
    },
    ///////////////////////////////////////////////////
    subscriptionId: {
      type: objectId,
      ref: "Subscription",
    },
    subscriptionExpiration: {
      type: Date,
    },
    subscriptionVerification: {
      type: Boolean,
      default: false,
    },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
