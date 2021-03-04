import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  deliverOrder,
  detailsItemsOrder,
  listOrderAdmin,
  payOrder,
} from "../actions/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_ADMIN_DELETE_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderListScreen(props) {
  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { loading, error, orders } = orderAdminList;
  const dispatch = useDispatch();
  const orderAdminDelete = useSelector((state) => state.orderAdminDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderAdminDelete;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  useEffect(() => {
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
    }
    dispatch(listOrderAdmin());
    dispatch({ type: ORDER_ADMIN_DELETE_RESET });
  }, [dispatch, successDelete, successDeliver, successPay]);

  const inspectDetails = (orderId) => {
    dispatch(detailsItemsOrder(orderId));

    props.history.push(`/order/${orderId}`);
  };

  const deleteHandler = (orderId) => {
    if (window.confirm("Do you really want to delete it ?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  const deliveredHandler = (orderId) => {
    dispatch(deliverOrder(orderId));
  };

  const payHandler = (orderId) => {
    dispatch(payOrder(orderId));
  };
  return (
    <div>
      <h1>ประวัติการสั่งซื้อ (ADMIN)</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>หมายเลขออร์เดอร์</th>
              <th>ลูกค้า</th>
              <th>วันที่ทำรายการ</th>
              <th>ยอดชำระ</th>
              <th>ชำระเงิน</th>
              <th>จัดส่ง</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.paid ? (
                    <i className="fas fa-check-circle success"></i>
                  ) : (
                    "No"
                  )}
                </td>
                <td>{order.delivered ? order.delivered : "No"}</td>
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
                  <button
                    type="button"
                    className="small delete"
                    onClick={() => deleteHandler(order.id)}
                  >
                    Delete
                  </button>
                  {order.delivered === "0" && (
                    <button
                      type="button"
                      className="small deliver"
                      onClick={() => deliveredHandler(order.id)}
                    >
                      Delivered
                    </button>
                  )}
                  {!order.paid && (
                    <button
                      type="button"
                      className="small pay"
                      onClick={() => payHandler(order.id)}
                    >
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
