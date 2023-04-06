require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const decodedPassword = jwt.verify(token,process.env.key);
        if(decodedPassword){
            const userID = decodedPassword.userID;
            req.body.userID = userID;
            next()
        }else{
            res.send("Please Login First");
        }
    }else{
        res.send("Plase Login First");
    }
}

module.exports = {authenticate};