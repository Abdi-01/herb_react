import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AddShoppingCart } from "@material-ui/icons";

import { API_URL } from "../../../helper";

import useStyles from "./productstyles";
import { useSelector } from "react-redux";

const Product = ({ product }) => {
  const classes = useStyles();

  const userGlobal = useSelector((state) => state.userGlobal);

  const onAddToCart = () => {};

  return (
    <Card className={classes.root}>
      <div>
        <Link
          to={`/productdetail/${product.product_id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            className={classes.media}
            image={API_URL + product.product_img}
            title={product.product_name}
          />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="p">
                {product.product_name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Rp.{product.price_per_stock}
              </Typography>
              <br />
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.products_category}
            </Typography>
            {/* <Typography
              dangerouslySetInnerHTML={{ __html: product.product_desc }}
              variant="body2"
              color="textSecondary"
              component="p"
            /> */}
          </CardContent>
        </Link>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to Cart">
            <AddShoppingCart color="primary" onClick={onAddToCart} />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

export default Product;
