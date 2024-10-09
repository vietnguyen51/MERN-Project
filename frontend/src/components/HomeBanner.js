import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/HomeBanner.css";

const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const bannerRef = useRef(null);

  // Update screen size state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll on arrow down key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" && bannerRef.current) {
        bannerRef.current.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const mobileSrc1 =
      "https://saint-laurent.dam.kering.com/m/444b67f9581e5400/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_MOBILE.jpg";
  const desktopSrc1 =
      "https://saint-laurent.dam.kering.com/m/6ef70daf6a72b3b1/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_DESKTOP.jpg";

  const banner2Images = [
    {
      src: "https://saint-laurent.dam.kering.com/m/7eb2ec3a58fe663/original/DESKTOP_WOMEN_CHLOE_SEVIGNY_CAMPAING_05_EDITORIAL_2x3.jpg",
      title: "SAC DE JOUR",
      description: "EXPLORE THE LINE",
    },
    {
      src: "https://saint-laurent.dam.kering.com/m/f61545338f3b59a/original/DESKTOP_WOMEN_CHLOE_SEVIGNY_CAMPAING_01_EDITORIAL_2x3.jpg",
      title: "ACCESSORIES",
      description: "SEE MORE",
    },
  ];

  // Reusable component for displaying banner images and captions
  const BannerImage = ({ src, title, description }) => (
      <div className="banner-image-container text-center">
        <img alt={title} className="banner-2-image" src={src} width="100%" height="auto" />
        <div className="image-caption">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
  );

  return (
      <div className="scroll-container" ref={bannerRef}>
        {/* Banner 1 */}
        <figure className="home-banner-container">
          <img
              alt="Chloé Sevigny"
              loading="lazy"
              decoding="async"
              className="home-banner-image"
              src={isMobile ? mobileSrc1 : desktopSrc1}
              width="1556"
              height="1946"
          />
          <figcaption className="home-banner-caption">
            <Link to="/product/jacket-spring-2025">
              <h2 className="session-collection">SPRING 25</h2>
              <h3 className="discover-product">DISCOVER THE SELECTION</h3>
            </Link>
          </figcaption>
        </figure>

        {/* Banner 2 */}
        <div className="banner-2-container">
          <div className={isMobile ? "scrollable-images" : "banner-2-desktop row justify-content-center align-items-center"}>
            {banner2Images.map((img, idx) => (
                <section key={idx} className={isMobile ? "snap-section" : "col-sm-6"}>
                  <BannerImage src={img.src} title={img.title} description={img.description} />
                </section>
            ))}
          </div>
        </div>
      </div>
  );
};

export default HomeBanner;
