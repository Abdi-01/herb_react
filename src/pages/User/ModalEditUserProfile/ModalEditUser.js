import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { API_URL } from "../../../helper";
import Alert from "@mui/material/Alert";

function EditModal() {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [editUser, setEditUser] = useState({
    editid: userGlobal.id,
    editUserEmail: userGlobal.email,
    editUserFullname: userGlobal.fullname,
    editUserGender: userGlobal.gender,
    editUserAge: userGlobal.age,
    editUserPhoneNumber: userGlobal.phone_number,
    editUserAddress: userGlobal.address,
    editUserCity: userGlobal.city,
  });

  const [addImage, setAddImage] = useState({
    addFile: "",
    addFileName: "",
  });

  const successAlert = () => {
    return (
      <Alert severity="success">This is a success alert — check it out!</Alert>
    );
  };

  const dispatch = useDispatch();
  const getSessions = (data) => {
    dispatch(getSession(data));
  };

  const getSession = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    return (dispatch) => {
      Axios.get(`${API_URL}/auth/session`, {
        params: {
          token: token,
        },
      })
        .then((res) => {
          delete res.data.password;
          console.log(res);
          dispatch({
            type: "USER_LOGIN",
            payload: res.data,
          });
        })
        .catch((err) => {});
    };
  };

  useEffect(() => {
    getSessions();
  }, []);

  const saveBtnHandler = () => {
    if (addImage.addFile) {
      let formData = new FormData();

      formData.append("img_profile", addImage.addFile);

      formData.append(
        "data",
        JSON.stringify({
          email: editUser.editUserEmail,
          fullname: editUser.editUserFullname,
          address: editUser.editUserAddress,
          city: editUser.editUserCity,
          phone_number: editUser.editUserPhoneNumber,
          gender: editUser.editUserGender,
          age: editUser.editUserAge,
        })
      );

      Axios.patch(`${API_URL}/users/${userGlobal.id}`, formData)
        .then((res) => {
          successAlert();
          getSessions();
        })
        .catch(() => {
          alert(`Terjadi Kesalahan`);
        });
    } else if (!addImage.addFile) {
      Axios.patch(`${API_URL}/users/${userGlobal.id}`, {
        email: editUser.editUserEmail,
        fullname: editUser.editUserFullname,
        address: editUser.editUserAddress,
        city: editUser.editUserCity,
        phone_number: editUser.editUserPhoneNumber,
        gender: editUser.editUserGender,
        age: editUser.editUserAge,
      })
        .then((res) => {
          successAlert();
          getSessions();
        })
        .catch(() => {
          alert(`Terjadi Kesalahan`);
        });
    }
  };

  const btnAddImage = (e) => {
    if (e.target.files[0]) {
      setAddImage({
        ...addImage,
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });

      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  return (
    <div className="container">
      <div className="modal_container">
        <div className="m-5">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Profile</h2>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="editUserFullname" className="text-xl-left">
                  Fullname
                </label>
                <input
                  defaultValue={userGlobal.fullname}
                  onChange={inputHandler}
                  name="editUserFullname"
                  type="text"
                  id="editUserFullname"
                  placeholder="Fullname"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="editUserEmail" className="text-xl-left">
                  Email
                </label>
                <input
                  defaultValue={userGlobal.email}
                  onChange={inputHandler}
                  name="editUserEmail"
                  type="email"
                  id="editUserEmail"
                  placeholder="Email"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="editUserAddress" className="text-xl-left">
                  Address
                </label>
                <textarea
                  defaultValue={userGlobal.address}
                  onChange={inputHandler}
                  name="editUserAddress"
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="editUserCity" className="text-xl-left">
                  City
                </label>
                <input
                  defaultValue={userGlobal.city}
                  onChange={inputHandler}
                  name="editUserCity"
                  id="city"
                  type="text"
                  placeholder="City"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="editUserPhoneNumber" className="text-xl-left">
                  Phone Number
                </label>
                <input
                  defaultValue={userGlobal.phone_number}
                  onChange={inputHandler}
                  name="editUserPhoneNumber"
                  type="text"
                  id="editUserPhoneNumber"
                  placeholder="Phone Number"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="editUserGender" className="text-xl-left">
                  Gender
                </label>
                <select
                  defaultValue={userGlobal.gender}
                  onChange={inputHandler}
                  name="editUserGender"
                  type="text"
                  id="gender"
                  className="form-control"
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                </select>
              </div>
              <div>
                <label htmlFor="editUserAge" className="text-xl-left">
                  Age
                </label>
                <input
                  defaultValue={userGlobal.age}
                  onChange={inputHandler}
                  name="editUserAge"
                  type="number"
                  id="age"
                  placeholder="Age"
                  className="form-control"
                />
              </div>
              <br />
              <div>
                <div>
                  <img
                    id="imgpreview"
                    src={API_URL + userGlobal.img_profile}
                    alt=""
                    width="100%"
                  />
                </div>
                <label htmlFor="img_profile" className="text-xl-left">
                  Add image
                </label>
                <input
                  onChange={btnAddImage}
                  type="file"
                  className="form-control"
                  id="img_profile"
                />
              </div>
            </div>
            <div className="modal-footer">
              <Box type="button" onClick={saveBtnHandler}>
                <ButtonPrimary>Save</ButtonPrimary>
              </Box>
              <Box
                component={Link}
                to={`/profiles/${userGlobal.username}`}
                sx={{ textDecoration: "none" }}
              >
                <ButtonPrimary>Back</ButtonPrimary>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
