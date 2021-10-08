import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";

function Profile() {
  const userGlobal = useSelector((state) => state.userGlobal);
  return (
    <div>
      <h1>Profile Page</h1>
      <h6>Current User : {userGlobal.username} </h6>
      <Box
        component={Link}
        to={`/profiles/${userGlobal.username}/password/change`}
        sx={{ textDecoration: "none" }}
      >
        <ButtonPrimary>Change Password</ButtonPrimary>
      </Box>
    </div>
  );
}

export default Profile;
