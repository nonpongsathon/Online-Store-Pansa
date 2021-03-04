import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>เข้าสู่ระบบ</div>
      <div className={props.step2 ? "active" : ""}>ที่อยู่จัดส่ง</div>
      <div className={props.step3 ? "active" : ""}>สรุปสินค้า</div>
      <div className={props.step4 ? "active" : ""}>ชำระเงิน</div>
    </div>
  );
}
