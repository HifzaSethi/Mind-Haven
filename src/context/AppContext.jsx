/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Create the context
const AppContext = createContext();
// Custom hook to use the context with error checking
const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
// Provider component
const AppProvider = ({ children }) => {
  // Authentication state - Initialize from localStorage
  const [formValues, setFormValues] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [learnMoreClicked, setLearnMoreClicked] = useState(false);

  // App state
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userRiskLevel, setUserRiskLevel] = useState('low');
  const [userName, setUserName] = useState(
    () => localStorage.getItem('userName') || 'Friend'
  );

  const navigate = useNavigate();

  // Persist authentication state to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  // Authentication functions
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Set user name if available
    if (userData?.name) {
      setUserName(userData.name);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserName('Friend');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');

    navigate('/signin');
  };

  const navigateToResult = () => navigate('/Result');

  const contextValue = {
    formValues,
    setFormValues,
    isAuthenticated,
    user,
    login,
    logout,

    score,
    setScore,
    showResult,
    setShowResult,
    learnMoreClicked,
    setLearnMoreClicked,
    userRiskLevel,
    setUserRiskLevel,
    userName,
    setUserName,

    navigateToResult,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, useAppContext, AppProvider };
