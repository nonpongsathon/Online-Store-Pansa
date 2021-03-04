import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { Divider } from "antd";

export default function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>สินค้าใหม่</h1>
      <div className="row-inline">
        <div className="container-carousel">
          <Carousel infiniteLoop showArrows autoPlay showThumbs={false}>
            <div>
              <Link to="/product/12">
                <img src="./images/firework1000.jpg" alt="firework1000" />
                <h1 className="legend">ประทัด แก้บน / ตรุษจีน</h1>
              </Link>
            </div>
            <div>
              <Link to="/product/17">
                <img src="./images/gimhuay1.jpg" alt="gimhuay" />
                <h1 className="legend">กิมฮวย ปักกระถางธูป</h1>
              </Link>
            </div>
            <div>
              <Link to="/product/21">
                <img src="./images/redCandle.jpg" alt="redCandle" />
                <h1 className="legend">เทียนแดง ไหว้เจ้า</h1>
              </Link>
            </div>
            <div>
              <Link to="/product/22">
                <img src="./images/goldIncense.jpg" alt="goldIncense" />
                <h1 className="legend">ธูปทอง ไหว้เจ้า</h1>
              </Link>
            </div>
          </Carousel>
        </div>
        <div>
          <img
            src="./images/promotion.jpg"
            alt="promotion"
            className="promotion"
          />
        </div>
      </div>
      <h1>หมวดหมู่</h1>
      <div className="row-inline">
        <div className="category-card">
          <Link to="/search/category/incense">
            <i class="fas fa-praying-hands"></i>
            <div className="category-card-body">ธูป</div>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/search/category/candle">
            <i class="fas fa-menorah"></i>
            <div className="category-card-body">เทียน</div>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/search/category/chinese">
            <i class="fas fa-yin-yang"></i>
            <div className="category-card-body">ตรุษจีน</div>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/search/category/cloth">
            <i class="fas fa-tshirt"></i>
            <div className="category-card-body">ผ้าเหลือง</div>
          </Link>
        </div>
      </div>
      <Divider />
      <h1>สินค้าทั่วไป</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && (
            <MessageBox variant="danger">ไม่พบสินค้า</MessageBox>
          )}
          <div className="row center">
            {products.slice(0, 8).map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          <div>
            <button
              className="primary seeproducts"
              type="button"
              onClick={() => props.history.push("/allproducts")}
            >
              ดูสินค้าทั้งหมด <i className="fas fa-caret-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
