import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { useStyles } from "./styles";

function ForgotSuccess() {
  const userGlobal = useSelector((state) => state.userGlobal);
  const classes = useStyles();

  if (userGlobal.id) {
    return <Redirect to="/" />;
  }

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
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              px={5}
            >
              <Typography component="h1" variant="h5">
                Success!
              </Typography>
              <Typography component="h1" variant="h5" fontSize="16px" mt={1}>
                We've sent to you a reset password link to your account right
                away
              </Typography>
            </Box>
            <Box
              p={5}
              component={Link}
              className={classes.link}
              to="/"
              noValidate
              sx={{ mt: 1, width: 450 }}
            >
              <ButtonPrimary fullWidth type="button">
                Finish
              </ButtonPrimary>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ForgotSuccess;
