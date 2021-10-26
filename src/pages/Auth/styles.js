import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  pageContainer: {
    backgroundColor: grey[500],
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    display: "block",
    marginTop: 4,
    fontWeight: 500,
  },
  iconVerify: {
    fontSize: "100px",
  },
  textInput: {
    height: 100,
  },
}));

export { useStyles };
