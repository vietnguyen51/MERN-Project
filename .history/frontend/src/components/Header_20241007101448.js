// File: /Users/sakai/Documents/GitHub/MERN-Project/frontend/src/components/Header.js

import React, { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import SearchDropdown from "./SearchDropdown";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái để kiểm soát hiển thị menu
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Xử lý sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Đổi trạng thái menu mở/đóng
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <header
      className={`text-white ${scrolled ? "scrolled" : ""}`}
      style={{
        padding: "16px 0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.7)" : "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {/* Phần navigation nằm ở bên trái */}
        <nav
          style={{
            display: "flex",
            gap: "16px",
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <span className="text-sm tracking-wide">WOMEN</span>
          <span className="text-sm tracking-wide">MEN</span>
          <span className="text-sm tracking-wide">COLLECTIONS</span>
          <Link to="/gifts" className="text-sm tracking-wide">
            GIFTS
          </Link>
        </nav>

        {/* Logo được căn giữa */}
        <div style={{ textAlign: "center", flexGrow: 1 }}>
          <Link to="/" className="text-2xl font-bold tracking-wider">
            SAINT LAURENT
          </Link>
        </div>

        {/* Icon và Menu cho user, cart, search */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <Link to="/services" className="text-lg font-semibold tracking-wide">
            Services
          </Link>
          <button aria-label="Search" onClick={toggleSearch}>
            <Search size={20} />
          </button>
          <Link to="/cart" aria-label="Shopping bag">
            <ShoppingBag size={20} />
          </Link>
          <div style={{ position: "relative" }}>
            {user?._id ? (
              <div>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full text-white bg-black hover:bg-gray-800 transition-all"
                >
                  <User size={20} />
                  <ChevronDown size={16} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-10">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-users"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                aria-label="Login"
                className="flex items-center space-x-1 px-2 py-1 rounded-full text-white bg-black hover:bg-gray-800 transition-all"
              >
                <User size={20} />
                <span className="hidden md:inline text-sm">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu toàn màn hình với nền trắng ngà và hiệu ứng chuyển cảnh cho mobile */}
      <div
        className={`fixed inset-0 bg-slate-50 text-black z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-6 mt-12 text-center">
            <Link
              to="/women"
              className="text-lg font-semibold tracking-wide"
              onClick={toggleMenu}
            >
              WOMEN
            </Link>
            <Link
              to="/men"
              className="text-lg font-semibold tracking-wide"
              onClick={toggleMenu}
            >
              MEN
            </Link>
            <Link
              to="/collections"
              className="text-lg font-semibold tracking-wide"
              onClick={toggleMenu}
            >
              COLLECTIONS
            </Link>
            <Link
              to="/gifts"
              className="text-lg font-semibold tracking-wide"
              onClick={toggleMenu}
            >
              GIFTS
            </Link>
            <div className="relative">
              {user?._id ? (
                <User size={30} />
              ) : (
                <Link
                  to="/login"
                  className="text-lg font-semibold tracking-wide"
                  onClick={toggleMenu}
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <SearchDropdown onClose={() => setIsSearchOpen(false)} />
      )}
    </header>
  );
}

export default Header;
