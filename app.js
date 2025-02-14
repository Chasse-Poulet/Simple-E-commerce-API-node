require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routers import
const userRouter = require("./src/modules/users/user.routes");
const productRouter = require("./src/modules/products/product.routes");
const cartRouter = require("./src/modules/cart/cart.routes");
const orderRouter = require("./src/modules/orders/order.routes");
const stripeController = require("./src/modules/stripe/stripe.routes");

const app = express();

app.use(express.json());
app.use(cors());

// Routes setup
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/users/:userId/orders", orderRouter);
app.use("/webhook/stripe", stripeController);

module.exports = app;
