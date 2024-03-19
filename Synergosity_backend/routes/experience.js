const express = require("./authexpress");
const passport = require("passport");

const router = express.Router();

//A route to create a new experience.
router.post("/create", passport.authenticate("jwt", {session: false}),
async (req, res) => {
    //1. Identify the user.
    //Due to passport.authenticate,my req.user will get populated with the current user details.
    const user = req.user;
    //2. Create the experience object.
    const {companyName, position, starDate, endDate, description} = req.body;
    if(!companyName || !position){
        return res.status(402).json({err:"Invalid details"});
    }
    const experienceObj = {companyName, position, startDate, endDate, description};
    const experience = await Experience.create(experienceObj);

    //3. Add experience to user.
    // The experiences field of mb user will hold the id's of all experiences of the users. 
    user.experiences.push(experience._id);
    await user.save();

    //4. Return a response.
    return res.status(200).json(experience);
});

module.exports = router;