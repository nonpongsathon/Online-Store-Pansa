const expressAsyncHandler = require("express-async-handler");
const db = require("../models");

const getProductList = expressAsyncHandler(async (req, res) => {
  const productList = await db.Product.findAll();
  res.status(200).send(productList);
});

const getProduct = expressAsyncHandler(async (req, res) => {
  const product = await db.Product.findOne({
    where: { id: req.params.id },
  });
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const addProduct = expressAsyncHandler(async (req, res) => {
  const newProduct = {
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    countInStock: req.body.countInStock,
  };
  const createdProduct = await db.Product.create(newProduct);
  res.status(200).send({
    message: "New Product is added successfully",
    product: createdProduct,
  });
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await db.Product.findOne({ where: { id: productId } });
  if (product) {
    await db.Product.update(
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        countInStock: req.body.countInStock,
      },
      {
        where: { id: productId },
      }
    );
    const updatedProduct = await db.Product.findOne({
      where: { id: productId },
    });
    res.send({ message: "Product Updated", product: updatedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const targetId = String(req.params.id);
  const targetProduct = await db.Product.findOne({ where: { id: targetId } });

  if (targetProduct) {
    await db.Product.destroy({
      where: {
        id: targetId,
      },
    });
    res.status(204).send({ message: `Product id: ${targetId} is deleted` });
  } else {
    res.status(400).send({ message: `Product id: ${targetId} is deleted` });
  }
});

const getProductListCategory = expressAsyncHandler(async (req, res) => {
  const category = req.params.category;
  const productListCategory = await db.Product.findAll({
    where: { category: category },
  });
  res.status(200).send(productListCategory);
});
module.exports = {
  getProductList,
  getProduct,
  getProductListCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
