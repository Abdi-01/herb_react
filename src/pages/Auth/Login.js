import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Card, CardContent, TextField } from "@mui/material";
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

  const onLogin = (data) => {
    onloginUser(data);
    setShowAlert(true);
    reset();
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // States
  const [showAlert, setShowAlert] = useState(false);

  // Redux
  const userGlobal = useSelector((state) => state.userGlobal);
  const dispatch = useDispatch();
  const onloginUser = (data) => dispatch(loginUser(data));

  const classes = useStyles();

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
        <Card variant="elevation">
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
            <Box
              p={5}
              component="form"
              noValidate
              sx={{ mt: 1, width: 450 }}
              onSubmit={handleSubmit(onLogin)}
            >
              <Alert
                severity="error"
                sx={{ marginBottom: "24px" }}
                style={{ display: showAlert ? "" : "none" }}
              >
                {userGlobal?.message}
              </Alert>
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
              <Box alignItems="center" className={classes.linkContainer} mt={4}>
                <Link to="#" className={classes.link}>
                  <Button>Forgot Password</Button>
                </Link>
                <Link to="/register" className={classes.link}>
                  <Button>Sign Up</Button>
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
