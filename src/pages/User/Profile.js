import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { API_URL } from '../../helper';

function Profile() {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [userFetch, setUserFetch] = useState({
    userDataList: {},
  });

  const fetchUsers = () => {
    Axios.get(`${API_URL}/users/${userGlobal.id}`)
      .then((res) => {
        if (res.data.length) {
          setUserFetch({ ...userFetch, userData: res.data[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>Profile Page</h1>
      
      <div className="card mb-3 container">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={API_URL + userGlobal.img_profile} className="img-fluid rounded-start" width="100%" alt="" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div style={{display:"flex", flexDirection: "column" }}>
                <label htmlFor="fullname">Fullname</label>
                <p id="fullname" className="card-text">{userGlobal.fullname}</p>
              </div>
              <div style={{display:"flex", flexDirection: "column" }}>
                <label htmlFor="address">Address</label>
                <p id="address" className="card-text">{userGlobal.address}</p>
              </div>
              <div style={{display:"flex", flexDirection: "column" }}>
                <label htmlFor="city">City</label>
                <p id="city" className="card-text">{userGlobal.city}</p>
              </div>
              <div style={{display:"flex", flexDirection: "column" }}>
                <label htmlFor="email">Email</label>
                <p id="email" className="card-text">{userGlobal.email}</p>
              </div>
              <div style={{display:"flex", flexDirection: "column" }}>
                <label htmlFor="gender">Gender</label>
                <p id="gender" className="card-text">{userGlobal.gender}</p>
              </div>
              <div style={{display:"flex", flexDirection: "column" }}>
                <label htmlFor="age">Age</label>
                <p id="age" className="card-text">{userGlobal.age}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Box
        component={Link}
        to={`/profiles/${userGlobal.username}/profile/change`}
        sx={{ textDecoration: "none" }}
      >
        <ButtonPrimary>Edit Profile</ButtonPrimary>
      </Box>

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
