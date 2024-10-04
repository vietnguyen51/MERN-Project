import React, { useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "READY TO WEAR",
    subcategories: [
      "NEW ARRIVALS",
      "JACKETS AND PANTS",
      "SHIRTS",
      "JERSEY",
      "DENIM",
      "KNITWEAR",
      "OUTERWEAR",
      "LEATHER AND COATS",
    ],
  },
  {
    name: "SHOES",
    subcategories: [
      "NEW ARRIVALS",
      "FORMAL",
      "DERBIES",
      "LOAFERS",
      "BOOTS",
      "SANDALS",
      "SNEAKERS",
    ],
  },
  {
    name: "BAGS",
    subcategories: [
      "NEW ARRIVALS",
      "BACKPACKS",
      "MESSENGERS",
      "CROSSBODY",
      "TRAVEL BAGS",
      "BRIEFCASES",
      "TOTES",
    ],
  },
  {
    name: "SMALL LEATHER GOODS",
    subcategories: [
      "NEW ARRIVALS",
      "CARD CASES",
      "WALLETS",
      "POUCHES",
      "CASES AND HOLDERS",
    ],
  },
  {
    name: "ACCESSORIES",
    subcategories: [
      "NEW ARRIVALS",
      "BELTS",
      "JEWELRY",
      "SUNGLASSES",
      "OTHER ACCESSORIES",
    ],
  },
];

export default function Header() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <nav className="hidden md:flex space-x-6">
            {[
              "HIGHLIGHTS",
              "WOMEN",
              "MEN",
              "SL PRODUCTIONS",
              "RIVE DROITE",
            ].map((item) => (
              <button
                key={item}
                className="text-sm tracking-wide hover:underline"
                onMouseEnter={() => setActiveCategory(item)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="text-center md:text-left flex-grow md:flex-grow-0">
            <Link to="/" className="text-2xl font-bold tracking-wider">
              SAINT LAURENT
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/maison"
              className="text-sm tracking-wide hover:underline hidden md:inline"
            >
              LA MAISON
            </Link>
            <Link
              to="/stores"
              className="text-sm tracking-wide hover:underline hidden md:inline"
            >
              STORES
            </Link>
            <Link
              to="/services"
              className="text-sm tracking-wide hover:underline hidden md:inline"
            >
              SERVICES
            </Link>
            <Link
              to="/login"
              className="text-sm tracking-wide hover:underline hidden md:inline"
            >
              LOGIN
            </Link>
            <button aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/cart" aria-label="Shopping bag">
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </div>
      {activeCategory && (
        <div
          className="absolute left-0 w-full bg-white text-black py-8 z-10"
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="container mx-auto px-4 grid grid-cols-5 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h3 className="font-semibold text-sm">{category.name}</h3>
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    to={`/${category.name
                      .toLowerCase()
                      .replace(/ /g, "-")}/${subcategory
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="block text-sm hover:underline"
                  >
                    {subcategory}
                  </Link>
                ))}
                <Link
                  to={`/${category.name.toLowerCase().replace(/ /g, "-")}`}
                  className="block text-sm font-semibold hover:underline"
                >
                  VIEW ALL
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
