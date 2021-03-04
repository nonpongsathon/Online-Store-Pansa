import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductListCategory } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function SearchScreen(props) {
  const category = props.match.params.name;

  const dispatch = useDispatch();

  const productListCategory = useSelector((state) => state.productListCategory);
  const { loading, error, productFiltered } = productListCategory;
  useEffect(() => {
    dispatch(getProductListCategory(category));
  }, [dispatch, category]);

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            {" "}
            <h1>ผลการค้นหา : {productFiltered.length}</h1>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {productFiltered.length === 0 && (
              <MessageBox variant="danger">ไม่พบสินค้า</MessageBox>
            )}
            <div className="row center">
              {productFiltered.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
