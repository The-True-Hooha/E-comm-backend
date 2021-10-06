const router = require("express").Router();
const Cart = require("../models/cart");
const { 
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");


//CREATES THE CART API

router.post("/", verifyToken, async (req,res) => {
    const newCart  = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err)
    }
});

//IF THE USER DECIDES TO CHANGE THE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
        {
           $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedCart);
    }catch (err) {
    res.status(500).json(err);
    }
});

//DELETE METHOD

router.delete("/:id", verifyTokenAndAuthorization, async (req,res) =>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("this Cart has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GETS THE CART ID
router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res) =>{
    try {
        const Cart =  await Cart.find( { userId: req.params.userId });
        res.status(200).json( cart );
    } catch (err) {
        res.status(500).json(err)
    }
})

//GETS ALL THE CART ID
router.get("/", verifyTokenAndAdmin, async (req,res) =>{
    try {
        const carts = await Cart.find()
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router