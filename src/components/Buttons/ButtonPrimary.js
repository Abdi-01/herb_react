import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3e9c99",
  "&:hover": {
    backgroundColor: "#3e9c99",
  },
}));

export default function ButtonPrimary(props) {
  return (
    <ColorButton
      variant="contained"
      fullWidth={props.fullWidth}
      sx={{ mt: 2, mb: 3 }}
      type="submit"
    >
      {props.children}
    </ColorButton>
  );
}
