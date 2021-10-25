import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { Grid, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import getCurrentDate from '../../helper/getDate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TransactionDetail = (props) => {
  const [transaction, setTranscation] = useState({
    transactionData: {},
  });

  const [product, setProduct] = useState({
    productsStock: {},
  });

  const fetchTransactions = () => {
    const transactionId = props.match.params.transactiondetail_id;

    Axios.get(`${API_URL}/transaction/get/${transactionId}`)
      .then((res) => {
        setTranscation({ ...transaction, transactionData: res.data[0] });
        Axios.get(`${API_URL}/products/get/${res.data[0].product_id}`)
          .then((res) => {
            setProduct({ ...product, productsStock: res.data[0] });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to reject this transaction?`
    );
    if (confirmDelete) {
      Axios.delete(`${API_URL}/transaction/delete/${deleteId}`)
        .then(() => {
          alert('Transaction has been deleted.');
          props.history.push('/admintransactions');
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert(`Cancelled to delete product.`);
    }
  };

  const acceptOrderBtnHandler = (patchId) => {
    if (transaction.transactionData.transaction_type === 'normal') {
      // update product stock (substracting current stock with order's quantity)
      const substractStock =
        product.productsStock.stock - transaction.transactionData.quantity;

      Axios.patch(`${API_URL}/transaction/update/${patchId}`, {
        payment_status: 'paid',
      })
        .then(() => {
          fetchTransactions();
          Axios.patch(
            `${API_URL}/products/update/${product.productsStock.product_id}`,
            {
              stock: substractStock,
            }
          )
            .then((res) => {
              alert(res.data.message);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (transaction.transactionData.transaction_type === 'custom') {
      // update product stock (substracting current stock with order's quantity)
      const substractTotalNetto =
        product.productsStock.netto_total - transaction.transactionData.dose;

      Axios.patch(`${API_URL}/transaction/update/${patchId}`, {
        payment_status: 'paid',
      })
        .then(() => {
          fetchTransactions();
          Axios.patch(
            `${API_URL}/products/update/${product.productsStock.product_id}`,
            {
              stock: product.productsStock.stock - 1,
              netto_total: substractTotalNetto,
            }
          )
            .then((res) => {
              alert(res.data.message);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="product_detail_container">
      <Grid
        xs={4}
        style={{ border: '1px solid', padding: '20px', marginTop: '6%' }}
      >
        <h3>
          <strong>Item Details:</strong>
        </h3>
        <Container>
          <img
            className="image_container"
            src={API_URL + product.productsStock.product_img}
            alt=""
          />
        </Container>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            margin: '5% 0 0 -20px',
          }}
        >
          <hr />
          <h6>
            <strong>Product Name: </strong>
            {product.productsStock.product_name}
          </h6>
          <hr />
          <h6>
            <strong>Item Description: </strong>
            {product.productsStock.product_desc}
          </h6>
          <hr />
          <h6>
            <strong>Total Netto: </strong>
            {product.productsStock.netto_total} {product.productsStock.unit}
          </h6>
          <hr />
          <h6>
            <strong>Available Stock: </strong>
            {product.productsStock.stock}
          </h6>
          <hr />
          <h6>
            <strong>Price per Stock: </strong>
            Rp.{product.productsStock.price_per_stock}
          </h6>
        </Container>
      </Grid>
      <Grid>
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '-75% 0 5% 40%',
            }}
          >
            {transaction.transactionData !== 'null' ? (
              <div>
                <h3>
                  <strong>Transaction Details: </strong>
                  <br />
                </h3>
                <hr />
                <h6>
                  <strong>Transaction id: </strong>
                  {transaction.transactionData.transaction_id}
                </h6>
                <hr />
                <h6>
                  <strong>Transaction Date: </strong>
                  {getCurrentDate(transaction.transactionData.transaction_date)}
                </h6>
                <hr />
                <h6>
                  <strong>Product Name: </strong>
                  {transaction.transactionData.product_name}
                </h6>
                <hr />

                <h6>
                  <strong>Order Quantity: </strong>

                  {transaction.transactionData.dose
                    ? `${transaction.transactionData.dose} ${transaction.transactionData.unit}`
                    : transaction.transactionData.quantity}
                </h6>
                <hr />
                <h6>
                  <strong>Transaction Type: </strong>
                  {transaction.transactionData.transaction_type}
                </h6>
                <hr />
                <h6>
                  <strong>Total Spending: </strong>
                  Rp.{transaction.transactionData.total_price}
                </h6>
                <hr />
                <h6>
                  <strong>Payment Status: </strong>
                  {transaction.transactionData.payment_status}
                </h6>
                <hr />

                <h6>
                  <strong>Order by: </strong>
                  {transaction.transactionData.username}
                </h6>
                <hr />
                <h6>
                  <strong>Recipient: </strong>
                  {transaction.transactionData.username}
                </h6>
                <hr />
                <h6>
                  <strong>Address: </strong>
                  {transaction.transactionData.address}
                </h6>
                <hr />
                <h6>
                  <strong>Notes: </strong>
                  {transaction.transactionData.notes_payment}
                </h6>
                <hr />
                {transaction.transactionData.payment_status === 'onprocess' ? (
                  <Container className="d-flex justify-content-end pt-4">
                    <Button
                      variant="contained"
                      style={{ background: 'green', color: 'white' }}
                      startIcon={<CheckIcon />}
                      onClick={() =>
                        acceptOrderBtnHandler(
                          transaction.transactionData.transactiondetail_id
                        )
                      }
                      className="btn btn-success mx-2"
                    >
                      Accept Order
                    </Button>
                    <Button
                      variant="contained"
                      style={{ background: '#cc0000', color: 'white' }}
                      startIcon={<DeleteForeverIcon />}
                      onClick={() =>
                        deleteBtnHandler(
                          transaction.transactionData.transactiondetail_id
                        )
                      }
                      className="btn btn-danger mx-2"
                    >
                      Reject
                    </Button>
                  </Container>
                ) : (
                  <Container className="d-flex justify-content-end pt-4">
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/transactions"
                      startIcon={<ArrowBackIcon />}
                      style={{
                        background: 'orange',
                        color: 'black',
                        padding: '12px',
                      }}
                    >
                      Back
                    </Button>
                  </Container>
                )}
              </div>
            ) : (
              <div>
                <Button component={Link} to="/transactions"></Button>
              </div>
            )}
          </div>
        </Container>
      </Grid>
    </div>
  );
};

export default TransactionDetail;
