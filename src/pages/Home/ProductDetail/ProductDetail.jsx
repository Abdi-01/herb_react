import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../constants/api";
import { fetchCart } from "../../../redux/actions/cart";
import { API_URL } from "../../helper";
import "./productdetailstyles.css";

const ProductDetail = (props) => {
  const [product, setProduct] = useState({
    productData: {},
    productStatus: false,
    quantity: 1,
  });

  const fetchProducts = () => {
    const productId = props.match.params.product_id;
    Axios.get(`${API_URL}/products/get/${productId}`)
      .then((res) => {
        if (res.data.length) {
          setProduct({ ...product, productData: res.data[0] });
        } else {
          setProduct({ ...product, productStatus: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const qtyBtnHandler = (action) => {
    if (action === "increment") {
      setProduct({
        ...product,
        qty: product.quantity + 1,
      });
    } else if (action === "decrement" && product.quantity > 1) {
      setProduct({
        ...product,
        qty: product.quantity - 1,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product_detail_container">
      {/* <Card> */}
      <Grid xs={5}>
        <Container>
          <img
            className="image_container"
            src={API_URL + product.productData.product_img}
            alt=""
          />
        </Container>
        <Container>
          <h2 className="mt-4 mx-4">{product.productData.product_name}</h2>
        </Container>
        <br />
        <Container>
          <h6 className="my-2 mx-4">
            <strong>Price</strong>: Rp.
            {product.productData.price_per_stock}
          </h6>
        </Container>
        <br />
        <br />
        <Container className="align-items-center">
          <div className="my-2 mx-4">
            <strong>Atur Jumlah Barang</strong>
          </div>
          <div className="d-flex flex-row align-items-center mx-1">
            <button
              onClick={() => qtyBtnHandler("decrement")}
              className="btn btn-primary mx-4"
            >
              -
            </button>
            <h6
              style={{
                marginLeft: "20px",
              }}
            >
              {product.quantity}
            </h6>
            <button
              onClick={() => qtyBtnHandler("increment")}
              className="btn btn-primary mx-4"
            ></button>
          </div>
        </Container>
      </Grid>
      <Grid>
        <Container>
          <div className="product_container">
            <div>
              <h6>
                <strong>Product Description</strong>:<br></br>
                <br></br>
                {product.productData.product_desc}
              </h6>
              <br></br>
              <hr />
            </div>
            <div>
              <h6>
                <strong>Available Stock</strong>: {product.productData.stock}
              </h6>
              <hr />
            </div>
            <div>
              <h6>
                <strong>Netto</strong>: {product.productData.netto}{" "}
                {product.productData.unit}
              </h6>
              <hr />
            </div>
            <div>
              <h6>
                <strong>Total Netto</strong>:{product.productData.netto_total}{" "}
                {product.productData.unit}
              </h6>
              <hr />
            </div>
            <div>
              <h6>
                <strong>Manufacturer</strong>:{" "}
                {product.productData.products_brands}
              </h6>
              <hr />
            </div>
            <div>
              <h6>
                <strong>Category</strong>:{" "}
                {product.productData.products_category}
              </h6>
              <hr />
            </div>
          </div>
        </Container>
      </Grid>
      {/* </Card> */}
    </div>
  );
};

export default ProductDetail;
