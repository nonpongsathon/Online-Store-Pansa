import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsItemsOrder, detailsOrder } from "../actions/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderDetailsHistoryScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDetailsItems = useSelector((state) => state.orderDetailsItems);
  const { orderItems } = orderDetailsItems;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1 className="page-topic">หมายเลขออร์เดอร์ #{order.id}</h1>
      <div className="row top">
        <div className="col-1">
          <ul>
            <li>
              <div className="card card-body">
                <h1>ที่อยู่จัดส่ง</h1>
                <p>
                  <strong>ชื่อ:</strong> {order.customer} <br />
                  <strong>ที่อยู่: </strong>
                  {order.shippingAddress}
                </p>

                {order.delivered === "0" ? (
                  <MessageBox variant="danger">สถานะ: รอตรวจสอบ</MessageBox>
                ) : (
                  <MessageBox variant="success">
                    สถานะ: จัดส่งวันที่ {order.delivered}
                  </MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>การชำระเงิน</h1>
                <p>
                  <strong>ประเภท:</strong> โอนบัญชีธนาคารกสิกรไทย
                </p>
                {order.paid ? (
                  <MessageBox variant="success">สถานะ: ชำระเงินแล้ว</MessageBox>
                ) : (
                  <MessageBox variant="danger">สถานะ: รอตรวจสอบ</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>สินค้าที่สั่ง</h1>
                <ul>
                  {orderItems.map((item) => (
                    <li key={item.id}>
                      <div className="row">
                        {" "}
                        <div className="min-30">
                          <h2>{item.product}</h2>
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
                  <div>
                    <h2>ราคาสินค้า(รวมค่าจัดส่ง)</h2>
                  </div>
                  <div className="price">฿ {order.totalPrice}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
