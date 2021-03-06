import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Avatar, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { default as Axios, default as axios } from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import TransactionItem from "../../components/TransactionItem";
import { API } from "../../constants/api";
import { API_URL } from "../../helper";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const userGlobal = useSelector((state) => state.userGlobal);
  const [transactionData, setTransactionData] = useState({
    transaction: [],
  });

  const fetchTransaction = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${API}/transactions`, {
        params: {
          token: token,
        },
      })
      .then((res) => {
        let dataTrans = res.data;
        setTransactionData({
          ...transactionData,
          transaction: dataTrans,
        });
      })
      .catch((err) => {});
  };

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
    fetchTransaction();
  }, []);

  return (
    <Container>
      <Box display="flex">
        <Card
          variant="elevation"
          elevation={0}
          sx={{ width: 300, py: 4, borderRadius: 6, mt: 4 }}
        >
          <Avatar
            alt="Remy Sharp"
            src={API_URL + userGlobal.img_profile}
            sx={{ width: 150, height: 150, ml: 10 }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign="center"
            >
              {userGlobal.fullname}
            </Typography>
            <Typography textAlign="center" color="GrayText">
              {userGlobal.username}
            </Typography>
            <Typography textAlign="center" color="CaptionText">
              {userGlobal.email}
            </Typography>
            <Box px={4} mt={2}>
              <Box display="flex" justifyContent="space-between"></Box>
              <Box>
                <Typography color="GrayText">Address</Typography>
              </Box>
              <Box mb={2}>
                <Typography fontSize={14}>{userGlobal.address}</Typography>
              </Box>
              <Box>
                <Typography color="GrayText">City</Typography>
              </Box>
              <Box mb={2}>
                <Typography fontSize={14}>{userGlobal.city}</Typography>
              </Box>
              <Box>
                <Typography color="GrayText">Phone Number</Typography>
              </Box>
              <Box mb={2}>
                <Typography fontSize={14}>{userGlobal.phone_number}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Box>
                    <Typography color="GrayText">Gender</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography fontSize={14}>{userGlobal.gender}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography color="GrayText">Age</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography fontSize={14}>{userGlobal.age}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box px={4}>
              <Box
                component={Link}
                to={`/profiles/${userGlobal.username}/change`}
                sx={{ textDecoration: "none" }}
              >
                <ButtonPrimary size="small" fullWidth>
                  Edit Profile
                </ButtonPrimary>
              </Box>
              <Box
                component={Link}
                to={`/profiles/${userGlobal.username}/password/change`}
                sx={{ textDecoration: "none" }}
              >
                <ButtonPrimary size="small" fullWidth>
                  Change Password
                </ButtonPrimary>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card
          variant="elevation"
          elevation={0}
          sx={{ width: 800, py: 4, borderRadius: 6, mt: 4, ml: 4 }}
        >
          <Box display="flex" p={4} px={8}>
            <Box sx={{ borderRadius: 6, width: 400 }}>
              <Box display="flex">
                <Avatar sx={{ bgcolor: "#3E9C99", width: 50, height: 55 }}>
                  <ReceiptOutlinedIcon />
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  ml={2}
                >
                  <Typography>Transactions</Typography>
                  <Typography fontWeight={500}>
                    {transactionData.transaction.length} transactions
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ borderRadius: 6, width: 400 }}>
              <Box display="flex">
                <Avatar sx={{ bgcolor: "#3E9C99", width: 55, height: 55 }}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  ml={2}
                >
                  <Typography>Account Status</Typography>
                  <Typography fontWeight={500}>
                    {userGlobal.user_status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box p={4} px={8}>
            <Typography variant="h5">Recent Transactions</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            style={{ maxHeight: 450, overflow: "auto" }}
            p={4}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  px={4}
                  pb={14}
                >
                  <Box p={4}>
                    <ShoppingCartOutlinedIcon
                      fontSize="large"
                      color="disabled"
                    />
                  </Box>
                  <Box
                    component={Link}
                    to={`/transaction`}
                    sx={{ textDecoration: "none" }}
                  >
                    <ButtonPrimary>View more</ButtonPrimary>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Profile;
