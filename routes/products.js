const Products = require("../models/products");
const router = require("express").Router();
const { 
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");


//CREATES THE PRODUCT API

router.post("/", verifyTokenAndAdmin, async (req,res) => {
    const newProducts  = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err)
    }
});

//IF THE USER DECIDES TO CHANGE THE PRODUCT ID
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
        {
           $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    }catch (err) {
    res.status(500).json(err);
    }
});

// DELETE METHOD

router.delete("/:id", verifyTokenAndAdmin, async (req,res) =>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("this product has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GETS THE PRODUCT ID
router.get("/find/:id", async (req,res) =>{
    try {
        const product =  await Product.findById(req.params.id);
        res.status(200).json( product );
    } catch (err) {
        res.status(500).json(err)
    }
})

//GETS ALL THE PRODUCTS ID
router.get("/", async (req,res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
            let products;

            if(qNew){
                products = await Product.find().sort({createdAt: -1}).limit(1)
            } else if (qCategory) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                },
            });
            }else{
                products = await Product.find();
            }

        // const user = query
        // ?await User.find().sort({ _id: -1 }).limit(5)
        // : await User.find();

        res.status(200).json({users });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //gets the product stats

// router.get("/stats", verifyTokenAndAdmin, async (req,res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() -1 ));

//     try{

//         const data = await User.aggregate([
//             {$match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 },
//             },
//             {
//                 $group:{
//                     _id: "$month",
//                     total: { $sum: 1},
//                 },
//             },
//         ]);
//         res.status(200).json(data);
//     }catch(err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router