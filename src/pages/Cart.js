import { Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import CartItem from "../components/CartItem";
import { API } from "../constants/api";
import { addQty, updateQty } from "../redux/actions/cart";

function Cart() {
  useEffect(() => {
    console.log(cartGlobal);
  }, []);

  const userGlobal = useSelector((state) => state.userGlobal);
  const cartGlobal = useSelector((state) => state.cartGlobal);
  const dispatch = useDispatch();
  const onAddQty = (data, data2, data3) =>
    dispatch(updateQty(data, data2, data3));

  const qtyHandler = (action, id, qty) => {
    onAddQty(id, qty, action);
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
          increment={() => qtyHandler("increment", item.id, item.quantity)}
          decrement={() => qtyHandler("decrement", item.id, item.quantity)}
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
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Card variant="outlined" sx={{ minWidth: 900 }}>
          <Typography variant="h6" px={6} py={2}>
            My Cart
          </Typography>
          <CardContent>
            <Box px={4}>{renderCart()}</Box>
          </CardContent>
          <Box display="flex" flexDirection="row-reverse" px={6}>
            <ButtonPrimary>Checkout</ButtonPrimary>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Cart;
