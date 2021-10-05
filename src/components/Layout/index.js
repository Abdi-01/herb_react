import { Box } from "@mui/system";
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

import "./layout.css";

export default function Layout(props) {
  return (
    <div className="layout-container">
      <Navbar />
      <Box className="layout-content">{props.children}</Box>
      <Footer />
    </div>
  );
}
