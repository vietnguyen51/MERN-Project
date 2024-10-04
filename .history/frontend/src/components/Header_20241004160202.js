import React, { useState } from "react";
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import productCategory from "./productCategory";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = (category) => {
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const renderDropdownContent = (category) => {
    const categoryItems = productCategory.filter(
      (item) =>
        (category === "WOMEN" &&
          [
            "handbags",
            "shoes",
            "accessories",
            "jewelry",
            "dresses",
            "skirts",
          ].includes(item.value)) ||
        (category === "MEN" &&
          ["shoes", "t-shirts", "jackets", "pants", "suits"].includes(
            item.value
          )) ||
        (category === "COLLECTIONS" &&
          ["coats", "sweaters", "shorts"].includes(item.value))
    );

    return (
      <div
        className="absolute left-0 w-full bg-white text-black shadow-md py-4 z-10"
        onMouseEnter={() => handleMouseEnter(category)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 grid grid-cols-4 gap-4">
          {categoryItems.map((item) => (
            <Link
              key={item.id}
              to={`/product-category?category=${item.value}`}
              className="text-sm hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="bg-black text-white relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            className="lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-center lg:text-left flex-grow lg:flex-grow-0">
            <Link to="/" className="text-2xl font-bold tracking-wider">
              SAINT LAURENT
            </Link>
          </div>
          <nav
            className={`hidden lg:flex space-x-6 ${isMenuOpen ? "block" : ""}`}
          >
            {["WOMEN", "MEN", "COLLECTIONS"].map((category) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-sm tracking-wide cursor-pointer">
                  {category}
                </span>
                {activeDropdown === category && renderDropdownContent(category)}
              </div>
            ))}
            <Link to="/gifts" className="text-sm tracking-wide">
              GIFTS
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <button aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/cart" aria-label="Shopping bag">
              <ShoppingBag size={20} />
            </Link>
            <Link
              to="/login"
              aria-label="Login"
              className="flex items-center space-x-1 px-2 py-1 rounded-full text-white bg-black hover:bg-gray-800 transition-all"
            >
              <User size={20} />
              <span className="hidden md:inline text-sm">Login</span>
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700">
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/women" className="hover:underline text-sm tracking-wide">
              WOMEN
            </Link>
            <Link to="/men" className="hover:underline text-sm tracking-wide">
              MEN
            </Link>
            <Link
              to="/collections"
              className="hover:underline text-sm tracking-wide"
            >
              COLLECTIONS
            </Link>
            <Link to="/gifts" className="hover:underline text-sm tracking-wide">
              GIFTS
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
