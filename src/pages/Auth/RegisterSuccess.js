import {
  Card,
  CardContent,
  Container,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as VerifyIcon } from "../../assets/icons/verify.svg";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { useStyles } from "./styles";

function RegisterSuccess() {
  const classes = useStyles();
  return (
    <Container>
      <Box display="flex" width="100%" height={600} mt={6}>
        <Box m="auto" display="flex" flexDirection="column" alignItems="center">
          <Box
            display="flex"
            flexDirection="column"
            sx={{ background: "#FFFF", borderRadius: 6 }}
            alignItems="center"
            p={8}
          >
            <Box className={classes.iconVerify} mb={6}>
              <SvgIcon component={VerifyIcon} fontSize="inherit"></SvgIcon>
            </Box>
            <Card variant="outlined" sx={{ padding: 3 }}>
              <Typography fontSize="24px" fontWeight="500" textAlign="center">
                Register Success
              </Typography>
              <CardContent>
                <Typography color={"GrayText"}>
                  Please verify your account by open your email, we've send to
                  you right away!
                </Typography>
              </CardContent>
            </Card>
            <Box
              width="100%"
              mt={3}
              component={Link}
              to="/"
              className={classes.link}
            >
              <ButtonPrimary fullWidth>Take me to the Herb!</ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterSuccess;
