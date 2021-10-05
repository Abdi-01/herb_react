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
    color: grey[700],
    fontWeight: 500,
  },
  iconVerify: {
    fontSize: "100px",
  },
}));

export { useStyles };
