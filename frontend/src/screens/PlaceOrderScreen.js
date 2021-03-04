import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (accumulator, current) => accumulator + current.qty * current.price,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  cart.totalQty = cart.cartItems.length;

  const {
    fullName,
    address,
    district1,
    district2,
    city,
    country,
    postalCode,
  } = cart.shippingAddress;

  let shippingAddressString = `${fullName}, ${address} ${district1} ${district2} ${city} ${country} ${postalCode}`;

  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);

  const placeOrder = async () => {
    await dispatch(
      createOrder(
        shippingAddressString,
        cart.itemsPrice,
        cart.totalQty,
        (cart.paid = false),
        (cart.delivered = false)
      )
    ).then(() =>
      setTimeout(
        () =>
          cart.cartItems.map((item) =>
            axios.post(
              "/api/orders/createorderitems",
              {
                product: item.name,
                qty: item.qty,
                price: item.price,
                order_id: Number(orderCreate.order.id) + 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`,
                },
              }
            )
          ),
        3000
      )
    );

    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row top">
        <div className="col-1">
          <ul>
            <li>
              <div className="card card-body">
                <h1>ที่อยู่จัดส่ง</h1>
                <p>
                  <strong>ชื่อ:</strong> {fullName} <br />
                  <strong>ที่อยู่:</strong> {address} {district1} {district2}{" "}
                  {city} {country} {postalCode}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>การชำระเงิน</h1>
                <p>
                  <strong>ประเภท:</strong> โอนบัญชีธนาคารกสิกรไทย
                </p>
                <p>
                  {/* <strong>Name:</strong> {fullName} <br />
                  <strong>Address:</strong> {address} {district1} {district2}{" "}
                  {city} {country} {postalCode} */}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>สินค้าที่สั่ง</h1>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.id}>
                      <div className="row">
                        {" "}
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </div>
                        <div>
                          {item.qty} x ฿ {item.price} = ฿{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h1>สรุปค่าใช้จ่าย</h1>
              </li>
              <li>
                <div className="row">
                  <div>ราคาสินค้า</div>
                  <div>฿ {cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>ค่าจัดส่ง</div>
                  <div>฿ {cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>ยอดรวม</strong>
                  </div>
                  <div>฿ {cart.totalPrice}</div>
                </div>
              </li>
              {cart.cartItems.length === 0 ? null : (
                <li>
                  <button onClick={placeOrder} className="primary block">
                    {" "}
                    สั่งสินค้า และ ชำระเงิน{" "}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
