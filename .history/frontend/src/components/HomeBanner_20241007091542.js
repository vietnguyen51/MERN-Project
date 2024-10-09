// File: /Users/sakai/Documents/GitHub/MERN-Project/frontend/src/components/HomeBanner.js

import React from "react";
import "./HomeBanner.css"; // Make sure to create a corresponding CSS file

const HomeBanner = () => {
  return (
    <img
      alt="Chloé Sevigny"
      loading="lazy"
      decoding="async"
      className="home-banner-image"
      src="https://saint-laurent.dam.kering.com/m/444b67f9581e5400/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_MOBILE.jpg"
    />
  );
};

export default HomeBanner;
