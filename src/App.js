import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSession } from "./redux/actions/auth";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redux
  const getSessions = (data) => dispatch(getSession(data));
  const dispatch = useDispatch();

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
