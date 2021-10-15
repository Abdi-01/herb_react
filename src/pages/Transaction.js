import { CardContent, Typography } from "@material-ui/core";
import { Card, Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import { API } from "../constants/api";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Transaction() {
  const userGlobal = useSelector((state) => state.userGlobal);
  const [transactionData, setTransactionData] = useState({
    transaction: [],
  });

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${API}/transactions`, {
        params: {
          token: token,
        },
      })
      .then((res) => {
        console.log("fetch Trans : ", res.data);
        let dataTrans = res.data;
        setTransactionData({
          ...transactionData,
          transaction: dataTrans,
        });
      })
      .catch((err) => {});
  };

  const renderTransactionData = () => {
    return transactionData.transaction.map((item) => {
      return (
        <TransactionItem
          transactionID={item.transaction_id}
          transactionDate={item.transaction_date}
          recipent={item.recipent}
          address={item.address}
          totalPrice={item.total_price}
        />
      );
    });
  };

  // Logged In
  if (!userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center" my={4}>
          <Card variant="outlined" sx={{ width: 700 }}>
            <Typography variant="h6">Transactions</Typography>
            {transactionData.transaction.length ? (
              <>
                <CardContent>
                  <Box px={2}>{renderTransactionData()}</Box>
                </CardContent>
              </>
            ) : (
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  px={4}
                  pb={14}
                >
                  <Box p={4}>
                    <DoDisturbOutlinedIcon fontSize="large" color="disabled" />
                  </Box>
                  <Typography>
                    You don't have any ongoing transaction
                  </Typography>
                </Box>
              </CardContent>
            )}
          </Card>
        </Box>
      </Box>
    </Container>
  );
}

export default Transaction;
