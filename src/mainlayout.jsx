import HEader from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from './components/breadcrumbs';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <HEader />
      <Breadcrumbs />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
