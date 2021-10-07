import { yupResolver } from "@hookform/resolvers/yup";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import {
  Alert,
  Card,
  CardContent,
  TextField,
  CircularProgress,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as yup from "yup";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary.js";
import { registerUser } from "../../redux/actions/auth.js";
import { useStyles } from "./styles.js";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters and One Number"
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match"),
});

export default function Register() {
  // Using package react-use-from
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const registerUsers = (data) => dispatch(registerUser(data));
  const userGlobal = useSelector((state) => state.userGlobal);

  const onRegister = (data) => {
    setLoading(true);
    registerUsers(data);
    if (!userGlobal.message) {
      setShowAlert(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      reset();
      setTimeout(() => {
        setShowAlert(false);
        dispatch({ type: "REMOVE_MESSAGE" });
      }, 3000);
    } else {
      setLoading(true);
    }
  };

  if (userGlobal.id) {
    return <Redirect to="/registered" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
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
            <Avatar sx={{ m: 4, bgcolor: "#3e9c99", width: 75, height: 75 }}>
              <SupervisorAccountOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register new account
            </Typography>
            {loading ? (
              <Box
                p={10}
                component="form"
                noValidate
                sx={{ mt: 1, width: 500, height: 564, color: "#3e9c99" }}
                display="flex"
                justifyContent="center"
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <Box
                p={5}
                component="form"
                noValidate
                sx={{ width: 500 }}
                onSubmit={handleSubmit(onRegister)}
              >
                <Alert
                  severity="error"
                  sx={{ marginBottom: "24px" }}
                  style={{ display: showAlert ? "" : "none" }}
                >
                  {userGlobal?.message}
                </Alert>
                <Typography fontWeight={400}>Username</Typography>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  size="small"
                  name="username"
                  {...register("username")}
                  {...(errors.username && {
                    error: true,
                    helperText: errors.username?.message,
                  })}
                />
                <Typography fontWeight={400}>Email</Typography>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  size="small"
                  name="email"
                  // Validation Handle with hookform/resolve and yup
                  {...register("email")}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email?.message,
                  })}
                />
                <Typography>Password</Typography>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  size="small"
                  name="password"
                  type="password"
                  // Validation Handle with hookform/resolve and yup
                  {...register("password")}
                  {...(errors.password && {
                    error: true,
                    helperText: errors.password?.message,
                  })}
                />
                <Typography>Confirm Password</Typography>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  size="small"
                  name="password2"
                  type="password"
                  // Validation Handle with hookform/resolve and yup
                  {...register("passwordConfirm")}
                  {...(errors.password && {
                    error: true,
                    helperText: errors.passwordConfirm?.message,
                  })}
                />

                <ButtonPrimary fullWidth>Register</ButtonPrimary>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mt={4}
                >
                  <Typography fontWeight={400}>
                    Already have an account?
                  </Typography>
                  <Link to="/login" className={classes.link}>
                    <Button>Sign in</Button>
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
