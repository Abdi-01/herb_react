import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { useStyles } from "./styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../redux/actions/auth";

// Form validation rule
const schema = yup.object().shape({
  account: yup.string().required(),
});

function Forgot(props) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const forgotPass = (data) => dispatch(forgotPassword(data));
  const userGlobal = useSelector((state) => state.userGlobal);
  const classes = useStyles();

  if (userGlobal.id) {
    return <Redirect to="/" />;
  }

  const onCheck = (data) => {
    forgotPass(data);

    if (userGlobal.message.length > 1) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      props.history.push("/forgot/success");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card variant="elevation" elevation={0} sx={{ borderRadius: 6 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Login Logo"
              sx={{ m: 4, bgcolor: "#3e9c99", width: 75, height: 75 }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Account Recovery
            </Typography>
            <Typography component="h1" variant="h5" fontSize="16px" mt={1}>
              Recover your password account
            </Typography>
            <Box
              p={5}
              component="form"
              noValidate
              sx={{ mt: 1, width: 450 }}
              onSubmit={handleSubmit(onCheck)}
            >
              <Alert
                severity="error"
                sx={{ marginBottom: "24px" }}
                style={{ display: showAlert ? "" : "none" }}
              >
                {userGlobal?.message}
              </Alert>
              <TextField
                type="text"
                variant="outlined"
                margin="dense"
                fullWidth
                id="email"
                name="account"
                size="small"
                label="Email or username"
                {...register("account")}
              />

              <Box alignItems="center" className={classes.linkContainer} mt={4}>
                <Link to="/login" className={classes.link}>
                  <Button fullWidth>Go Back</Button>
                </Link>
                <ButtonPrimary>Next</ButtonPrimary>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Forgot;
