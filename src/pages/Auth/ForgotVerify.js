import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { API } from "../../constants/api";

// Form validation rule
const schema = yup.object().shape({
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

function ForgotVerify(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onChangePassword = (data) => {
    setLoading(true);
    setTimeout(() => {
      axios
        .patch(
          `${API}/auth/reset-password`,
          { password: data.password },
          {
            headers: {
              Authorization: `Bearer ${props.match.params.token}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
      props.history.push("/forgot/verify/success");
    }, 1000);

    console.log(data.password);
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
              Reset your password
            </Typography>
            <Typography component="h1" variant="h5" fontSize="16px" mt={1}>
              Please choose a new password
            </Typography>
            {loading ? (
              <Box
                p={5}
                component="form"
                noValidate
                sx={{ width: 450, height: 412, color: "#3e9c99" }}
                onSubmit={handleSubmit()}
                display="flex"
                justifyContent="center"
                pt={10}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <Box
                p={5}
                component="form"
                noValidate
                sx={{ mt: 1, width: 450 }}
                onSubmit={handleSubmit(onChangePassword)}
              >
                <Typography>New password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  id="password"
                  name="password"
                  size="small"
                  {...register("password")}
                  {...(errors.password && {
                    error: true,
                    helperText: errors.password?.message,
                  })}
                />
                <Typography>Re-enter new password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  id="email"
                  name="passwordConfirm"
                  size="small"
                  {...register("passwordConfirm")}
                  {...(errors.passwordConfirm && {
                    error: true,
                    helperText: errors.passwordConfirm?.message,
                  })}
                />
                <ButtonPrimary fullWidth>Change Password</ButtonPrimary>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ForgotVerify;
