import React from 'react';
import { Link } from 'react-router-dom';

// file directory
import { AdminProducts } from '../index';

// styling
import './landingpage.css';
import styled from 'styled-components';

// custom styling
const Nav = styled.div`
  background: transparent;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SidebarNav = styled.nav`
  background: #8ccfcd;
  width: 250px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: block;
  padding: 10%;
  left: 0;
  transition: 350ms;
  z-index: 4;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding-top: 10%;
`;

const LandingPage = () => {
  return (
    <div>
      <div>
        <Nav>
          <SidebarNav>
            <SidebarWrap>
              <div className="sidebar_content_container">
                <h5 className="my-2">
                  <Link
                    to="/adminproducts"
                    className="text-decoration-none text-white link_to"
                  >
                    Manage Products
                  </Link>
                </h5>
                <h5 className="text-white my-4">Custom Products</h5>
                <h5 className="text-white my-4">Transactions</h5>
                <h5 className="text-white my-4">Manage Account</h5>
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
};

export default LandingPage;
