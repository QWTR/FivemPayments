const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min:8,
    },
    Server:{
        type: String,
        default:"",
    },
    Money:{
        type: Number,
        default:0,
    },
    type:{
        type: String,
        default:"user",
    },
})
module.exports = mongoose.model("User", userSchema)