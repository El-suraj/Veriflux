import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-500 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-xl font-bold text-gray-800">
              MyLogo
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-4 items-center">
            <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-sm font-medium">
              About
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-sm font-medium">
              Services
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-sm font-medium">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block text-gray-800 hover:text-blue-500 px-3 py-2 text-base font-medium">
            Home
          </a>
          <a href="#" className="block text-gray-800 hover:text-blue-500 px-3 py-2 text-base font-medium">
            About
          </a>
          <a href="#" className="block text-gray-800 hover:text-blue-500 px-3 py-2 text-base font-medium">
            Services
          </a>
          <a href="#" className="block text-gray-800 hover:text-blue-500 px-3 py-2 text-base font-medium">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;