import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { useCallback } from 'react';
const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // ✅ Use in dropdown menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Assessment', path: '/Assessment' },
    { name: 'Result', path: '/Result' },
    { name: 'Guidance', path: '/Guidance' },
  ];

  return (
    <nav className="bg-white shadow-md border-t border-green-100">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-16 xl:pr-20">
        <div className="flex justify-between items-center py-2.5 sm:py-3">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1.5 sm:p-2 rounded-md text-green-700 hover:bg-green-50 transition"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-3 xl:gap-4">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="text-sm font-medium text-green-700 px-2.5 py-1.5 xl:px-3 xl:py-2 hover:text-white hover:bg-gradient-to-r from-emerald-600 to-green-600 rounded-md transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Dropdown */}
          <div className="relative inline-block">
            {isAuthenticated ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2 text-sm font-semibold text-white rounded-lg shadow transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                    isOpen
                      ? 'bg-gradient-to-r from-emerald-700 to-green-700'
                      : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                  }`}
                >
                  {user?.name || 'User'}
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="absolute top-full right-0 lg:-right-20 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-3">
                        Signed in as <strong>{user?.name}</strong>
                      </p>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                          navigate('/signin');
                        }}
                        className="w-full text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={toggleDropdown}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2 text-sm font-semibold text-white rounded-lg shadow transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                    isOpen
                      ? 'bg-gradient-to-r from-emerald-700 to-green-700'
                      : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                  }`}
                >
                  Sign In
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="absolute top-full right-0 lg:-right-20 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-5 space-y-4">
                      {/* Sign In Section */}
                      <div>
                        <h3 className="text-md font-bold text-gray-900 mb-1">
                          Have an account?
                        </h3>
                        <Link
                          onClick={() => setIsOpen(false)}
                          to="/signin"
                          className="block w-full text-center text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition"
                        >
                          Sign In
                        </Link>
                      </div>

                      <hr className="border-gray-200" />

                      {/* Sign Up Section */}
                      <div>
                        <h3 className="text-md font-bold text-gray-900 mb-1">
                          New Customer
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          New to{' '}
                          <span className="font-semibold text-emerald-600">
                            Mind Haven
                          </span>
                          ? Create an account to get started today.
                        </p>
                        <Link
                          onClick={() => setIsOpen(false)}
                          to="/signup"
                          className="block w-full text-center text-sm font-semibold text-emerald-600 border border-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition"
                        >
                          Create an Account
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Overlay when dropdown is open */}
            {isOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-green-100 py-3">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="block text-sm font-medium text-green-700 px-2 py-2 hover:text-white hover:bg-gradient-to-r from-emerald-600 to-green-600 rounded-md transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
