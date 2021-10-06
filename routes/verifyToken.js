const jwt = require("jsonwebtoken");

//CREATES THE PARAMETER VERIFICATION
const verifyToken = (req, res) => {
    const authHeader = req.headers.token
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SCRT, (err, user) => {
            if(err) res.status(403).json("invalid token");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("you are not authenticated!");
    }
};

//CREATES THE PARAMETER VERIFICATION AUTH
const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,() => {
        if(req.user.id === req.params || req.userisAdmin){
            next()
        }else{
            res.status(403).json("access not granted!");
        }
    });
};

//CREATES THE PARAMETER VERIFICATION AUTH ACCESS FOR ADMIN
const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,() => {
        if( req.userisAdmin ){
            next()
        } else {
            res.status(403).json("access not granted!");
        }
    });
};


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };