const express = require('express');
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose= require("mongoose");
const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
const skillRoutes = require("./routes/skill");
const projectRoutes = require("./routes/project");
const User = require("./models/user");
require("dotenv").config();
const app = express();
app.use(express.json());

//to connect to mogodb from node,we need to use mongoose.connect
//It will take two arguments:1)Connection String, 2)Connection options
mongoose.connect("mongodb+srv://vishalthakurani381:+ process.env.MONGO_PASSWORD + @cluster0.hk7gnuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then((x)=> {
    console.log("Connected to MongoDB");
})
.catch((err)=> {
    console.log("Error occured while connecting to MongoDB");
    console.log(err);
});


let opts ={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= "thisIsSupposedToBeSecret";
passport.use(
    new JwtStrategy(opts, async function(jwt_payload, done) {
        try{

        
        const user = await User.findOne({_id: jwt_payload.identifier});
            
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }catch(err){
            if(err) {
            done(err, false);
            }

        }
    })
    );

app.get('/', (req, res) => {
res.send("I am working");
});

app.get("/hello", (req, res) => {
    res.send("Hello World. This is a new route.");
});
//app.use will take 2 arguments.(Prefix to the route and routes object.)
app.use("/auth", authRoutes);
app.use("/experience", experienceRoutes);
app.use("/skill", skillRoutes);
app.use("/project", projectRoutes);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
