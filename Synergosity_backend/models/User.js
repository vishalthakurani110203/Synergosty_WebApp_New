const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    experiences:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
    },
],
Skills:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
},
],
projects:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
},
],

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
