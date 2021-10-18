import { Card, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function TransactionHistoryItem(props) {
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography> Payment Proof</Typography>
              <Button onClick={handleConfirm}> View Proof</Button>
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
      </Card>
    </>
  );
}

export default TransactionHistoryItem;
