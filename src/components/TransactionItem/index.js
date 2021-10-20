import { Api } from "@mui/icons-material";
import {
  Card,
  Divider,
  Input,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../constants/api";
import { API_URL } from "../../helper";
import dateFormat from "../../helper/dateFormat";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import TransactionDetailItem from "../TransactionDetailItem";

function TransactionItem(props) {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [message, setMessage] = React.useState({
    title: "",
    desc: "",
  });
  const [transDetail, setTransDetail] = useState();

  const [srcFile, setSrcFile] = useState({});
  const [dataFile, setDataFile] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(true);
  };

  const handleConfirm2 = () => {
    setOpen2(true);
    fetchTranscDetail();
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const fetchTranscDetail = () => {
    axios
      .get(`${API_URL}/transactions/detail`, {
        params: {
          id: props.transactionID,
        },
      })
      .then((res) => {
        setTransDetail(res.data);
        // console.log(transDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setDataFile({
      ...dataFile,
      [name]: value,
    });
  };

  const getPaymentProof = () => {};

  const addImage = (e) => {
    if (e.target.files[0]) {
      setSrcFile({
        ...srcFile,
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    if (dataFile) {
      let formData = new FormData();

      let obj = {
        notesPayment: dataFile.notesPayment,
      };
      formData.append("data", JSON.stringify(obj));
      formData.append("file", srcFile.addFile);
      axios
        .patch(`${API}/transactions/update/${props.transactionID}`, formData)
        .then((res) => {
          alert(res.data.message);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderTransDetail = () => {
    return transDetail?.map((item) => {
      return (
        <TransactionDetailItem
          key={item.transactiondetail_id}
          image={`${API}/${item.product_img}`}
          priceperunit={item.price_per_unit}
          priceperstock={item.price_per_stock}
          quantity={item.quantity}
          name={item.product_name}
        />
      );
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
                Transaction Date : {dateFormat(props.transactionDate)}
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
          {/* <Button LinkComponent={Link} to={`/transaction/${props.detail}`}> */}
          <Button onClick={handleConfirm2}>Transaction details</Button>
          <Dialog
            open={open2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Typography p={4}>
              Transaction Details : ID - {props.transactionID}
            </Typography>
            <Typography px={4}>
              Total Payment : Rp.{props.totalPrice}
            </Typography>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box>
                  <Box>
                    <>{renderTransDetail()}</>
                  </Box>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
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
                        <Box className="image_preview mb-5">
                          <img
                            id="imgpreview"
                            alt=""
                            width="100%"
                            src={`${API}/${props.imgproof}`}
                          />
                        </Box>
                        <Box>
                          <TextareaAutosize
                            value={props.notes}
                            name="notesPayment"
                            placeholder="Notes for payment proof"
                            style={{ width: 450 }}
                            minRows={3}
                            onChange={inputHandler}
                          />
                        </Box>
                      </>
                    </Box>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <Input
                      onChange={addImage}
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
                <Button onClick={uploadImage} autoFocus>
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
