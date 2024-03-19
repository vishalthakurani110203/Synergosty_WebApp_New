const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    NameOfWorkplace: {
        type:String,
        required: true,
    },
position:{
    type:String,
    required: true,
},
Description: {
    type:String,
    required: true,
},
startDate: {
    type:String,
    required: true,
},
endDate: {
    type:String,
    required: true,
},
Skills: {
    type:String,
    required: true,
},
});

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;