import { Col, Divider, Row } from "antd";
import React from "react";

export default function HowToPayScreen() {
  return (
    <div>
      <Row justify="center">
        <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
          <Row justify="center">
            <div className="page-topic">
              <h1>วิธีการชำระเงิน</h1>
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
          </Row>
        </Col>
      </Row>
    </div>
  );
}
