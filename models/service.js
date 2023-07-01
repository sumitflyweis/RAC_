const mongoose = require("mongoose");

const seviceNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "subservice Required"],
    },
    service:{
        type:String,
        required: [true, "service Required"],
    },
    price:{
        type:Number,
        default:0
    },
    count:{
        type:Number,
        default:0
    },
    offer:{
        type:String,
        default:"none"
    }
   
});

module.exports = mongoose.model("seviceName", seviceNameSchema);
