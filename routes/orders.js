const router = require("express").Router();
const Order = require("../models/orders");


const { 
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");


//CREATES THE ORDER ROUTER
router.post("/", verifyToken, async (req,res) => {
    const newOrder  = new Order(req.body)

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err)
    }
});

//ADMIN CHANGES TO THE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
        {
           $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    }catch (err) {
    res.status(500).json(err);
    }
});

//DELETE METHOD
router.delete("/:id", verifyTokenAndAdmin, async (req,res) =>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("this Order has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GETS THE USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res) =>{
    try {
        const orders =  await Order.find( { userId: req.params.userId });
        res.status(200).json( orders );
    } catch (err) {
        res.status(500).json(err)
    }
})

//GETS ALL THE ORDERS
router.get("/", verifyTokenAndAdmin, async (req,res) =>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
});

//GETS THE MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async ( req, res ) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try{
            const income = await Order.aggregate([
                { $match: {createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt"},
                        sales: "$amount",
                    },
                
                        $group:{
                            _id: "$month",
                            total: {$sum: "$sales"},
                        },    
                },
            ]);
            res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err);
    }
});

//GETS THE YEARLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const wholeYear = new Month();
    const lastYear = new Month(wholeYear.setYear(wholeYear.getYear() -1))
    // I HAD TO SET THE LIMIT TO A -1 [ WHATEVER WHICH GOES (-12)]
    const previousYear = new Year(new Year().setYear(lastYear.getYear() -1));

    try{
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousYear } } },
                {
                    $project: {
                        year: { $year: "createdAt"},
                        totalSales: "$amount",
                    },
                        $group: {
                            _id: "$year",
                            total: { $sum: "$sales"},
                        },
                },
            ]);

    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router