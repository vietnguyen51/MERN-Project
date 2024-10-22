import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { resetCart } from "../store/cartSlice";
import ROLE from "../common/role";

const categories = {
  WOMEN: [
    { id: 1, label: "READY TO WEAR", subcategories: [ "JACKETS AND PANTS","DRESSES AND SKIRTS", "SHIRTS AND TOPS", "DENIM", "KNITWEAR", "OUTERWEAR"] },
    { id: 2, label: "SHOES", subcategories: [ "FLATS", "LOAFERS", "SANDALS", "SNEAKERS"] },
    { id: 3, label: "BAGS", subcategories: [ "BACKPACKS", "TRAVEL BAGS","BRIEFCASES", "TOTES"] },
    { id: 4, label: "SMALL LEATHER GOODS", subcategories: ["CARD HOLDERS", "WALLETS", "POUCHES"] },
    { id: 5, label: "ACCESSORIES", subcategories: [ "BELTS", "JEWELRY", "SUNGLASSES"] },
  ],
  MEN: [
    { id: 1, label: "READY TO WEAR", subcategories: [ "JACKETS", "SHIRTS", "JERSEY", "PANTS", "DENIM", "KNITWEAR", "OUTERWEAR"] },
    { id: 2, label: "SHOES", subcategories: [ "FORMAL", "BOOTS", "SNEAKERS", "SANDALS"] },
    { id: 3, label: "BAGS", subcategories: [ "BACKPACKS", "TRAVEL BAGS", "BRIEFCASES", "TOTES"] },
    { id: 4, label: "SMALL LEATHER GOODS", subcategories: ["CARD HOLDERS", "WALLETS", "POUCHES"] },
    { id: 5, label: "ACCESSORIES", subcategories: [ "BELTS", "JEWELRY", "SUNGLASSES"] },
  ],
  COLLECTIONS: [
    { id: 1, label: "SPRING-SUMMER 2024", subcategories: ["WOMEN", "MEN"] },
    { id: 2, label: "FALL-WINTER 2023", subcategories: ["WOMEN", "MEN"] },
    { id: 3, label: "CAPSULE COLLECTIONS", subcategories: ["SUMMER ESSENTIALS", "DENIM", "MONOGRAM"] },
    { id: 4, label: "COLLABORATIONS", subcategories: ["ARTIST SERIES", "LIMITED EDITIONS"] },
    { id: 5, label: "ARCHIVES", subcategories: ["ICONIC PIECES", "PAST COLLECTIONS"] },
  ]
};

const mainCategories = ["WOMEN", "MEN", "COLLECTIONS"];

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
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null); // Đóng menu khi click ra ngoài
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(null));
        dispatch(resetCart());
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  return (
      <>
      <header
          className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'text-black' : 'text-white'}`}
          style={{
            backgroundColor: scrolled ? 'rgba(248, 247, 245, 1)' : 'black'
          }}
      >

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
              className="lg:hidden z-50 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
          >
            {isMenuOpen ? (
                <X size={24} className={scrolled ? 'text-black' : 'text-white'}/>
            ) : (
                <Menu size={24} className={scrolled ? 'text-black' : 'text-white'}/>
            )}
          </button>

          <div className="text-center lg:text-left">
            <Link to="/" className="text-2xl font-light tracking-widest">
              SAINT LAURENT
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {mainCategories.map((category) => (
                <div
                    key={category}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(category)} // Mở menu khi di chuột vào
                >
                  <span className="text-sm tracking-wide cursor-pointer">{category}</span>
                </div>
            ))}
          </nav>


          <div className="flex items-center space-x-6">
            <button aria-label="Search" onClick={toggleSearch}>
              <Search size={20} className={scrolled ? 'text-black' : 'text-white'}/>
            </button>

            <Link to="/cart" aria-label="Shopping bag" className="relative">
              <ShoppingBag size={20} className={scrolled ? 'text-black' : 'text-white'}/>
              {cartItemsCount > 0 && (
                  <span
                      className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
              )}
            </Link>

            <div className="relative">
              {user?._id ? (
                  <div>
                    <button
                        onClick={toggleUserMenu}
                        className="flex items-center space-x-1"
                    >
                      <User size={20} className={scrolled ? 'text-black' : 'text-white'}/>
                      <ChevronDown size={16} className={scrolled ? 'text-black' : 'text-white'}/>
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg z-50">
                          {user?.role === ROLE.ADMIN && (
                              <Link
                                  to="/admin-panel/all-users"
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                  onClick={() => setIsUserMenuOpen(false)}
                              >
                                Admin Panel
                              </Link>
                          )}
                          <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
                      className="flex items-center space-x-1"
                  >
                    <User size={20} className={scrolled ? 'text-black' : 'text-white'}/>
                    <span className="hidden md:inline text-sm">Login</span>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      </header>

  {/* Dropdown menu with fade-in effect */
  }
  <div
      ref={dropdownRef}
      className={`fixed left-0 right-0 bg-white z-40 shadow-lg transition-all duration-300 ease-in-out ${
          activeDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            style={{top: '64px'}}
            onMouseEnter={() => setActiveDropdown(activeDropdown)} // Giữ menu mở khi di chuột vào dropdown
            onMouseLeave={() => setActiveDropdown(null)} // Đóng khi rời khỏi dropdown
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-5 gap-8">
              {activeDropdown && categories[activeDropdown].map((category) => (
                  <div key={category.id}>
                    <h3 className="text-lg font-light mb-4">{category.label}</h3>
                    <nav className="space-y-2">
                      {category.subcategories.map((subcat, index) => (
                          <Link
                              key={index}
                              to={`/collections/${activeDropdown.toLowerCase()}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            {subcat}
                          </Link>
                      ))}
                    </nav>
                  </div>
              ))}
            </div>
          </div>
        </div>


        {/* Mobile menu */}
        <div
            className={`lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="container mx-auto px-4 py-16">
            <nav className="space-y-6">
              {mainCategories.map((mainCategory) => (
                  <div key={mainCategory}>
                    <h2 className="text-xl font-light mb-4">{mainCategory}</h2>
                    {categories[mainCategory].map((category) => (
                        <div key={category.id} className="mb-4">
                          <h3 className="text-lg font-light mb-2">{category.label}</h3>
                          <div className="space-y-2 ml-4">
                            {category.subcategories.map((subcat, index) => (
                                <Link
                                    key={index}
                                    to={`/collections/${mainCategory.toLowerCase()}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="block text-sm text-gray-600 hover:text-black transition-colors duration-200"
                                    onClick={toggleMenu}
                                >
                                  {subcat}
                                </Link>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
              ))}


            </nav>
          </div>
        </div>

        {isSearchOpen && <SearchProduct onClose={() => setIsSearchOpen(false)} />}
        <div className="h-16"></div> {/* Spacer to push content below fixed header */}
      </>
  );
}
