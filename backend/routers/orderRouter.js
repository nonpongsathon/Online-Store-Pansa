const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const router = express.Router();
const orderController = require("../controllers/orderController");
const db = require("../models");
const { isAuth, isAdmin } = require("../utils");

router.post("/", isAuth, orderController.placeOrder);
router.get("/", isAuth, isAdmin, orderController.getAdminOrder);
router.get("/mine", isAuth, orderController.getOrderHistory);

// ใช้คู่กัน
router.get("/:id", isAuth, orderController.getOrderHistoryDetails);
router.get("/details/:id", isAuth, orderController.getOrderItemsHistoryDetails);

router.put("/:id/pay", isAuth, isAdmin, orderController.confirmPay);
router.put("/:id/deliver", isAuth, isAdmin, orderController.confirmDeliver);

router.post("/createorderitems", isAuth, orderController.createOrderItems);
router.delete("/:id", isAuth, isAdmin, orderController.deleteOrder);
module.exports = router;
