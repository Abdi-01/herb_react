import React, { useState, useEffect } from 'react';
import { API_URL } from '../../helper';
import { fetchCart } from '../../redux/actions/cart';
import { useDispatch } from 'react-redux';
import ProductSale from './ProductSale/ProductSale';
import Axios from 'axios';
import { Grid, Container } from '@material-ui/core';

const SaleProducts = () => {
  const [sale, setSale] = useState({
    saleProducts: [],
  });

  const dispatch = useDispatch();
  const fetchCarts = (data) => dispatch(fetchCart(data));

  const fetchSaleProducts = () => {
    Axios.get(`${API_URL}/products/get`)
      .then((res) => {
        setSale({ ...sale, saleProducts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderProducts = () => {
    // unfiltered data = all the available data
    let rawData = [...sale.saleProducts];

    return rawData.map((product) => {
      if (product.sale == 'sale') {
        return (
          <Grid key={product.id} item xs={3}>
            <ProductSale product={product} />
          </Grid>
        );
      }
    });
  };

  useEffect(() => {
    fetchSaleProducts();
    fetchCarts();
  });
  return (
    <div className="d-flex justify-content-between">
      <Container
        clasName="d-flex justify-content-center"
        style={{
          width: '336px',
          height: '95vh',
          marginTop: '1vh',
          background: 'wheat',
          padding: '5% 1%',
        }}
      >
        <h1>50% sale</h1>
        <h4>For you and your loved ones.</h4>
      </Container>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        style={{
          marginLeft: '5%',
          width: '100%',
          marginTop: '1vh',
          height: '95vh',
          overflow: 'scroll',
          scrollBehavior: 'smooth',
        }}
      >
        {renderProducts()}
      </Grid>
    </div>
  );
};

export default SaleProducts;
