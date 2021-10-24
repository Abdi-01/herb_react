import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../constants/api";
import dateFormat from "../../helper/dateFormat";
import CustomItem from "../CustomItem";
import ProductList from "./ProductList";

function TransactionCustomItem(props) {
  const [open, setOpen] = React.useState(false);
  const [productsFetch, setProductsFetch] = useState([]);

  const cartCustomGlobal = useSelector((state) => state.cartCustomGlobal);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "DELETE_CUSTOM_ITEM",
    });
  };

  const handleClearItems = () => {
    return dispatch({
      type: "DELETE_CUSTOM_ITEM",
    });
  };

  const fetchProducts = () => {
    axios
      .get(`${API}/products/get`, {
        params: {
          type: "custom",
        },
      })
      .then((res) => {
        setProductsFetch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sumTotalPrice = () => {
    let total = 0;

    cartCustomGlobal.itemList.forEach((item) => {
      total += item.price_per_unit * item.dose;
    });

    return total;
  };

  const addTransDetail = () => {
    console.log(cartCustomGlobal.itemList);
    let total = sumTotalPrice();

    axios
      .post(`${API}/transactions/custom`, {
        dataDetail: cartCustomGlobal.itemList,
        transId: props.transaction_id,
        totalPayment: total,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});

    dispatch({
      type: "DELETE_CUSTOM_ITEM",
    });

    setOpen(false);
  };

  const renderProducts = () => {
    return productsFetch.map((item) => {
      return (
        <ProductList
          name={item.product_name}
          img={item.product_img}
          stock={item.stock}
          totalNetto={item.netto_total}
          unit={item.unit}
          transId={props.transaction_id}
          productId={item.product_id}
          productData={item}
          priceperunit={item.price_per_unit}
        />
      );
    });
  };

  const renderCustomProductItem = () => {
    return cartCustomGlobal.itemList.map((item) => {
      return (
        <Box px={4}>
          <CustomItem
            image={`${API}/${item.product_img}`}
            name={item.product_name}
            priceperunit={item.price_per_unit}
            dose={item.dose}
            unit={item.unit}
          />
        </Box>
      );
    });
  };

  return (
    <Card variant="outlined" sx={{ padding: 2, mb: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex">
          <ShoppingCartOutlinedIcon sx={{ mr: 4 }} />
          <Typography>Transaction - {props.transaction_id}</Typography>
        </Box>
        <Box width={200}>
          <Typography>{props.recipent}</Typography>
        </Box>
        <Box width={100}>
          <Typography>{dateFormat(props.transaction_date)}</Typography>
        </Box>
        <Box width={300}>
          <Typography>{props.address}</Typography>
        </Box>

        <Button
          id={props.transaction_id}
          variant="outlined"
          onClick={(e) => handleClickOpen(e)}
        >
          Serve
        </Button>
        <Dialog fullWidth maxWidth="xl" open={open}>
          <DialogTitle>Transaction ID : {props.transaction_id}</DialogTitle>
          <DialogContent>
            <Box p={6} display="flex">
              <Box>
                <Typography>Prescription Image</Typography>
                <Box
                  p={4}
                  sx={{ backgroundColor: "#FAFAFA", borderRadius: 2 }}
                  mx={-3}
                  mt={2}
                  height={600}
                  width={400}
                >
                  <img
                    id="imgpreview"
                    src={`${API}/${props.img}`}
                    alt=""
                    width="100%"
                  />
                </Box>
              </Box>
              <Box ml={10}>
                <Box>
                  <Typography>Add Products</Typography>
                  <Box
                    py={4}
                    sx={{ backgroundColor: "#FAFAFA", borderRadius: 2 }}
                    mx={-3}
                    mt={2}
                    height={600}
                    width={600}
                  >
                    <Box px={4}>
                      <Box bgcolor="#FFFF" height={500}>
                        <Box p={3}>
                          <Typography mb={2}>Search Products</Typography>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                        <Box
                          px={3}
                          style={{ maxHeight: 300, overflow: "auto" }}
                        >
                          {renderProducts()}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box ml={10}>
                <Box>
                  <Typography>Transaction Summary</Typography>
                  <Box
                    py={4}
                    sx={{ backgroundColor: "#FAFAFA", borderRadius: 2 }}
                    mx={-3}
                    mt={2}
                    height={600}
                    width={380}
                  >
                    <Box
                      px={4}
                      py={2}
                      display="flex"
                      flexDirection="row-reverse"
                    >
                      <Button onClick={handleClearItems}>Clear Items</Button>
                    </Box>
                    {/* Product Custom List  */}
                    <Box
                      height={350}
                      style={{ maxHeight: 350, overflow: "auto" }}
                    >
                      {renderCustomProductItem()}
                    </Box>
                    <Typography ml={4}>
                      Total Payment : Rp. {sumTotalPrice()}
                    </Typography>
                    <Box p={4} display="flex" flexDirection="row-reverse">
                      <Button variant="outlined" onClick={addTransDetail}>
                        Checkout
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
}

export default TransactionCustomItem;
