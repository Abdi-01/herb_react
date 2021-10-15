import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Badge, IconButton, Skeleton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BasicMenu from "./BasicMenu";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { fetchCart } from "../../redux/actions/cart";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#8ccfcd",
    },
  },
});

export default function Navbar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Global State
  const userGlobal = useSelector((state) => state.userGlobal);
  const cartGlobal = useSelector((state) => state.cartGlobal);

  const dispatch = useDispatch();
  const fetchCarts = (data) => dispatch(fetchCart(data));

  const classes = useStyles();
  return (
    <Box>
      <ThemeProvider theme={customTheme}>
        <AppBar position="static" elevation={0}>
          <Toolbar className={classes.title} variant="dense">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="#FFFF"
            >
              <Button size="large" color="inherit" component={Link} to="/">
                Herb
              </Button>
            </Box>
            <Box
              color="white"
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              width="300px"
            >
              <Button size="small" component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button size="small" color="inherit">
                Products
              </Button>
              <Button
                component={Link}
                to="/customorder"
                size="small"
                color="inherit"
              >
                Order
              </Button>
            </Box>
            <Box display="flex" alignItems="center">
              <Box component={Link} to="/cart">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  style={{ color: "#FFFF", marginRight: 10 }}
                >
                  {userGlobal.id ? (
                    cartGlobal.length ? (
                      <LocalMallOutlinedIcon />
                    ) : (
                      <Badge
                        badgeContent={cartGlobal.cartList.length}
                        color="info"
                      >
                        <LocalMallOutlinedIcon />
                      </Badge>
                    )
                  ) : null}
                </IconButton>
              </Box>
              {loading ? (
                <Skeleton component="h3" width={83} animation="wave" />
              ) : userGlobal.username ? (
                <Box width={83}>
                  <BasicMenu />
                </Box>
              ) : (
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Button
                    style={{ color: "#FFFF" }}
                    startIcon={<LoginOutlinedIcon />}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
