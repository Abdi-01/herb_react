import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as yup from "yup";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary.js";
import { loginUser } from "../../redux/actions/auth.js";
import { useStyles } from "./styles.js";

// Form validation rule
const schema = yup.object().shape({
  account: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  // Handling the Form Using package react-use-from
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const classes = useStyles();
  // States
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Redux
  const userGlobal = useSelector((state) => state.userGlobal);
  const dispatch = useDispatch();
  const onloginUser = (data) => dispatch(loginUser(data));

  const onLogin = (data) => {
    setLoading(true);
    setTimeout(() => {
      onloginUser(data);
    }, 800);
    if (!userGlobal.message) {
      setShowAlert(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      reset();
      setTimeout(() => {
        setShowAlert(false);
        dispatch({ type: "REMOVE_MESSAGE" });
      }, 3000);
    }
  };

  // Logged In
  if (userGlobal.id) {
    return <Redirect to="/" />;
  }
  // Not Logged In

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
              Herb Login
            </Typography>
            {loading ? (
              <Box
                p={5}
                component="form"
                noValidate
                sx={{ width: 450, height: 412, color: "#3e9c99" }}
                onSubmit={handleSubmit(onLogin)}
                display="flex"
                justifyContent="center"
                pt={10}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <Box
                component="form"
                noValidate
                sx={{ width: 450, px: 5, py: 2 }}
                onSubmit={handleSubmit(onLogin)}
              >
                <Box sx={{ height: 48, my: 1 }}>
                  <Alert
                    severity="error"
                    sx={{ marginBottom: "24px" }}
                    style={{ display: showAlert ? "" : "none" }}
                  >
                    {userGlobal?.message}
                  </Alert>
                </Box>
                <Typography>Email or Username</Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  id="email"
                  name="account"
                  size="small"
                  {...register("account")}
                />
                <Typography>Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  size="small"
                  {...register("password")}
                  value={register.password}
                />
                <ButtonPrimary fullWidth>Sign In</ButtonPrimary>
                <Box
                  alignItems="center"
                  className={classes.linkContainer}
                  mt={4}
                >
                  <Link to="/forgot" className={classes.link}>
                    <Button>Forgot Password?</Button>
                  </Link>
                  <Link to="/register" className={classes.link}>
                    <Button>Sign Up</Button>
                  </Link>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
