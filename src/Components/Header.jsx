import NavBar from './NavBar';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-2xl relative overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-gradient-to-br from-white/20 to-emerald-200/20 blur-xl"></div>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-white shadow-xl ring-2 ring-white/20 flex flex-col items-center justify-center">
                  <h1 className="text-lg sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 text-transparent bg-clip-text">
                    MH
                  </h1>
                  <p className="text-[8px] sm:text-[9px] lg:text-[10px] xl:text-xs text-green-600 font-semibold leading-none">
                    Mental Haven
                  </p>
                  <div className="text-xs sm:text-sm mt-0.5">🌿</div>
                </div>
              </div>
            </div>

            {/* Center Heading */}
            <div className="text-center flex-1 px-1 sm:px-2">
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-light leading-tight">
                Mental Health
                <span className="block text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal">
                  Monitoring System
                </span>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-yellow-50 mt-1 sm:mt-2 font-medium px-1">
                Check in with your mind — it's okay to need support
              </p>
            </div>

            {/* User Info & Logout */}
            <div className="flex flex-col items-end space-y-2 flex-shrink-0">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1 text-xs text-white border border-white/30 shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-3 border border-white/30 text-center shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white font-bold group-hover:text-yellow-100 transition-colors">
                      24/7
                    </div>
                    <div className="text-xs lg:text-sm text-emerald-100 group-hover:text-emerald-50 transition-colors">
                      Support
                    </div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-3 border border-white/30 text-center shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white font-bold group-hover:text-yellow-100 transition-colors">
                      Safe
                    </div>
                    <div className="text-xs lg:text-sm text-emerald-100 group-hover:text-emerald-50 transition-colors">
                      & Confidential
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <NavBar />
    </>
  );
};

export default Header;
