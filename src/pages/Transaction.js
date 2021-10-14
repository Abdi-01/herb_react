import { Card, CardContent, CardHeader, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TransactionItem from "../components/TransactionItem";

function Transaction() {
  return (
    <Container>
      <h3>Transaction Page</h3>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Card variant="outlined" sx={{ minWidth: 900 }}>
          <CardContent>
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Transaction;
