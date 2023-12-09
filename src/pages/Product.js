import React from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const Product = (props) => {
  const params = useParams();
  const [searchParams, _] = useSearchParams();
  return (
    <main>
      <div>
        <h1>Product</h1>
        <p>{props.data.message}</p>
      </div>
    </main>
  );
};
export const LoadInitialData = (params, searchParams) => {
  console.log(
    "LoadInitialData params",
    params,
    searchParams
  );
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ message: "This is Product Page" });
    }, 2000);
  });
};
export default Product;
