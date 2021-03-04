import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-1 ">
            <img
              className="medium frame"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h1 className="product-name">{product.name}</h1>
                </li>
                <li>
                  <h2 className="price">ราคา: ฿ {product.price}</h2>{" "}
                </li>
                <li>
                  <h2>คำธิบายสินค้า: {product.description}</h2>
                </li>
                <li>
                  จำนวนสินค้าในสต๊อก:{" "}
                  {product.countInStock > 0 ? (
                    <span className="success">{product.countInStock}</span>
                  ) : (
                    <span className="danger">{product.countInStock}</span>
                  )}
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className="qty-box">
                        เลือกจำนวนสินค้า
                        <span>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </span>
                      </div>
                    </li>
                    <li>
                      <button
                        className="primary block"
                        onClick={addToCartHandler}
                      >
                        เพิ่มสินค้าไปยังรถเข็น
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
