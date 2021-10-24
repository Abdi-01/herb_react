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
  const [message, setMessage] = React.useState({
    title: "",
    desc: "",
  });

  const handleClose = () => {
    setOpen(false);
    onEmptyCart(userGlobal.id);
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
      setOpen(true);
      setMessage({
        ...message,
        title: "Oops, you cant do that",
        desc: "You can't make any transactions without verifying you account first",
      });

      // alert(
      //   "You can't make any transactions without verifying you account first"
      // );
    } else {
      setOpen(true);
      setMessage({
        ...message,
        title: "Checkout Success",
        desc: "Please Confirm the transaction by upload the payment proof",
      });

      checkoutHandler(userData, totalPrice, cartList, recipent);
    }
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
      return (total += element.quantity * element.price_per_stock);
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
          <Card
            variant="elevation"
            sx={{ width: 700, borderRadius: 6 }}
            elevation={0}
          >
            <Box p={4}>
              <Typography px={6} py={2} fontSize={24}>
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
                      <DoDisturbOutlinedIcon
                        fontSize="large"
                        color="disabled"
                      />
                    </Box>
                    <Typography color="GrayText">
                      You don't have any products on your cart
                    </Typography>
                  </Box>
                </CardContent>
              )}
            </Box>
          </Card>
        </Box>
        {cartGlobal.cartList.length ? (
          <Box my={4} pl={2} ml={6}>
            <Card
              variant="elevation"
              elevation={0}
              sx={{
                width: 500,
                position: "sticky",
                top: 0,
                padding: 4,
                borderRadius: 6,
              }}
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
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {message.title}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {message.desc}
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
