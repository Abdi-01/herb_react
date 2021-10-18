import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

// styling
import {
  Container,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import './adminstyles.css';
import styled from 'styled-components';

// custom styling
const Nav = styled.div`
  position: absolute;
  display: flex;
`;

const SidebarNav = styled.nav`
  background: #8ccfcd;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: block;
  padding: 10% 5% 270%;
  left: 0;
  top: 100px;
  transition: 350ms;
  z-index: 4;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding-top: 10%;
`;

// Admin Dashboard Page
function Admin() {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [products, setProducts] = useState({
    productsList: [],
  });

  const fetchProducts = () => {
    Axios.get(`${API_URL}/products/get`)
      .then((res) => {
        setProducts({ ...products, productsList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (userGlobal?.role !== 'admin') {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>
        <div>
          <Nav>
            <SidebarNav>
              <SidebarWrap>
                <div>
                  <h6 className="text-white my-4">
                    <Link
                      className="text-decoration-none text-white"
                      to="/admin"
                    >
                      Dashboard
                    </Link>
                  </h6>
                  <h6 className="my-4">
                    <Link
                      to="/adminproducts"
                      className="text-decoration-none text-white"
                    >
                      Manage Products
                    </Link>
                  </h6>
                  <h6 className="text-white my-4">
                    <Link
                      className="text-decoration-none text-white"
                      to="/transaction"
                    >
                      Transactions
                    </Link>
                  </h6>
                  <h6 className="text-white my-4">
                    <Link
                      className="text-decoration-none text-white"
                      to={`/profiles/${userGlobal.username}`}
                    >
                      Manage Account
                    </Link>
                  </h6>
                </div>
              </SidebarWrap>
            </SidebarNav>
          </Nav>
        </div>
        {/* ANALYTICS DASHBOARD */}

        {/* DASHBOARD HEADER */}
        <Container className="p-4" style={{ marginLeft: '20%' }}>
          <Card className="p-4">
            <h4>Welcome back, {userGlobal.fullname}!</h4>
            <p>Analytics Dashboard</p>
          </Card>
        </Container>

        {/* MAIN ANALYTICS DASHBOARD */}
        <Container className="p-4" style={{ marginLeft: '20%' }}>
          <Card style={{ background: '#8ccfcd' }}>
            <CardHeader
              avatar={
                <Avatar>
                  <AnalyticsIcon />
                </Avatar>
              }
              className="p-4 text-white"
              title={<h4>Portfolio Performance</h4>}
            ></CardHeader>
            <Divider color="textSecondary" />
            <CardContent>
              <Grid container className="d-flex justify-content-center">
                <Card
                  item
                  className="mx-4 p-2"
                  style={{ width: '250px', height: '120px' }}
                >
                  <AssessmentIcon className="mb-3" />
                  <h6>Total Available Item:</h6>
                  <h4>
                    <strong>{products.productsList.length} Products</strong>
                  </h4>
                </Card>
                <Card
                  item
                  className="mx-4 p-2"
                  style={{ width: '250px', height: '120px' }}
                >
                  <ShowChartIcon className="mb-3" />
                  <h6>Unpaid Transactions:</h6>
                  <h4>
                    <strong>Rp.5.000.000</strong>
                  </h4>
                </Card>
                <Card
                  item
                  className="mx-4 p-2"
                  style={{ width: '250px', height: '120px' }}
                >
                  <BarChartRoundedIcon className="mb-3" />
                  <h6>Capital Gains:</h6>
                  <h4>
                    <strong>Rp.-200.000</strong>
                  </h4>
                </Card>
              </Grid>
            </CardContent>
            <Divider color="textSecondary" />
          </Card>
        </Container>

        {/* DASHBOARD LINK TO SPECIFIC PAGE */}
        <Container>
          <Grid
            container
            spacing={2}
            className="col-4"
            style={{ marginLeft: '14%', paddingTop: '2%' }}
          >
            <Grid item xs={5} className="mx-2 my-2">
              <Card elevation={7} className="p-2">
                <h6 className="mb-3">Manage Products</h6>
                <Divider color="textSecondary" />
                <h6>Lorem Ipsum Dolor it self</h6>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here,
                </p>
              </Card>
            </Grid>
            <Grid item xs={5} className="mx-4 my-2">
              <Card elevation={7} className="p-2">
                <h6 className="mb-3">Ongoing Transaction:</h6>
                <Divider color="textSecondary" />
                <h6>Lorem Ipsum Dolor it self</h6>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here,
                </p>
              </Card>
            </Grid>
            <Grid item xs={5} className="mx-2 my-2">
              <Card elevation={7} className="p-2">
                <h6 className="mb-3">Custom Order:</h6>
                <Divider color="textSecondary" />
                <h6>Lorem Ipsum Dolor it self</h6>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here,
                </p>
              </Card>
            </Grid>
            <Grid item xs={5} className="mx-4 my-2">
              <Card elevation={7} className="p-2">
                <h6 className="mb-3">Transactions:</h6>
                <Divider color="textSecondary" />
                <h6>Lorem Ipsum Dolor it self</h6>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here,
                </p>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Admin;
