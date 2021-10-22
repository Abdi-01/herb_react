import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';
import getCurrentDate from '../../helper/getDate';
import {
  Grid,
  CardHeader,
  Typography,
  CardContent,
  Divider,
  Card,
  CardActions,
} from '@material-ui/core';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

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
  padding: 10% 5% 290%;
  left: 0;
  top: 100px;
  transition: 350ms;
  z-index: 4;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding-top: 10%;
`;

// All User Transactions
const UserTransactions = () => {
  // const userGlobal = useSelector((state) => state.userGlobal);

  const [transactionList, setTransactionList] = useState({
    productList: [],
    filteredData: [],
    sortBy: '',
  });
  const [searchProduct, setSearchProduct] = useState({
    searchProductName: '',
    searchProductCategory: '',
  });

  const fetchTransactions = () => {
    Axios.get(`${API_URL}/transaction/get`)
      .then((res) => {
        setTransactionList({ ...transactionList, productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderProducts = () => {
    let rawData = [...transactionList.productList];

    // let filteredArray = Object.values(
    //   rawData.reduce((unique, o) => {
    //     if (!unique[o.transaction_id]) unique[o.transaction_id] = o;

    //     return unique;
    //   }, {})
    // );

    const compareDate = (a, b) => {
      if (a.transaction_date < b.transaction_date) {
        return -1;
      }
      if (a.transaction_date > b.transaction_date) {
        return 1;
      }
    };

    switch (transactionList.sortBy) {
      case 'paid':
        rawData = rawData.filter((val) => {
          return val.payment_status === 'paid';
        });
        break;
      case 'unpaid':
        rawData = rawData.filter((val) => {
          return val.payment_status === 'unpaid';
        });
        break;
      case 'onProcess':
        rawData = rawData.filter((val) => {
          return val.payment_status === 'onprocess';
        });
        break;
      case 'latest':
        rawData.sort(compareDate);
        break;
      case 'newest':
        rawData.sort((a, b) => compareDate(b, a));
        break;
      case 'normal':
        rawData = rawData.filter((val) => {
          return val.transaction_type === 'normal';
        });
        break;
      case 'customOrder':
        rawData = rawData.filter((val) => {
          return val.transaction_type === 'custom';
        });
        break;
      default:
        rawData = [...transactionList.productList];
        break;
    }

    return rawData.map((product) => {
      return (
        <Link
          className="col-5 mt-4"
          to={`/transactiondetail/${product.transactiondetail_id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card
            className="p-3 my-2 mt-2 mx-2"
            style={{
              height: '420px',
            }}
          >
            <CardHeader
              title="Transaction No:"
              subheader={getCurrentDate(product.transaction_date)}
              avatar={<Avatar aria-label="">{product.transaction_id}</Avatar>}
            />
            <Divider />
            <CardContent className="d-flex flex-md-column">
              <Typography variant="h6" className="my-1">
                Product Name: <br /> <strong>{product.product_name}</strong>
              </Typography>
              <Typography variant="h6" className="my-1">
                Quantity: <br />
                <strong>{product.quantity} item(s)</strong>
              </Typography>
              <Typography variant="h6" className="my-1">
                Payment Status: <br />
                <strong>{product.payment_status}</strong>
              </Typography>
              <Divider />
            </CardContent>
            <CardActions className="d-flex justify-content-between">
              <Typography variant="h6">
                Total Spending: <br /> <strong>Rp.{product.total_price}</strong>
              </Typography>
              <button className="btn btn-primary ">See Details</button>
            </CardActions>
          </Card>
        </Link>
      );
    });
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTransactionList({ ...transactionList, [name]: value });
    setSearchProduct({ ...searchProduct, [name]: value });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // if (userGlobal?.role !== 'admin') {
  //   return <Redirect to="/" />;
  // }

  return (
    <div>
      <div>
        <Nav>
          <SidebarNav>
            <SidebarWrap>
              <div>
                {/* <label htmlFor="searchProductName" className="text-white">
                  Transaction
                </label>
                <input
                  style={{ borderRadius: '25px' }}
                  onChange={inputHandler}
                  name="searchProductName"
                  type="text"
                  placeholder="Search..."
                  className=" form-control mb-3"
                />
                <div className="d-flex flex-row-reverse col-10 pb-4">
                  <button
                    onClick={searchBtnHandler}
                    className="btn btn-primary col-10"
                  >
                    Search
                  </button>
                </div> */}
                <div>
                  <label htmlFor="sortBy" className="text-white">
                    Sort Transactions
                  </label>
                  <select
                    name="sortBy"
                    className="form-control"
                    onChange={inputHandler}
                  >
                    <option value="">All Transactions</option>
                    <option value="onProcess">On Process Transactions</option>
                    <option value="paid">Paid Transactions</option>
                    <option value="unpaid">Unpaid Transactions</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sortBy" className="text-white">
                    Sort By Date:
                  </label>
                  <select
                    name="sortBy"
                    className="form-control"
                    onChange={inputHandler}
                  >
                    <option value="newest">Newest Transactions</option>
                    <option value="latest">Latest Transactions</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="sortBy" className="text-white">
                  Transaction Type
                </label>
                <select
                  name="sortBy"
                  className="form-control"
                  onChange={inputHandler}
                >
                  <option value="normal">Normal</option>
                  <option value="customOrder">Custom Order</option>
                </select>
              </div>
            </SidebarWrap>
          </SidebarNav>
        </Nav>
      </div>
      <Grid
        container
        className="d-flex col-10"
        style={{
          marginLeft: '18%',
          width: '85vw',
          Top: '10vh',
          height: '95vh',
          overflow: 'scroll',
        }}
      >
        {renderProducts()}
      </Grid>
    </div>
  );
};

export default UserTransactions;
