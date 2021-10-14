import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "./redux/actions/auth";
import { fetchCart } from "./redux/actions/cart";
import AppRoute from "./routes/AppRoute";

const theme = createTheme({
  palette: {
    background: {
      default: "#FAFAFA",
    },
  },
});

function App() {
  useEffect(() => {
    getSessions();

    fetchCarts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redux
  const getSessions = (data) => dispatch(getSession(data));
  const fetchCarts = (data) => dispatch(fetchCart(data));
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.userGlobal);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="">
        <AppRoute />
      </div>
    </ThemeProvider>
  );
}

export default App;
