import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-green-50 py-3 px-6 border-b border-green-200 text-sm">
      <ol className="flex items-center space-x-1 text-emerald-700 font-medium">
        <li>
          <Link
            to="/"
            className="hover:underline transition-colors duration-150"
          >
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const formattedName = name
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={index} className="flex items-center space-x-1">
              <ChevronRight className="w-4 h-4 text-emerald-500" />
              <Link
                to={routeTo}
                className="hover:underline transition-colors duration-150"
              >
                {formattedName}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default React.memo(Breadcrumbs);
