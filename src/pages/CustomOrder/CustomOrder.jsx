import React, { useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../../helper';
import {
  Grid,
  Container,
  Card,
  Box,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useSelector } from 'react-redux';
import getCurrentDate from '../../helper/getDate';
import './customorderstyles.css';

const CustomOrder = () => {
  const userGlobal = useSelector((state) => state.userGlobal);

  const [customProduct, setCustomProduct] = useState({
    addProductDesc: '',
  });

  const [addImage, setAddImage] = useState({
    addFile: null,
    addFileName: null,
  });

  const btnAddImage = (e) => {
    if (e.target.files[0]) {
      setAddImage({
        ...addImage,
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });

      let preview = document.getElementById('imgpreview');
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const addCustomProductBtnHandler = () => {
    if (addImage.addFile) {
      let formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          userId: userGlobal.id,
          recipent: userGlobal.fullname,
          address: userGlobal.address,
          transaction_date: getCurrentDate(),
          notes: customProduct.addProductDesc,
        })
      );
      formData.append('file', addImage.addFile);
      Axios.post(`${API_URL}/transactions/customs`, formData)
        .then((res) => {
          alert(res.data.message);
          setCustomProduct({
            addProductDesc: '',
          });
          setAddImage({
            ...addImage,
            addFile: '',
            addFileName: '',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCustomProduct({ ...customProduct, [name]: value });
  };

  const refreshContent = () => {
    setCustomProduct({
      ...customProduct,
      addProductName: '',
      addProductDesc: '',
    });
    setAddImage({
      ...addImage,
      addFile: null,
      addFileName: null,
    });
  };

  const steps = [
    'Make Sure you have a legitimate prescription',
    "Upload Your Prescription's Image",
    'We Will Soon Notify Your Oder Through Email',
  ];
  return (
    <div className="product_custom_container d-flex flex-row justify-content-center">
      <Card className="p-4 m-4 col-8">
        <Grid>
          <Container>
            <Container className="jumbotron p-4">
              <h1>Need a prescription medicine?</h1>
              <h4>
                Worry less... upload your doctor's prescription to us and we'll
                deliver them to your door.
              </h4>
              <br />
              <h5 className="d-flex flex-row-reverse">#stayathome</h5>
            </Container>
            <div className="d-flex justify-content-between">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  className="card-img-top"
                  src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?size=626&ext=jpg"
                  alt=""
                />
                <div className="card-body">
                  <p className="card-text">
                    Works everytime i need to buy my prescriptions.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: '18rem' }}>
                <img
                  className="card-img-top"
                  src="https://media.istockphoto.com/photos/mature-mixed-race-business-man-picture-id1059661424?k=20&m=1059661424&s=612x612&w=0&h=CLL4tto10GPo1gtMR9c-kPmf8VkvodjvTyqvtEuTLtg="
                  alt=""
                />
                <div className="card-body">
                  <p className="card-text">
                    Now I'm able to restock my medicines without going out of
                    home.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: '18rem' }}>
                <img
                  className="card-img-top"
                  src="https://media.istockphoto.com/photos/closeup-portrait-of-happy-senior-woman-portrait-picture-id1150346585?k=20&m=1150346585&s=612x612&w=0&h=22A8jpfRlADVfmghYi5HIMp6WnRiCoFBH4MTOgv8Ox4="
                  alt=""
                />
                <div className="card-body">
                  <p className="card-text">
                    Thank you HERB, my orders always delivered on time.
                  </p>
                </div>
              </div>
            </div>
            <Container className=" pb-4">
              <Box className="mt-4">
                <h3>The Doctor's Prescription order guidelines:</h3>
                <Stepper activeStep={1} alternativeLabel>
                  {steps.map((val) => (
                    <Step key={val}>
                      <StepLabel>{val}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Container>
            <Divider />
            <Container className="p-4">
              <List className="col-6">
                <h3>We Guarantee:</h3>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccessibilityNewIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Whole-person caree"
                    secondary="A holistic approach that offers comprehensive care for all families."
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AddModeratorIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Your privacy is our priority"
                    secondary="Dedicated Care Advocates and data-driven insights deliver better outcomes."
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DeliveryDiningIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Fast Delivery"
                    secondary="Our delivery is operating 24 hours and 7 days a weeks, no exceptions."
                  />
                </ListItem>
              </List>
            </Container>
          </Container>
        </Grid>
      </Card>
      {userGlobal.id ? (
        <Container className="m-2" style={{ paddingTop: '12%' }}>
          <Grid>
            <Container className="justify-content-center">
              <div className="pt-4">
                <h4>Please fill form below: </h4>
              </div>
              <div className="image_preview">
                <img id="imgpreview" alt="" width="100%" />
              </div>
              <div>
                <label htmlFor="img">Upload prescription here: </label>
                <input
                  onChange={btnAddImage}
                  type="file"
                  className="form-control"
                  id="img"
                />
                <label htmlFor="ProductDesc">Notes:</label>
                <textarea
                  value={customProduct.addProductDesc}
                  onChange={inputHandler}
                  type="text"
                  className="form-control"
                  name="addProductDesc"
                  id="ProductDesc"
                  rows="4"
                  cols="50"
                />
              </div>
            </Container>
            <Container>
              <div className="modal-footer">
                <button
                  onClick={addCustomProductBtnHandler}
                  className="btn btn-info text-white"
                >
                  Submit
                </button>
                <button onClick={refreshContent} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </Container>
          </Grid>
        </Container>
      ) : null}
    </div>
  );
};

export default CustomOrder;
