import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Pagination from "../components/Pagination";
import Product from "../components/Product";

export default function ProductAllScreen() {
  const [currentPage, setCurrentPage] = useState(1);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productsPerPage = 8;
  let indexOfLastProduct = currentPage * productsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
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
            {products
              .slice(indexOfFirstProduct, indexOfLastProduct)
              .map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
          ></Pagination>
          <h2 className="page-number">หน้า {currentPage}</h2>
        </>
      )}
    </div>
  );
}
