import {
  Card,
  CardContent,
  Container,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as VerifyIcon } from "../../assets/icons/verify.svg";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { API } from "../../constants/api";
import { useStyles } from "./styles";

function Verify(props) {
  const [state, setstate] = useState({
    message: "Please wait while we check your account status...",
  });

  const classes = useStyles();

  useEffect(() => {
    axios
      .patch(
        `${API}/auth/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${props.match.params.token}`,
          },
        }
      )
      .then((res) => {
        setstate({
          ...state,
          message: `Your account ${res.data.message}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box display="flex" width="100%" height={600}>
        <Box m="auto" display="flex" flexDirection="column" alignItems="center">
          <Box className={classes.iconVerify}>
            <SvgIcon component={VerifyIcon} fontSize="inherit"></SvgIcon>
          </Box>
          <Card variant="outlined" sx={{ padding: 3 }}>
            <Typography fontSize="24px" fontWeight="500" textAlign="center">
              User verification
            </Typography>
            <CardContent>
              <Typography color={"GrayText"}>{state.message}</Typography>
            </CardContent>
          </Card>
          <Box
            width="100%"
            mt={1}
            component={Link}
            to="/"
            className={classes.link}
          >
            <ButtonPrimary fullWidth>Take me to the Herb!</ButtonPrimary>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Verify;
