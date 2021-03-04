import { Col, Divider, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { id, totalPrice } = orderCreate.order;

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Row justify="center">
        <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
          <Row justify="center">
            <div className="page-topic">
              <h1>วิธีการชำระเงิน</h1>
              <h1 className="price">หมายเลขออร์เดอร์: #{id}</h1>
            </div>
            <Divider />
            <div className="card card-body full-length">
              <div className="row">
                <div>
                  <h1>ยอดชำระทั้งหมด :</h1>
                </div>
                <div>
                  <h1 className="price">฿ {totalPrice}</h1>
                </div>
              </div>
            </div>
            <Divider />
            <div className="card card-body full-length">
              <div className="row">
                <img
                  src="https://static.naewna.com/uploads/news/source/479593.jpg"
                  alt="Kbank"
                  className="bank"
                />
                <div>
                  <h1>ธนาคาร กสิกรไทย</h1>
                  <h2>สาขา...... | บัญชีออมทรัพย์</h2>
                </div>
                <div>
                  <h1>ชื่อบัญชี: นายพงศธร ณีศะนันท์</h1>
                  <h1>หมายเลขบัญชี: 1234567890</h1>
                </div>
              </div>
            </div>
            <Divider />
            <div className="card card-body full-length">
              <h2>
                หลังจากชำระเงินแล้ว กรุณาแจ้งหลักฐานการโอน
                พร้อมชื่อและหมายเลขออร์เดอร์ ได้ที่ช่องทางด้านล่างต่อไปนี้
              </h2>
              <div className="row">
                <i className="fab fa-facebook-square contact"></i>
                <h2>Facebook: pansasukhothai</h2>
              </div>
              <div className="row">
                <i className="fab fa-line contact"></i>
                <h2>Line: pansasukhothai</h2>
              </div>
              <div className="row">
                <i className="fas fa-phone-square-alt contact"></i>
                <h2>เบอร์โทรศัพท์: xxx-xxx-xxx</h2>
              </div>
            </div>
            <div>
              <button
                className="primary status"
                onClick={() => props.history.push("/orderhistory")}
              >
                สถานะออร์เดอร์
              </button>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
