require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");
const db = require("./models");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

db.sequelize.sync().then(
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  })
);
