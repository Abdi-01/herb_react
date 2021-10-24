import React from "react";
import { Box, Container, Divider } from "@material-ui/core";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import happy_fam from "../../assets/images/happy_fam.jpeg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import hipster from "../../assets/images/hipster.png";
import hoody from "../../assets/images/hoody.png";
import old from "../../assets/images/old.png";
import mom from "../../assets/images/mom.png";
import slow1 from "../../assets/images/slow1.jpeg";
import slow2 from "../../assets/images/slow2.jpeg";
import slow5 from "../../assets/images/slow5.jpeg";
import slow4 from "../../assets/images/slow4.jpeg";
import earth from "../../assets/images/earth.jpg";
import organic from "../../assets/images/organic.png";

import "./home.css";

const Nav = styled.div`
  align-items: center;
`;

const MainContainer = styled.nav`
  background: #8ccfcd;
  width: 100%;
  position: block;
  height: 56vh;
  top: 50px;
  transition: 350ms;
  z-index: -5;
  box-shadow: 5px #888888;
`;

const CarouselItem = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 80vw;
  background-color: wheat;
  color: #fff;
  margin: 0 15px;
  font-size: 4em;
`;

const Home = () => {
  const breakPoints = [
    { width: 10000, itemsToShow: 1 },
    { width: 10000, itemsToShow: 2 },
    { width: 10000, itemsToShow: 3 },
    { width: 10000, itemsToShow: 4 },
  ];
  return (
    <Nav>
      <MainContainer>
        <div className="p-4">
          <img className="earth_img" src={happy_fam} alt="" />
          <img className="organic_img" src={organic} alt="" />
        </div>
        <Container>
          <h1 className="h1_main"> The next generation of care for families</h1>
        </Container>
      </MainContainer>

      <div className="second_container">
        <Container>
          <h1 className="h2_main">
            Herb's pioneering Pharmaceutical care model is built around adults,
            teenagers, and families, delivering better service in serving
            e-pharmacy and doctor's prescriptions for everyone.
          </h1>
          <h5 className="h5_main col-6 d-flex justify-content-sm-center">
            We’re setting a new standard of care for families across
            geographies, cultures, and backgrounds.
          </h5>
        </Container>
        <Container className="d-flex justify-content-between mt-4 mb-4">
          <Container className="icon_container">
            <FavoriteBorderIcon className="icon" />
            <h5>Whole-hearted care</h5>
            <p>Exceptional service for you & your loved ones.</p>
          </Container>
          <Container className="icon_container">
            <ConnectWithoutContactIcon className="icon" />
            <h5>Contactless app</h5>
            <p>
              Dedicated app for anyone, at any age, at, any needs. outcomes.
            </p>
          </Container>
          <Container className="icon_container">
            <AccessibilityNewIcon className="icon" />
            <h5>Friendly for anyone, any age.</h5>
            <p>
              Advocates and data-driven insights deliver better accessibilty for
              everyone.
            </p>
          </Container>
          <Container className="icon_container">
            <AllInclusiveIcon className="icon" />
            <h5>All Inclusive</h5>
            <p>covering all the services, facilities, or delivery.</p>
          </Container>
        </Container>
        <Divider />
        <Container className="sub_third_container mb-4">
          <Container className="d-flex flex-row justify-content-center">
            <div className="sub_third">
              <img className="img_third" src={earth} alt="" />
            </div>
            <div className="d-flex flex-column sub_sub_third">
              <h2 className="h2_main">Herb, in brief</h2>
              <p>
                Herb is a platform that works with trusted partners to provide
                medicines, health and beauty products, as well as various needs
                of doctor's prescriptions, so that users of the can buy them
                easily and safely.
              </p>
            </div>
          </Container>
          <Container className="d-flex flex-row mt-4 justify-content-center">
            <div className="d-flex flex-column sub_sub_third">
              <h2 className="h2_main">Pharmaceutical</h2>
              <p>
                Antibiotics, Daily Suplement, Antacids, Immunosuppressives, and
                manyany many other medicines are available in one application.
              </p>
            </div>
            <div className="sub_third">
              <img className="img_third" src={earth} alt="" />
            </div>
          </Container>
          <Container className="d-flex flex-row mt-4 justify-content-center">
            <div className="sub_third">
              <img className="img_third" src={earth} alt="" />
            </div>
            <div className="d-flex flex-column sub_sub_third">
              <h2 className="h2_main">Need to buy doctor's prescription?</h2>
              <p>
                Upload your prescription's image and we will help you getting
                your medicine, immediately.
              </p>
            </div>
          </Container>
        </Container>
        <Divider />
        <Container className="sub_second_container mb-4">
          <h1 className="h2_main">
            Ongoing care, for anyone, at any age, whenever you need. We've got
            you covered.
          </h1>
          <Container className="d-flex justify-content-between mt-4">
            <Container className="icon_container">
              <img className="image_icon" src={mom} alt="" />
              <h5>Moms</h5>
            </Container>
            <Container className="icon_container">
              <img className="image_icon" src={hoody} alt="" />
              <h5>Teens</h5>
            </Container>
            <Container className="icon_container">
              <img className="image_icon" src={old} alt="" />
              <h5>Mature</h5>
            </Container>
            <Container className="icon_container">
              <img className="image_icon" src={hipster} alt="" />
              <h5>Adults</h5>
            </Container>
          </Container>
        </Container>
      </div>
      <Divider />
      <Box className="third_container">
        <Container className="col-6 d-flex justify-content-sm-center">
          <h1 className="h2_secondary">Hear what they say</h1>
        </Container>
        <div className="carousel_container col-12 d-flex justify-content-center">
          <Carousel breakPoints={breakPoints}>
            <CarouselItem>
              <img className="img_carousel" src={slow1} alt="" />
              <Container>
                <h6 className="h6_main">
                  Works everytime i need to buy my prescriptions.
                </h6>
                <p className="p_main">-Maria Ozawa</p>
              </Container>
            </CarouselItem>
            <CarouselItem>
              <Container>
                <h6 className="h6_main">
                  Now I'm able to restock my medicines without going out of
                  home.
                </h6>
                <p className="p_main">-Sisca Kohl</p>
              </Container>
              <img className="img_carousel" src={slow2} alt="" />
            </CarouselItem>
            <CarouselItem>
              <img className="img_carousel" src={slow5} alt="" />
              <Container>
                <h6 className="h6_main">
                  Thank you HERB, my orders always delivered on time.
                </h6>
                <p className="p_main">-Asep Cobra</p>
              </Container>
            </CarouselItem>
            <CarouselItem>
              <Container>
                <h6 className="h6_main">
                  I can easily find any medicines that i needed.
                </h6>
                <p className="p_main">-Dadang Konelo</p>
              </Container>
              <img className="img_carousel" src={slow4} alt="" />
            </CarouselItem>
          </Carousel>
        </div>
      </Box>
    </Nav>
  );
};

export default Home;
