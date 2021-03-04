import React from "react";

export default function HowToBuyScreen() {
  return (
    <div>
      <div className="container">
        <div className="row-column ">
          <div>
            <h1>วิธีการสั่งซื้อสินค้า</h1>
          </div>
          <div className="card">
            <div className="howto">
              <img src="./images/signin.svg" alt="signin" className="medium" />
            </div>
            <div className="card-body">
              <strong>1. </strong> เข้าสู่ระบบ หรือ ถ้าหากยังไม่มีบัญชี
              จำเป็นต้องสมัครบัญชีก่อน ถึงจะสามารถสั่งซื้อสินค้าได้
            </div>
          </div>

          <div className="card">
            <div className="howto">
              <img
                src="./images/shopping.svg"
                alt="shopping"
                className="medium"
              />
            </div>
            <div className="card-body">
              <strong>2. </strong> เลือกสินค้า และจำนวนสินค้าที่คุณต้องการ
              แล้วกด "เพิ่มสินค้าไปยังรถเข็น" เมื่อเลือกสินค้าครบแล้ว ให้กด
              "ต่อไป"
            </div>
          </div>

          <div className="card">
            <div className="howto">
              <img
                src="./images/shipping.svg"
                alt="shipping"
                className="medium"
              />
            </div>
            <div className="card-body">
              <strong>3. </strong> กรอกรายละเอียดที่อยู่การจัดส่งให้ครบถ้วน
              จากนั้นคลิกปุ่ม "บันทึก"
            </div>
          </div>

          <div className="card">
            <div className="howto">
              <img src="./images/pay.svg" alt="pay" className="medium" />
            </div>
            <div className="card-body">
              <strong>4. </strong> ตรวจสอบรายละเอียดการสั่งซื้อให้ถูกต้อง แล้วกด
              "สั่งซื้อสินค้า และชำระเงิน"{" "}
              <a href="/howtopay">ดูวิธีการชำระเงินได้ที่นี่</a>
            </div>
          </div>

          <div className="card ">
            <div className="howto">
              <img
                src="./images/confirm.svg"
                alt="confirm"
                className="medium"
              />
            </div>
            <div className="card-body">
              <strong>5. </strong> ทางร้านจะทำการตรวจสอบข้อมูล
              และหลักฐานการชำระเงิน จากนั้นจะจัดส่งสินค้าให้คุณทันที
            </div>
          </div>

          <div className="card">
            <div className="howto">
              <img
                src="./images/delivered.svg"
                alt="delivered"
                className="medium"
              />
            </div>
            <div className="card-body">
              <strong>6. </strong> รอรับของได้เลย !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
