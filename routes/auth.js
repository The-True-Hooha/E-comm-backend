const router = require("express").Router();
const User = require("../models/users");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


// registers the new user
router.post("/register", async (req, res) => {
    const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password,
        process.env.SCRT_PASS
        ).toString()
    });
    try{

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    }catch(err) {
        res.status(500).json(err);
    }
});

//creating the login function

router.post("/login", async (req,res) => {
    try{

        const user = await User.findOne({username: req.body.username });
        !user && res.status(401).json("you entered the wrong password");

        const hashedPasswords = cryptoJs.AES.decrypt(
            user.password,
            process.env.SCRT_PASS
        );
        const originalPassword = hashedPasswords.toString(cryptoJs.enc.utf8);

        originalPassword !==req.body.password && 
            res.status(401).json("you entered the wrong password");

            const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
                process.env.JWT_SCRT,
                {expiresIn:"2d"}
            );
            
            const { password, ...others } = user._doc;
            //using the (user._doc incase of mongoDB. _doc should
            //contain whatever folder mongoDB chooses)

        res.status(200).json( {...others, accessToken} );
    } catch (err) {
        res.status(500).json(err)
    }
});
module.exports = router