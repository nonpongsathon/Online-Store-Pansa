const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../utils");

const productController = require("../controllers/productController");

router.get("/", productController.getProductList);
router.get("/category/:category", productController.getProductListCategory);
router.post("/addproducts", isAuth, isAdmin, productController.addProduct);
router.get("/:id", productController.getProduct);
router.put("/:id", isAuth, isAdmin, productController.updateProduct);
router.delete("/:id", isAuth, isAdmin, productController.deleteProduct);

module.exports = router;
