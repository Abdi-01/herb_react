import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';
import AdminProducts from '../AdminProducts/AdminProducts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';

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

import './adminstyles.css';
import styled from 'styled-components';

// custom styling
const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #8ccfcd;
  width: 336px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  padding: 1% 1% 39%;
  border-radius: 25px;
  opacity: 0.9;
  left: 0;
  top: 70px;
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

  const [transactionList, setTransactionList] = useState({
    transactionLists: [],
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

  const fetchTransactions = () => {
    Axios.get(`${API_URL}/transaction/get`)
      .then((res) => {
        setTransactionList({ ...transactionList, transactionLists: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  if (userGlobal?.role !== 'admin') {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ width: '100%' }}>
      <div>
        <Nav>
          <SidebarNav>
            <SidebarWrap>
              <div>
                <h4 className="text-white my-4">
                  <Link className="text-decoration-none text-white" to="/admin">
                    Dashboard
                  </Link>
                </h4>
                <h6 className="my-4">
                  <Link
                    to="/adminproducts"
                    className="text-decoration-none text-white"
                  >
                    Manage Products
                  </Link>
                </h6>
                <h6 className="my-4">
                  <Link
                    to="/salesreport"
                    className="text-decoration-none text-white link_to"
                  >
                    Sales Report
                  </Link>
                </h6>
                <h6 className="my-4">
                  <Link
                    to="/customrecord"
                    className="text-decoration-none text-white link_to"
                  >
                    Custom Record
                  </Link>
                </h6>
                <h6 className="text-white my-4">
                  <Link
                    to="/admin/transactions"
                    className="text-decoration-none text-white link_to"
                  >
                    Transactions
                  </Link>
                </h6>
                <h6 className="text-white my-4">
                  <Link
                    to="/admintransactions"
                    className="text-decoration-none text-white link_to"
                  >
                    Accept or Reject Transactions
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
      <Container
        className="p-4"
        style={{ marginLeft: '20%', background: 'transparent' }}
      >
        <Card className="p-2">
          <h4>Welcome back, {userGlobal.fullname}!</h4>
          <p>Analytics Dashboard</p>
        </Card>
      </Container>

      {/* MAIN ANALYTICS DASHBOARD */}
      <Container className="p-2" style={{ marginLeft: '20%' }}>
        <Card style={{ background: '#8ccfcd' }}>
          <CardHeader
            avatar={
              <Avatar>
                <AnalyticsIcon />
              </Avatar>
            }
            className="p-4 text-white d-flex justify-content-start"
            title={<h4>Portfolio Performance</h4>}
          ></CardHeader>
          <Divider color="textSecondary" />
          <CardContent>
            <Grid container className="d-flex justify-content-center pb-4">
              <Card
                item
                className="mx-4 p-2"
                style={{
                  width: '250px',
                  height: '120px',
                  background: '#FEF1E6',
                }}
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
                style={{
                  width: '250px',
                  height: '120px',
                  color: 'darkgreen',
                  background: '#FEF1E6',
                }}
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
                style={{
                  width: '250px',
                  height: '120px',
                  color: 'red',
                  background: '#FEF1E6',
                }}
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
      <Container style={{ marginLeft: '25%', paddingTop: '2%' }}>
        <h4>Link to page</h4>
        <Grid container spacing={2} className="col-4">
          <Grid item xs={5} className="mx-2 my-2">
            <Card elevation={7} className="p-2">
              <h5 className="mb-3">
                <Link
                  className="text-decoration-none"
                  color="inherit"
                  to="/adminproducts"
                >
                  <strong>Manage Products</strong>
                </Link>
              </h5>
              <Divider color="textSecondary" />
              <h6>Product List: {products.productsList.length}</h6>
            </Card>
          </Grid>

          <Grid item xs={5} className="mx-4 my-2">
            <Card elevation={7} className="p-2">
              <h5 className="mb-3">
                <Link className="text-decoration-none" to="/admintransactions">
                  <strong>Transactions</strong>
                </Link>
              </h5>
              <Divider color="textSecondary" />
              <h6>
                You have a total of {transactionList.transactionLists.length}{' '}
                Transactions
              </h6>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Admin;
