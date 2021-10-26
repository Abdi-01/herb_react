import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API } from '../../../constants/api';
import { API_URL } from '../../../helper';
import { fetchCart } from '../../../redux/actions/cart';
import useStyles from './productstyles';

const Product = ({ product }) => {
  const userGlobal = useSelector((state) => state.userGlobal);
  const dispatch = useDispatch();
  const fetchCarts = (data) => dispatch(fetchCart(data));
  const [qty, setQty] = useState(1);

  const classes = useStyles();
  const onAddToCart = () => {
    axios
      .get(`${API}/carts/${userGlobal.id}`, {
        params: {
          userId: userGlobal.id,
          productId: product.product_id,
        },
      })
      .then((res) => {
        if (res.data.length) {
          axios
            .patch(`${API}/carts/${res.data[0].id}`, {
              qty: res.data[0].quantity + qty,
            })
            .then((res) => {
              fetchCarts();
            })
            .catch();
        } else {
          axios
            .post(`${API}/carts`, {
              userId: userGlobal.id,
              quantity: 1,
              productId: product.product_id,
            })
            .then((res) => {
              fetchCarts();
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Card className={classes.root}>
        <div>
          <Link
            to={`/productdetail/${product.product_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
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
                  Rp.{product.price_per_stock.toLocaleString()}
                </Typography>
                <br />
              </div>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.products_category}
              </Typography>
            </CardContent>
          </Link>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart">
              <AddShoppingCart color="primary" onClick={onAddToCart} />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default Product;
