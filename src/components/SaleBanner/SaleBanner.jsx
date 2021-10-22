import React from 'react';
import { Card, Container, Grid } from '@material-ui/core';

// Discount Page
const SaleBanner = () => {
  return (
    <Grid container className="d-flex justify-content-between mx-2">
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
          <h3>Get up to 20% discount</h3>
          <button className="btn btn-secondary">Shop Here</button>
        </Container>
      </Card>
      <Card
        xs={6}
        item
        className="d-flex align-items-center"
        style={{
          width: '45%',
          height: '400px',
          backgroundColor: '#79B4B7',
          color: 'white',
          marginBottom: '50px',
        }}
      >
        <Container>
          <h6>New Markdowns</h6>
          <h3>Get up to 20% discount</h3>
          <button className="btn btn-secondary">Shop Here</button>
        </Container>
      </Card>
    </Grid>
  );
};

export default SaleBanner;
