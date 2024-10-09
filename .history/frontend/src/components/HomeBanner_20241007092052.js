// File: /Users/sakai/Documents/GitHub/MERN-Project/frontend/src/components/HomeBanner.js

import React, { useState, useEffect } from "react";

const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint for mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check the screen size when the component mounts

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileSrc =
    "https://saint-laurent.dam.kering.com/m/444b67f9581e5400/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_MOBILE.jpg";
  const desktopSrc =
    "https://saint-laurent.dam.kering.com/m/6ef70daf6a72b3b1/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_DESKTOP.jpg";

  return (
    <img
      alt="Chloé Sevigny"
      loading="lazy"
      decoding="async"
      className="home-banner-image"
      src={isMobile ? mobileSrc : desktopSrc} // Change the source based on screen size
      width="1556"
      height="1946"
    />
  );
};

export default HomeBanner;
