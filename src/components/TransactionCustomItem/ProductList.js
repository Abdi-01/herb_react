import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function ProductList(props) {
  const [open, setOpen] = useState(false);
  const [dose, setDose] = useState(0);

  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.userGlobal);
  const cartCustomGlobal = useSelector((state) => state.cartCustomGlobal);

  const doseHandler = (e) => {
    let { value } = e.target;

    setDose(value);
  };

  const addSummaryItem = () => {
    console.log(dose);
    if (dose === 0 || dose === "") {
      alert("Dose must be required");
    } else {
      setOpen(false);

      dispatch({
        type: "ADD_CUSTOM_ITEM",
        payload: {
          ...props.productData,
          dose: parseInt(dose),
        },
      });
      setDose(0);
    }
  };

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(cartCustomGlobal);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box mb={2}>
      <Card sx={{ padding: 1, cursor: "pointer" }} variant="outlined">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography textOverflow="ellipsis" width={250} noWrap>
            {props.name}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleClickOpen}
          >
            Add
          </Button>
          <Dialog fullWidth maxWidth="sm" open={open}>
            <Box p={4} display="flex">
              <Box width={200} mr={2}>
                <img
                  id="imgpreview"
                  src={`${API}/${props.img}`}
                  alt=""
                  width="100%"
                />
              </Box>
              <Card variant="outlined" sx={{ padding: 2, width: 300 }}>
                <Box py={2}>
                  <Typography fontWeight={500}>{props.name}</Typography>
                  <Typography>Stock : {props.stock} bottles</Typography>
                  <Typography>
                    Price per unit : Rp. {props.priceperunit}
                  </Typography>
                  <Typography>
                    Netto Total : {props.totalNetto} {props.unit}
                  </Typography>
                </Box>
                <Divider />
                <Box py={2}>
                  <Typography>Dose quantity ({props.unit})</Typography>
                  <Box display="flex" py={1}>
                    <input
                      type="number"
                      style={{ width: 100 }}
                      value={dose}
                      onChange={doseHandler}
                    />
                    <Button
                      variant="contained"
                      onClick={addSummaryItem}
                      sx={{ ml: 2 }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>
    </Box>
  );
}

export default ProductList;
