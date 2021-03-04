import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsItemsOrder,
  detailsOrder,
  listOrderMine,
} from "../actions/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  const inspectDetails = (orderId) => {
    dispatch(detailsOrder(orderId));
    dispatch(detailsItemsOrder(orderId));
    setTimeout(() => window.location.reload(), 100);
    props.history.push(`/order/${orderId}`);
  };
  return (
    <div>
      <h1>ประวัติการสั่งซื้อ</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>หมายเลขออร์เดอร์</th>
              <th>วันที่ทำรายการ</th>
              <th>ยอดชำระ</th>
              <th>ชำระเงิน</th>
              <th>เวลาจัดส่ง</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.paid ? (
                    <i className="fas fa-check-circle success"></i>
                  ) : (
                    "No"
                  )}
                </td>
                <td>{order.delivered === "0" ? "No" : order.delivered}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      inspectDetails(order.id);
                    }}
                  >
                    ดูรายละเอียด
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
