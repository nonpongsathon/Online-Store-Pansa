import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1; // ค่าหลัง ? ใน url
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
      props.history.push("/cart");
    }
  }, [dispatch, productId, qty, props.history]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const toggleShopping = () => {
    props.history.push("/");
  };
  return (
    <div className="row top">
      <div className="col-1">
        <h1>รถเข็นสินค้าของคุณ</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            รถเข็นไม่มีสินค้า <Link to="/">กลับไปชอปปิ้ง</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="row">
                  {" "}
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>฿ {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="addItem"
                onClick={toggleShopping}
              >
                กลับไปชอปปิ้ง
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                จำนวนสินค้า (
                {cartItems.reduce(
                  (accumulator, current) => accumulator + current.qty,
                  0
                )}{" "}
                ชิ้น): ฿
                {cartItems.reduce(
                  (accumulator, current) =>
                    accumulator + current.price * current.qty,
                  0
                )}
              </h2>
            </li>
            <li>
              {cartItems.length === 0 ? null : (
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                >
                  ต่อไป
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
