import { CardContent, Typography } from "@material-ui/core";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import { Card, Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import TransactionHistoryItem from "../../components/TransactionHistoryItem";
import TransactionItem from "../../components/TransactionItem";
import { API } from "../../constants/api";

function TransactionHistory() {
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
      .get(`${API}/transactions/history`, {
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
          key={item.transaction_id}
          transactionID={item.transaction_id}
          transactionDate={item.transaction_date}
          recipent={item.recipent}
          address={item.address}
          totalPrice={item.total_price}
          hasPrescription={item.prescription_img}
          detail={item.transaction_id}
          imgproof={item.payment_proof}
          imgprescription={item.prescription_img}
          notes={item.notes_payment}
          prescnotes={item.notes}
          status={item.payment_status}
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
          <Card
            variant="elevation"
            sx={{ borderRadius: 6, padding: 4 }}
            elevation={0}
          >
            {transactionData.transaction.length ? (
              <>
                <CardContent>
                  <Box px={4}>{renderTransactionData()}</Box>
                </CardContent>
              </>
            ) : (
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  pb={14}
                >
                  <Box p={4}>
                    <DoDisturbOutlinedIcon fontSize="large" color="disabled" />
                  </Box>
                  <Typography>
                    You don't have any history transaction
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

export default TransactionHistory;
