import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AdminProducts from '../AdminProducts/AdminProducts';

import './adminstyles.css';
import styled from 'styled-components';

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

function Admin() {
  const userGlobal = useSelector((state) => state.userGlobal);

  if (userGlobal?.role !== 'admin') {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div>
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
                <h6 className="text-white my-4">Transactions</h6>
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
      </div>
      <div className="admin_container">
        <AdminProducts />
      </div>
    </div>
  );
}

export default Admin;
