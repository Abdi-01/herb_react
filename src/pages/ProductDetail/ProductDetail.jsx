import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../helper";
import {
  Grid,
  Card,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import "./productdetailstyles.css";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Box } from "@mui/system";

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
        quantity: product.quantity + 1,
      });
    } else if (action === "decrement" && product.quantity > 1) {
      setProduct({
        ...product,
        quantity: product.quantity - 1,
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
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width={120}
              mr={6}
            >
              <IconButton
                size="large"
                onClick={() => qtyBtnHandler("decrement")}
              >
                <RemoveCircleOutlineOutlinedIcon color="success" />
              </IconButton>
              <Typography>{product.quantity}</Typography>
              <IconButton
                size="large"
                onClick={() => qtyBtnHandler("increment")}
              >
                <AddCircleOutlineOutlinedIcon color="success" />
              </IconButton>
            </Box>
            <ButtonPrimary>Add to Cart</ButtonPrimary>
          </Box>
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
