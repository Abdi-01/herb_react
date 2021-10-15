import * as React from "react";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { Box } from "@mui/system";
import CartItem from "../components/CartItem";
import { API } from "../constants/api";
import getCurrentDate from "../helper/getDate";
import {
  checkoutCart,
  deleteCart,
  emptyCart,
  updateQty,
} from "../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userGlobal = useSelector((state) => state.userGlobal);
  const cartGlobal = useSelector((state) => state.cartGlobal);

  const [recipient, setRecipient] = React.useState({
    name: userGlobal.fullname,
    address: userGlobal.address,
  });

  React.useEffect(() => {
    console.log(cartGlobal);
  }, []);

  const dispatch = useDispatch();

  const onAddQty = (data, data2, data3) =>
    dispatch(updateQty(data, data2, data3));
  const deleteHandler = (data) => dispatch(deleteCart(data));
  const checkoutHandler = (data, data2, data3, data4, data5) =>
    dispatch(checkoutCart(data, data2, data3, data4, data5));
  const onEmptyCart = (data) => dispatch(emptyCart(data));

  const qtyHandler = (action, id, qty) => {
    onAddQty(id, qty, action);
  };
  const onDelete = (id) => {
    deleteHandler(id);
  };
  const onCheckout = (userData, totalPrice, cartList, recipent) => {
    if (userGlobal.user_status === "unverified") {
      return setOpen(true);
      // alert(
      //   "You can't make any transactions without verifying you account first"
      // );
    }

    let date = getCurrentDate();

    checkoutHandler(userData, totalPrice, cartList, recipent, date);
    onEmptyCart(userGlobal.id);
  };

  const inputHandler = (event) => {
    let { name, value } = event.target;

    setRecipient({
      ...recipient,
      [name]: value,
    });
  };

  const renderCart = () => {
    return cartGlobal.cartList.map((item) => {
      return (
        <CartItem
          name={item.product_name}
          quantity={item.quantity}
          price={item.price_per_unit}
          key={item.id}
          image={`${API}/${item.product_img}`}
          onIncrement={() => qtyHandler("increment", item.id, item.quantity)}
          onDecrement={() => qtyHandler("decrement", item.id, item.quantity)}
          onDelete={() => onDelete(item.id)}
          detail={`/productdetail/${item.product_id}`}
        />
      );
    });
  };

  const renderTotalPrice = () => {
    let total = 0;
    cartGlobal.cartList.forEach((element) => {
      return (total += element.quantity * element.price_per_unit);
    });
    return total;
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
            <Typography variant="h6" px={6} py={2}>
              My Cart
            </Typography>
            {cartGlobal.cartList.length ? (
              <>
                <CardContent>
                  <Box px={4}>{renderCart()}</Box>
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
                  <Typography color="GrayText">
                    You don't have any products on your cart
                  </Typography>
                </Box>
              </CardContent>
            )}
          </Card>
        </Box>
        {cartGlobal.cartList.length ? (
          <Box my={4} pl={2}>
            <Card
              variant="outlined"
              sx={{ width: 500, position: "sticky", top: 0, padding: 2 }}
            >
              <CardContent>
                <Typography fontWeight={700}>Order Summary</Typography>
                <Box display="flex" justifyContent="space-between" py={2}>
                  <Typography>
                    Total Price ({cartGlobal.cartList.length} products)
                  </Typography>
                  <Typography>Rp.{renderTotalPrice()}</Typography>
                </Box>
                <Divider />
                <Typography fontWeight={700} pt={2}>
                  Billing Info
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}
                >
                  <Typography>Recipient</Typography>
                  <TextField
                    size="small"
                    value={recipient.name}
                    name="name"
                    onChange={inputHandler}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}
                >
                  <Typography>Address</Typography>
                  <TextField
                    multiline
                    size="small"
                    value={recipient.address}
                    name="address"
                    onChange={inputHandler}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}
                >
                  <Typography>Payment Method</Typography>
                  <Typography fontWeight={700}>Transfer</Typography>
                </Box>
              </CardContent>
              <Box display="flex" flexDirection="column" px={6}>
                <ButtonPrimary
                  onClick={() =>
                    onCheckout(
                      userGlobal,
                      renderTotalPrice(),
                      cartGlobal.cartList,
                      recipient
                    )
                  }
                >
                  Checkout
                </ButtonPrimary>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Oops, you cant do that"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You cannot do any transactions without verifying your
                      account first!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    {/* <Button onClick={handleClose}>Okay</Button> */}
                    <Button onClick={handleClose} autoFocus>
                      Okay
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Card>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
