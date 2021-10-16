import {
  Card,
  Container,
  Divider,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { API } from "../../constants/api";
import { useSelector } from "react-redux";

function TransactionItem(props) {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({
    title: "",
    desc: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(true);
  };

  const [customProduct, setCustomProduct] = useState({
    addProductName: "",
    addProductDesc: "",
  });

  const [addImage, setAddImage] = useState({
    addFile: null,
    addFileName: null,
  });

  const btnAddImage = (e) => {
    if (e.target.files[0]) {
      setAddImage({
        ...addImage,
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });

      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const customProductBtnHandler = () => {
    if (addImage.addFile) {
      let formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          custom_product_name: customProduct.addProductName,
          custom_product_desc: customProduct.addProductDesc,
        })
      );
      formData.append("file", addImage.addFile);
      axios
        .patch(`${API}/${userGlobal.id}`, formData)
        .then((res) => {
          alert(res.data.message);
          setCustomProduct({
            addProductName: "",
            addProductDesc: "",
          });
          setAddImage({
            ...addImage,
            addFile: "",
            addFileName: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const refreshContent = () => {
    setCustomProduct({
      ...customProduct,
      addProductName: "",
      addProductDesc: "",
    });
    setAddImage({
      ...addImage,
      addFile: null,
      addFileName: null,
    });
  };

  return (
    <>
      <Card variant="outlined" sx={{ paddingRight: 3, paddingLeft: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Box
            display="flex"
            alignItem="center"
            justifyContent="space-between"
            width={800}
          >
            <Box>
              <Typography fontWeight={600}>
                Transaction ID : {props.transactionID}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Transaction Date : {props.transactionDate}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box width="50%">
            <Box display="flex" justifyContent="space-between">
              <Typography>Recipent :</Typography>
              <Typography> {props.recipent}</Typography>
            </Box>
            <Typography>Address : </Typography>
            <Typography>{props.address}</Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between">
              <Typography>Total Payment :</Typography>
              <Typography> Rp.{props.totalPrice}</Typography>
            </Box>
          </Box>
          <Divider orientation="horizontal" variant="middle"></Divider>
          <Box width="50%" justifyContent="center">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Doctor Prescription</Typography>
              {props.hasPrescription ? <Button>View Image</Button> : null}
            </Box>
            <Box display="flex" alignItems="center">
              <Typography> Payment Proof</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography> Payment Status</Typography>
              <Typography fontWeight={700}> Unpaid</Typography>
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
            Transaction details
          </Button>
          <Box display="flex" alignItems="center">
            <ButtonPrimary onClick={handleConfirm}>
              Confirm Payment
            </ButtonPrimary>
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{message.title}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Box>
                    <Box>
                      <>
                        <div className="image_preview mb-5">
                          <img id="imgpreview" alt="" width="100%" />
                        </div>
                      </>
                    </Box>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <Input
                      onChange={btnAddImage}
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                  </label>
                </Stack>
                {/* <label htmlFor="ProductDesc">Notes:</label>
                <textarea
                  value={customProduct.addProductDesc}
                  onChange={inputHandler}
                  type="text"
                  className="form-control"
                  name="addProductDesc"
                  id="ProductDesc"
                  rows="4"
                  cols="50"
                /> */}

                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={customProductBtnHandler} autoFocus>
                  Upload
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default TransactionItem;
