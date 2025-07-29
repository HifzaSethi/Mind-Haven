import { useState } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';

export const AppProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [learnMoreClicked, setLearnMoreClicked] = useState(false); // <-- Add this
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  // Navigation functions
  const navigateToAssessment = () => navigate('/Assessment');
  const navigateToLearnMore = () => {
    setLearnMoreClicked(true); // <-- Set flag when navigating
    navigate('/LearnMore');
  };
  const navigateToCamera = () => navigate('/Camera');
  const navigateToResult = () => navigate('/Result');

  return (
    <AppContext.Provider
      value={{
        score,
        setScore,
        learnMoreClicked, // <-- Provide in context
        setLearnMoreClicked, // <-- Provide in context
        showResult,
        setShowResult,
        navigateToAssessment,
        navigateToLearnMore,
        navigateToCamera,
        navigateToResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
