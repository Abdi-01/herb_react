import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3e9c99",
  "&:hover": {
    backgroundColor: "#3e9c99",
  },
}));

export default function ButtonPrimary({
  fullWidth,
  type = "submit",
  disabled,
  children,
  onClick,
  size,
}) {
  return (
    <ColorButton
      variant="contained"
      fullWidth={fullWidth}
      sx={{ mt: 4, mb: 3, px: 4, borderRadius: 4 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      size={size}
    >
      {children}
    </ColorButton>
  );
}
