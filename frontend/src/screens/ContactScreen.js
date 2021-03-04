import React from "react";
import { Carousel } from "react-responsive-carousel";

export default function ContactScreen() {
  return (
    <div className="row-column max-40">
      <Carousel showArrows autoPlay showThumbs={false}>
        <div>
          <img src="./images/store1.jpg" alt="store1" />
        </div>
        <div>
          <img src="./images/store2.jpg" alt="store2" />
        </div>
        <div>
          <img src="./images/store3.jpg" alt="store3" />
        </div>
        <div>
          <img src="./images/store4.jpg" alt="store4" />
        </div>
      </Carousel>
      <div>
        <h1>ติดต่อเรา</h1>
      </div>
      <img src="./images/googlemap.jpg" alt="address" className="large frame" />
      <div>
        <a href="https://www.google.co.th/maps/place/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A3%E0%B8%A3%E0%B8%A9%E0%B8%B2/@17.0112668,99.8184457,18.04z/data=!4m5!3m4!1s0x0:0x67aaead395ea3ff4!8m2!3d17.011464!4d99.8192021">
          Google Map
        </a>
      </div>
      <div>
        <h2>
          ที่อยู่ : ร้านพรรษา 4/1 ถ.ทัศนาพานิช 3 ต.ธานี อ.เมือง จ.สุโขทัย 64000
        </h2>
      </div>
      <div>
        <h2>
          สถานที่ : ตั้งอยู่ในตลาดสดเทศบาลสุโขทัย อยู่ใกล้ธนาคารทหารไทย
          สาขาสุโขทัย เยื้องกับร้านหมูอินเตอร์
        </h2>
      </div>
      <div className="card card-body full-length">
        <div className="row">
          <i className="fab fa-facebook-square contact"></i>
          <div>
            <h1>Facebook</h1>
          </div>
          <div>
            <h1>pansasukhothai</h1>
          </div>
        </div>

        <div className="row">
          <i className="fab fa-line contact"></i>
          <div>
            <h1>Line</h1>
          </div>
          <div>
            <h1>pansasukhothai</h1>
          </div>
        </div>

        <div className="row">
          <i className="fas fa-phone-square-alt contact"></i>
          <div>
            <h1>Phone</h1>
          </div>
          <div>
            <h1>xxx-xxx-xxx</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
