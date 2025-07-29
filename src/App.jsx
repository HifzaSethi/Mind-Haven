import './app.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import Header from './Components/HEader';
import Home from './pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './pages/SignUp';
import Assessment from './Pages/Assessment';
import Result from './pages/Result';
import CameraCapture from './pages/Camera';
import LearnMore from './pages/LearnMore';
import Guidance from './pages/Guidance';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Assessment" element={<Assessment />} />
        <Route path="/Camera" element={<CameraCapture />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/Guidance" element={<Guidance />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
