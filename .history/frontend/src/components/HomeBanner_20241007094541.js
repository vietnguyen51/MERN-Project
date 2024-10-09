// File: /Users/sakai/Documents/GitHub/MERN-Project/frontend/src/components/HomeBanner.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/HomeBanner.css"; // Đường dẫn tới file CSS

const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Điều chỉnh breakpoint cho màn hình mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Kiểm tra kích thước màn hình khi component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileSrc =
    "https://saint-laurent.dam.kering.com/m/444b67f9581e5400/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_MOBILE.jpg";
  const desktopSrc =
    "https://saint-laurent.dam.kering.com/m/6ef70daf6a72b3b1/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_DESKTOP.jpg";

  return (
    <figure className="home-banner-container">
      <img
        alt="Chloé Sevigny"
        loading="lazy"
        decoding="async"
        className="home-banner-image"
        src={isMobile ? mobileSrc : desktopSrc} // Đổi nguồn ảnh dựa trên kích thước màn hình
        width="1556"
        height="1946"
      />
      <figcaption className="home-banner-caption">
        <Link to="/product/jacket-spring-2025">
          <h2>SPRING 25</h2>
          <h3>DISCOVER THE SELECTION</h3>
        </Link>
      </figcaption>
    </figure>
  );
};

export default HomeBanner;
