import { Card, CardMedia, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function TransactionDetailItem(props) {
  return (
    <>
      <Card variant="outlined" sx={{ paddingRight: 3, paddingLeft: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Box display="flex" alignItem="center">
            <CardMedia
              component="img"
              image={props.image}
              sx={{
                height: 100,
                width: 100,
                objectFit: "contain",
              }}
              alt="Product"
            />
            <Divider variant="middle" />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography fontWeight="600" component={"div"} variant={"body2"}>
                {props.name}
              </Typography>
              <Typography fontWeight="600" component={"div"} variant={"body2"}>
                Price : Rp.{props.priceperstock}
              </Typography>
              <Typography fontWeight="600" component={"div"} variant={"body2"}>
                Quantity : {props.quantity}
              </Typography>
              <Typography component={"div"} variant={"body2"}>
                Rp. {props.quantity * props.priceperstock}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default TransactionDetailItem;
