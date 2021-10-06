require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./routes/users");
const auth = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/carts");
const orderRoute = require("./routes/orders");
const app = express();

//CONNECTING TO THE DATABASE
mongoose
    .connect(process.env.MONGO_URL )
    .then(() => console.log("connected to the database"))
    .catch(err => console.error("failed to connect to the database", err));

//CONNECTS THE API ENDPOINTS
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

//PORTS CREATES THE LOCAL HOST SERVER
const port = process.env.PORT ||3100;
app.listen(port, () => console.log(`listening on port ${port}...`));