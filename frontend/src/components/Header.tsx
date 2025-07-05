import React, { useState, useEffect } from 'react';
import { Search, Plus, Briefcase as BriefcaseBusiness, Menu, X } from 'lucide-react'; // Icons
import { NavLink } from 'react-router-dom'; // For navigation links

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);          // Track scroll state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Track mobile menu state

  // Add background shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // If user scrolls more than 10px
    };

    window.addEventListener('scroll', handleScroll); // Listen for scroll
    return () => window.removeEventListener('scroll', handleScroll); // Clean up
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Side: Logo + Search */}
        <div className="flex items-center flex-1">
          {/* Logo */}
          <div className="text-blue-700 font-bold text-2xl flex items-center">
            <span className="bg-blue-700 text-white p-1 rounded-lg mr-1">Op</span>
            <span>plify</span>
          </div>

          {/* Search Bar - hidden on small screens */}
          <div className="hidden md:flex ml-8 relative max-w-md w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search Opportunities"
              className="pl-10 pr-4 py-2 w-full rounded-full border"
            />
          </div>
        </div>

        {/* Desktop Navigation (visible on medium+ screens) */}
        <nav className="hidden md:flex items-center space-x-2">
          {/* Navigation Links */}
          {['/', '/resume-templates', '/portfolio', '/projects'].map((path, i) => {
            const names = ['Home', 'Resume', 'Portfolio', 'Projects'];
            return (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `font-medium px-3 py-2 rounded-md transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-blue-50'
                  }`
                }
              >
                {names[i]}
              </NavLink>
            );
          })}

          {/* Buttons */}
          <div className="flex items-center ml-2 space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>
            <button className="items-center border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:flex">
              <Plus className="h-4 w-4 mr-1" />
              <span>Connect with us</span>
            </button>
            <button className="items-center bg-amber-100 border border-amber-300 px-3 py-2 rounded-lg text-amber-800 hover:bg-amber-200 transition-colors hidden md:flex">
              <BriefcaseBusiness className="h-4 w-4 mr-1" />
              <span>Premium</span>
            </button>
          </div>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center ml-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4">
          <nav className="flex flex-col space-y-2">
            {['Home', 'Resume', 'Portfolio', 'Projects'].map((item, i) => (
              <a key={i} href="#" className="text-gray-600 font-medium px-3 py-2 rounded-md hover:bg-gray-100">
                {item}
              </a>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">Login</button>
            <button className="flex items-center border px-3 py-2 rounded-lg mt-2 hover:bg-gray-100">
              <Plus className="h-4 w-4 mr-1" />
              Connect with us
            </button>
            <button className="flex items-center bg-amber-100 border px-3 py-2 rounded-lg mt-2 text-amber-800 hover:bg-amber-200">
              <BriefcaseBusiness className="h-4 w-4 mr-1" />
              Premium
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
