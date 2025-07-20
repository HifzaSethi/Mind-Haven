import './App.css';
import Home from './Components/Home';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Assessment from './Components/Assesment';
import LearnMore from './Components/LearnMore';
import { useState } from 'react';
import ScrollToTop from './Components/ScrollToTop';
import { ChevronDown, ChevronUp, Scroll, Menu, X } from 'lucide-react';
import Camera from "./Components/Camera";
import Result from './Components/Result';
import Guidance from './Components/Guidance';


const navLinks = [
  { name: ' Home', path: '/Home' },
  { name: ' Assessment', path: '/Assessment' },
  { name: ' Result', path: '/Result' },
  { name: 'Guidance', path: '/Guidance' },
];

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [cameraActive, setCameraActive] = useState(false);
  const [ResultActive, setResultActive] = useState(false);
  const [LearnMoreClicked, setLearnMoreClicked] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-2xl relative overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-gradient-to-br from-white/20 to-emerald-200/20 blur-xl"></div>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-white shadow-xl ring-2 ring-white/20 flex flex-col items-center justify-center">
                  <h1 className="text-lg sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 text-transparent bg-clip-text">MH</h1>
                  <p className="text-[8px] sm:text-[9px] lg:text-[10px] xl:text-xs text-green-600 font-semibold leading-none">Mental Haven</p>
                  <div className="text-xs sm:text-sm mt-0.5">🌿</div>
                </div>
              </div>
            </div>

            {/* Center Heading */}
            <div className="text-center flex-1 px-1 sm:px-2">
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-light leading-tight">
                Mental Health
                <span className="block text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal">Monitoring System</span>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-yellow-50 mt-1 sm:mt-2 font-medium px-1">
                Check in with your mind — it's okay to need support
              </p>
            </div>

            {/* Support Stats */}
            <div className="flex flex-col items-end space-y-2 flex-shrink-0">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-3 border border-white/30 text-center shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white font-bold group-hover:text-yellow-100 transition-colors">24/7</div>
                <div className="text-xs lg:text-sm text-emerald-100 group-hover:text-emerald-50 transition-colors">Support</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-3 border border-white/30 text-center shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white font-bold group-hover:text-yellow-100 transition-colors">Safe</div>
                <div className="text-xs lg:text-sm text-emerald-100 group-hover:text-emerald-50 transition-colors">& Confidential</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-t border-green-100">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-16 xl:pr-20">
          <div className="flex justify-between items-center py-2.5 sm:py-3">
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-1.5 sm:p-2 rounded-md text-green-700 hover:bg-green-50 transition"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Desktop Navigation Links */}
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

            {/* Sign In Button */}
            <div className="relative inline-block">
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
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>

              {isOpen && (
                <div className="absolute top-full right-0 lg:-right-20 mt-2 w-64 sm:w-72 lg:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-3 sm:p-4 lg:p-6">
                    {/* Registered Users Section */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1.5 sm:mb-2">Registered Users</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Have an account? Sign in now.</p>
                      <Link
                        onClick={() => setIsOpen(false)} 
                        to="SignIn"
                        className="block w-full px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg hover:from-emerald-700 hover:to-green-700 transition"
                      >
                        Sign In
                      </Link>
                    </div>
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-3 sm:my-4"></div>

                    {/* New Customer Section */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1.5 sm:mb-2">New Customer</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">New to Mental Haven? Create an account to get started today.</p>
                      <Link
                        onClick={() => setIsOpen(false)} 
                        to="/SignUp"
                        className="block w-full px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-emerald-600 bg-white border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                      >
                        Create an Account
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay to close dropdown when clicking outside */}
              {isOpen && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-green-100 py-3 sm:py-4">
              <ul className="flex flex-col space-y-1.5 sm:space-y-2">
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="block text-sm font-medium text-green-700 px-2.5 sm:px-3 py-1.5 sm:py-2 hover:text-white hover:bg-gradient-to-r from-emerald-600 to-green-600 rounded-md transition"
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

      <ScrollToTop/>
      {/* Routes */}
      <Routes>
        <Route path="/LearnMore" element={LearnMoreClicked? <LearnMore /> :<Navigate to="/Home"/>} />
        <Route path="/" element={<Home onLearnMoreClick={() => setLearnMoreClicked(true)} />} />
        <Route path="/Home" element={<Home onLearnMoreClick={() => setLearnMoreClicked(true)} />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Assessment" element={<Assessment onCameraClick={() => setCameraActive(true)} onResultClick={()=> setResultActive(true)}/>} />
        <Route path="/Camera" element={cameraActive ? <Camera /> : <Navigate to="/Assessment" />} />
        <Route path='/Guidance' element={<Guidance/>}></Route>
        <Route path="/Result" element={ResultActive ? <Result /> : <Navigate to="/Result" />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 text-emerald-800 py-4 sm:py-5 border-t border-emerald-300 shadow-inner">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 text-center md:text-left">
          <div className="flex-shrink-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700 tracking-wider font-serif">MindCare</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-emerald-600 italic">Empowering minds. Supporting wellbeing.</p>
          </div>
        </div>
        <div className="mt-2 sm:mt-3 border-t border-emerald-300 pt-3 sm:pt-4 text-center text-xs sm:text-xs text-emerald-500 tracking-wide px-3 sm:px-4">
          © {new Date().getFullYear()} <span className="font-semibold">MindCare</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;