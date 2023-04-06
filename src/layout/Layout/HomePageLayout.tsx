import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SliderImage from "../../images/slider.webp";
import "../../scss/HomePage.scss";

export default function HomePageLayout() {
  return (
    <Box className="homePageContent">
      <Box className="sliderImageBox">
        <img src={SliderImage} alt="slider" className="sliderImage"></img>
      </Box>
      <Outlet />
    </Box>
  );
}
