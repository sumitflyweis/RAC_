const mongoose = require("mongoose");

const seviceNameSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    subCategoryId:{
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",        
    },
    subsubCategoryId:{
        type: mongoose.Schema.ObjectId,
        ref: "subsubcategory",
    },
    vendorId:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    status: {
        type: String,
        enum: ["Active", "Block"],
        default: "Active"
    },
    price:{
        type:Number,
        default:0
    },
    count:{
        type:Number,
        default:0
    },

});

module.exports = mongoose.model("seviceName", seviceNameSchema);
