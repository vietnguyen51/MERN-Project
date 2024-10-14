import React, { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "./SearchDropdown";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { resetCart } from "../store/cartSlice"; // Import resetCart action
import ROLE from "../common/role";

export default function Header() {
  const user = useSelector((state) => state.user?.user);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle logout and reset cart
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null)); // Xóa thông tin người dùng
      dispatch(resetCart()); // Reset giỏ hàng
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
      <header className="bg-black text-white relative">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
              className="lg:hidden z-50 fixed top-4 left-4 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
          >
            {isMenuOpen ? (
                <X color={"black" } size={24} />
            ) : (
                <Menu color={scrolled ? "black" : "white"} size={24} />
            )}
          </button>

          <div className="text-center lg:text-left flex-grow lg:flex-grow-0">
            <Link to="/" className="text-2xl font-bold tracking-wider">
              SAINT LAURENT
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-6">
            <span className="text-sm tracking-wide">WOMEN</span>
            <span className="text-sm tracking-wide">MEN</span>
            <span className="text-sm tracking-wide">COLLECTIONS</span>
            <Link to="/gifts" className="text-sm tracking-wide">
              GIFTS
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <button aria-label="Search" onClick={toggleSearch}>
              <Search size={20} />
            </button>

            <Link to="/cart" aria-label="Shopping bag" className="relative">
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
              )}
            </Link>

            <div className="relative">
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
                              onClick={handleLogout} // Gọi handleLogout khi logout
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

        <div
            className={`fixed inset-0 bg-slate-50 text-black z-40 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center space-y-6 mt-12 text-center">
              <Link
                  to="/collections/women"
                  className="text-lg font-semibold tracking-wide"
                  onClick={toggleMenu}
              >
                WOMEN
              </Link>
              <Link
                  to="/collections/men"
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
                    <>
                      <User size={30} />
                    </>
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
