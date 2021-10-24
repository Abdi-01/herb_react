import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TransactionCustomItem from "../../components/TransactionCustomItem";
import { API } from "../../constants/api";

// custom styling
const Nav = styled.div`
  position: absolute;
  display: flex;
`;

const SidebarNav = styled.nav`
  background: #8ccfcd;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: block;
  padding: 10% 5% 300%;
  left: 0;
  top: 90px;
  transition: 350ms;
  z-index: 4;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding-top: 10%;
`;

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

function AdminTransactons() {
  const [value, setValue] = useState(0);
  const [customTrans, setCustomTrans] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchCustomTrans();
  }, []);

  const fetchCustomTrans = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${API}/transactions`, {
        params: {
          type: "custom",
          token,
        },
      })
      .then((res) => {
        setCustomTrans(res.data);
      })
      .catch();
  };

  const renderCustomTrans = () => {
    return customTrans.map((item) => {
      return (
        <TransactionCustomItem
          transaction_id={item.transaction_id}
          recipent={item.recipent}
          transaction_date={item.transaction_date}
          address={item.address}
          img={item.prescription_img}
        />
      );
    });
  };

  return (
    <Box>
      <Box>
        <Nav>
          <SidebarNav>
            <SidebarWrap>
              <div>
                <h6 className="text-white my-4">Dashboard</h6>
                <h6 className="my-4">
                  <Link
                    to="/adminproducts"
                    className="text-decoration-none text-white link_to"
                  >
                    Manage Products
                  </Link>
                </h6>
                <h6 className="text-white my-4">
                  <Link
                    to="/admin/transactions"
                    className="text-decoration-none text-white link_to"
                  >
                    Transactions
                  </Link>
                </h6>
                <h6 className="my-4">
                  <Link
                    to="/salesreport"
                    className="text-decoration-none text-white link_to"
                  >
                    Sales Report
                  </Link>
                </h6>

                <h6 className="text-white my-4">Manage Account</h6>
              </div>
            </SidebarWrap>
          </SidebarNav>
        </Nav>
      </Box>
      <Box ml={35} px={8}>
        <Typography fontWeight={500} py={4} fontSize={34}>
          Transactions
        </Typography>
        <Box sx={{ backgroundColor: "#FFFF", borderRadius: 6 }}>
          <Box px={4} py={2}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Manage Transactions" {...a11yProps(0)} />
              <Tab label="Serve Transactions" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            py={4}
            sx={{ backgroundColor: "#FFFF", borderRadius: 6 }}
            mx={-3}
            mt={2}
            height={600}
          >
            <Box style={{ maxHeight: 530, overflow: "auto" }} px={4} mr={2}>
              {renderCustomTrans()}
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
}

export default AdminTransactons;
