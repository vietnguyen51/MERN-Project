import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 flex flex-col items-center"> {/* Sử dụng Flexbox để căn giữa nội dung */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"> {/* Thêm text-center cho màn hình nhỏ */}
          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider">CUSTOMER CARE</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm hover:underline">Contact Us</Link></li>
              <li><Link to="/shipping-returns" className="text-sm hover:underline">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="text-sm hover:underline">Track Your Order</Link></li>
            </ul>
          </div>

          {/* The Brand */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider">THE BRAND</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link to="/careers" className="text-sm hover:underline">Careers</Link></li>
              <li><Link to="/sustainability" className="text-sm hover:underline">Sustainability</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-wider">NEWSLETTER</h3>
            <p className="text-sm mb-4">Sign up for exclusive updates and offers.</p>
            <form className="flex justify-center md:justify-start"> {/* Điều chỉnh form để căn giữa trên màn hình nhỏ */}
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent border-b border-white text-white text-sm p-2 flex-grow focus:outline-none"
              />
              <button type="submit" className="text-sm uppercase ml-2 hover:underline">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center w-full">
          <p className="text-xs">&copy; 2024 SAINT LAURENT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
