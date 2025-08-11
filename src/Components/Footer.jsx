import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 text-emerald-800 py-4 sm:py-5 border-t border-emerald-300 shadow-inner">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 text-center md:text-left">
        <div className="flex-shrink-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700 tracking-wider font-serif">
            MindCare
          </h3>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-emerald-600 italic">
            Empowering minds. Supporting wellbeing.
          </p>
        </div>
      </div>
      <div className="mt-2 sm:mt-3 border-t border-emerald-300 pt-3 sm:pt-4 text-center text-xs sm:text-xs text-emerald-500 tracking-wide px-3 sm:px-4">
        © {new Date().getFullYear()}{' '}
        <span className="font-semibold">MindCare</span>. All rights reserved.
      </div>
    </footer>
  );
};
export default React.memo(Footer);
