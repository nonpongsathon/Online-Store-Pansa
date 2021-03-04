import React from "react";

export default function Pagination(props) {
  const { totalProducts, productsPerPage, paginate } = props;
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagination">
        <ul>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className="page-item"
              onClick={() => paginate(number)}
            >
              <h2>{number}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
