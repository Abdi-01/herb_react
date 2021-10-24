import React, { useState, useEffect } from 'react';
import { Card, Container, Grid, Button } from '@material-ui/core';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../helper';

// SALE component
const SaleBanner = () => {
  return (
    <Grid container className="d-flex justify-content-center mx-2">
      <Card
        item
        xs={6}
        className="d-flex align-items-center"
        style={{
          width: '45%',
          height: '400px',
          backgroundColor: '#D57E7E',
          color: 'white',
          marginBottom: '50px',
        }}
      >
        <Container>
          <h6>New Markdowns</h6>
          <h3>Get 50% discount!</h3>
          <Button
            component={Link}
            to="/sale"
            variant="outlined"
            className="text-white mt-2"
          >
            Shop Here
          </Button>
        </Container>
      </Card>
    </Grid>
  );
};

export default SaleBanner;
