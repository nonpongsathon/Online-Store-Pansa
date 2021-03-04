const expressAsyncHandler = require("express-async-handler");

const db = require("../models");

const placeOrder = expressAsyncHandler(async (req, res) => {
  if (!req.body.totalQty) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    let order = {
      customer: req.user.name,
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.totalPrice,
      totalQty: req.body.totalQty,
      paid: req.body.paid,
      delivered: req.body.delivered,
      user_id: req.user.id,
    };
    const createdOrder = await db.Order.create(order);

    res.status(201).send({ message: "New order created", order: createdOrder });
  }
});

const createOrderItems = expressAsyncHandler(async (req, res) => {
  if (!req.body.order_id) {
  } else {
    const orderItems = {
      product: req.body.product,
      qty: req.body.qty,
      price: req.body.price,
      order_id: req.body.order_id,
    };

    const orderItemsCreated = await db.OrderItems.create(orderItems);
    res.status(201).send({
      message: "New orderItems created",
      orderItems: orderItemsCreated,
    });
  }
});

const getOrderHistory = expressAsyncHandler(async (req, res) => {
  const orders = await db.Order.findAll({ where: { user_id: req.user.id } });
  res.send(orders);
});

const getOrderHistoryDetails = expressAsyncHandler(async (req, res) => {
  const order = await db.Order.findOne({ where: { id: req.params.id } });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const getOrderItemsHistoryDetails = expressAsyncHandler(async (req, res) => {
  const orderItems = await db.OrderItems.findAll({
    where: { order_id: req.params.id },
  });
  if (orderItems) {
    res.send(orderItems);
  } else {
    res.status(404).send({ message: "OrderItems Not Found" });
  }
});

const getAdminOrder = expressAsyncHandler(async (req, res) => {
  const orders = await db.Order.findAll();
  res.send(orders);
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
  const targetOrderId = String(req.params.id);
  const order = await db.Order.findOne({ where: { id: targetOrderId } });
  if (order) {
    await db.Order.destroy({ where: { id: targetOrderId } });
    await db.OrderItems.destroy({ where: { order_id: targetOrderId } });
    res.send({ message: `Order Number ${targetOrderId}` });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const confirmPay = expressAsyncHandler(async (req, res) => {
  const targetId = String(req.params.id);

  const order = await db.Order.findOne({ where: { id: targetId } });
  if (order) {
    await db.Order.update({ paid: req.body.paid }, { where: { id: targetId } });

    const paidOrder = await db.Order.findOne({ where: { id: targetId } });

    res.send({ message: `Order #${targetId} is paid`, order: paidOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const confirmDeliver = expressAsyncHandler(async (req, res) => {
  const targetId = String(req.params.id);

  const order = await db.Order.findOne({ where: { id: targetId } });
  if (order) {
    await db.Order.update(
      { delivered: req.body.delivered },
      { where: { id: targetId } }
    );

    const deliveredOrder = await db.Order.findOne({ where: { id: targetId } });

    res.send({
      message: `Order #${targetId} is delivered`,
      order: deliveredOrder,
    });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
module.exports = {
  placeOrder,
  createOrderItems,
  getOrderHistory,
  getOrderHistoryDetails,
  getOrderItemsHistoryDetails,
  getAdminOrder,
  deleteOrder,
  confirmDeliver,
  confirmPay,
};
