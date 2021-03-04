import React from "react";
import "./index.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsHistoryScreen from "./screens/OrderDetailsHistoryScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductAddScreen from "./screens/ProductAddScreen";
import HowToBuyScreen from "./screens/HowToBuyScreen";
import HowToPayScreen from "./screens/HowToPayScreen";
import ContactScreen from "./screens/ContactScreen";
import SearchScreen from "./screens/SearchScreen";
import ProductAllScreen from "./screens/ProductAllScreen";

function App(props) {
  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);

  const { cartItems } = cart;
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              พรรษา สังฆภัณฑ์
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <i class="fas fa-shopping-cart">
                {cartItems.length > 0 && (
                  <sup>
                    <span className="badge">{cartItems.length}</span>
                  </sup>
                )}
              </i>
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">แก้ไขโปรไฟล์</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">ประวัติการซื้อ</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      ออกจากระบบ
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">เข้าสู่ระบบ</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <nav className="row center">
          <div>
            <Link to="/">หน้าหลัก</Link>
          </div>
          <div>
            <Link to="/allproducts">สินค้าทั้งหมด</Link>
          </div>
          <div>
            <Link to="/howtobuy">วิธีสั่งซื้อสินค้า</Link>
          </div>
          <div>
            <Link to="/howtopay">วิธีชำระเงิน</Link>
          </div>
          <div>
            <Link to="/contact">ติดต่อเรา</Link>
          </div>
        </nav>
        <main>
          <AdminRoute
            exact
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <Route path="/allproducts" component={ProductAllScreen}></Route>
          <Route path="/howtobuy" component={HowToBuyScreen}></Route>

          <Route path="/howtopay" component={HowToPayScreen}></Route>
          <Route path="/contact" component={ContactScreen}></Route>
          <Route exact path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/search/category/:name" component={SearchScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/order/:id"
            component={OrderDetailsHistoryScreen}
          ></Route>

          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/addproducts"
            component={ProductAddScreen}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/product/:id/edit"
            component={ProductEditScreen}
          ></AdminRoute>
          <Route exact path="/" component={HomeScreen}></Route>
        </main>

        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
