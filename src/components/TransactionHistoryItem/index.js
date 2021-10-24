import { Card, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import dateFormat from "../../helper/dateFormat";
import axios from "axios";
import { API_URL } from "../../helper";
import TransactionDetailItem from "../TransactionDetailItem";
import { API } from "../../constants/api";

function TransactionHistoryItem(props) {
  const userGlobal = useSelector((state) => state.userGlobal);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [open4, setOpen4] = React.useState(false);

  const [transDetail, setTransDetail] = useState();

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

  const handleConfirm4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
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

  const renderTransDetail = () => {
    return transDetail?.map((item) => {
      return (
        <TransactionDetailItem
          image={`${API}/${item.product_img}`}
          priceperstock={item.price_per_stock}
          price={item.price_per_stock}
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
              {props.imgprescription ? (
                <>
                  <Button onClick={handleConfirm4}>View</Button>
                  <Dialog
                    open={open4}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Typography px={2} mt={4}>
                      Prescription : Transaction ID - {props.transactionID}
                    </Typography>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box>
                          <Box>
                            <>
                              <div className="image_preview mb-5">
                                <img
                                  id="imgpreview"
                                  src={`${API}/${props.imgproof}`}
                                  alt=""
                                  width="100%"
                                />
                              </div>
                              <Typography mb={1}>Prescription Notes</Typography>
                              <Card variant="outlined" sx={{ padding: 2 }}>
                                <Typography>{props.prescnotes}</Typography>
                              </Card>
                            </>
                          </Box>
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose4} autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : null}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography> Payment Proof</Typography>
              <Button onClick={handleConfirm}> View</Button>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Typography px={2} mt={4}>
                  Payment Proof : Transaction ID - {props.transactionID}
                </Typography>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box>
                      <Box>
                        <>
                          <Box className="image_preview mb-5">
                            <img
                              id="imgpreview"
                              src={`${API}/${props.imgproof}`}
                              alt=""
                              width="100%"
                            />
                          </Box>
                        </>
                      </Box>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography> Payment Status</Typography>
              <Typography fontWeight={700}> Paid</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
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
          <Box display="flex" alignItems="center"></Box>
        </Box>
      </Card>
    </>
  );
}

export default TransactionHistoryItem;
