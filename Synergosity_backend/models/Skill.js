const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    SkillName:{
        type: String,
        required: true,
    },
});

const Skill = mongoose.model("Experience", SkillSchema);

module.exports = Skill;