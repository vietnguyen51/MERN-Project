import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/HomeBanner.css"; // Đường dẫn tới file CSS

const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Cập nhật trạng thái dựa trên kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Kiểm tra kích thước màn hình khi component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileSrc1 =
    "https://saint-laurent.dam.kering.com/m/444b67f9581e5400/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_MOBILE.jpg";
  const desktopSrc1 =
    "https://saint-laurent.dam.kering.com/m/6ef70daf6a72b3b1/original/SAINT_LAURENT_CHLOE_SEVIGNY_HOMEPAGE_DESKTOP.jpg";

  const banner2Img1 =
    "https://saint-laurent.dam.kering.com/m/7eb2ec3a58fe663/original/DESKTOP_WOMEN_CHLOE_SEVIGNY_CAMPAING_05_EDITORIAL_2x3.jpg";
  const banner2Img2 =
    "https://saint-laurent.dam.kering.com/m/f61545338f3b59a/original/DESKTOP_WOMEN_CHLOE_SEVIGNY_CAMPAING_01_EDITORIAL_2x3.jpg";

  return (
    <div className="scroll-container">
      {/* Banner 1 */}
      <figure className="home-banner-container">
        <img
          alt="Chloé Sevigny"
          loading="lazy"
          decoding="async"
          className="home-banner-image"
          src={isMobile ? mobileSrc1 : desktopSrc1} // Đổi nguồn ảnh dựa trên kích thước màn hình
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
        {!isMobile ? (
          // Hiển thị 2 ảnh trên desktop với cuộn nội bộ
          <div className="banner-2-desktop">
            <div className="scrollable-images">
              <img
                alt="Chloé Sevigny"
                className="banner-2-image"
                src={banner2Img1}
                width="1556"
                height="1946"
              />
              <img
                alt="Chloé Sevigny"
                className="banner-2-image"
                src={banner2Img2}
                width="1556"
                height="1946"
              />
            </div>
          </div>
        ) : (
          // Hiển thị từng ảnh trên mobile với cuộn nội bộ
          <div className="scrollable-images">
            <section className="snap-section">
              <img
                alt="Chloé Sevigny"
                className="banner-2-image"
                src={banner2Img1}
                width="1556"
                height="1946"
              />
            </section>
            <section className="snap-section">
              <img
                alt="Chloé Sevigny"
                className="banner-2-image"
                src={banner2Img2}
                width="1556"
                height="1946"
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBanner;
