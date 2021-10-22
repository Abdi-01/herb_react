import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import {
  Card,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

function CartItem(props) {
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
              <Typography fontWeight="600">{props.name}</Typography>
              <Typography>Rp. {props.price * props.quantity}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Button LinkComponent={Link} to={props.detail}>
            View product details
          </Button>
          <Box display="flex" alignItems="center">
            <IconButton size="large">
              <DeleteOutlineOutlinedIcon
                color="warning"
                onClick={props.onDelete}
              />
            </IconButton>
            <Divider variant="middle" />
            <IconButton size="large" onClick={props.onDecrement}>
              <RemoveCircleOutlineOutlinedIcon color="success" />
            </IconButton>
            <Typography px={2}>{props.quantity}</Typography>
            <IconButton size="large" onClick={props.onIncrement}>
              <AddCircleOutlineOutlinedIcon color="success" />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default CartItem;
