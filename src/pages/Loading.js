import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Loading() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
