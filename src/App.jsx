import './app.css';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './context/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './mainlayout';
import React, { Suspense, lazy } from 'react';
const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Assessment = lazy(() => import('./pages/Assessment'));
const Result = lazy(() => import('./pages/Result'));
const LearnMore = lazy(() => import('./pages/LearnMore'));
const Guidance = lazy(() => import('./pages/Guidance'));
const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <Routes>
          {/* ALL ROUTES inside MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} /> {/* ✅ Home at / */}
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="assessment"
              element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />
            <Route path="learnmore" element={<LearnMore />} />
            <Route
              path="guidance"
              element={
                <ProtectedRoute>
                  <Guidance />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
