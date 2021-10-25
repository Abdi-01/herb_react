import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { changePassword } from "../redux/actions/auth";

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

function ChangePassword(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const userGlobal = useSelector((state) => state.userGlobal);
  const dispatch = useDispatch();
  const changePasswords = (data) => dispatch(changePassword(data));

  const onChangePassword = (data) => {
    changePasswords(data);
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
            <Typography component="h1" variant="h5" mt={4}>
              Change password
            </Typography>
            <Typography component="h1" variant="h5" fontSize="16px" mt={1}>
              Please choose a new password
            </Typography>
            <Box display="flex">
              <Box
                p={5}
                px={20}
                component="form"
                noValidate
                sx={{ mt: 1, width: 800 }}
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ChangePassword;
