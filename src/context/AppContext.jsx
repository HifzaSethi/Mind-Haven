import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate(); // ✅ Add this

  // State variables
  const [cameraTriggered, setCameraTriggered] = useState(false);
  const [resultPage, setResultPage] = useState(false);
  const [learnMoreClicked, setLearnMoreClicked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userRiskLevel, setUserRiskLevel] = useState(0);
  const [userName, setUserName] = useState("Friend");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate("/"); // go to home after login (optional)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/signin"); // go to signin after logout (optional)
  };

  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const submitAnswers = (userAnswers) => {
    setAnswers(userAnswers);
    const calculatedScore = userAnswers.reduce((a, b) => a + b, 0);
    setScore(calculatedScore);
  };

  // ✅ Navigation helpers using real routing
  const navigateToAssessment = () => {
    navigate("/Assessment");
  };

  const navigateToCamera = () => {
    setCameraTriggered(true);
    navigate("/camera");
  };

  const navigateToResult = () => {
    setResultPage(true);
    navigate("/result");
  };

  const navigateToLearnMore = () => {
    setLearnMoreClicked(true);
    navigate("/learnmore");
  };

  return (
    <AppContext.Provider
      value={{
        cameraTriggered,
        setCameraTriggered,
        resultPage,
        setResultPage,
        learnMoreClicked,
        setLearnMoreClicked,
        showResult,
        setShowResult,
        userRiskLevel,
        setUserRiskLevel,
        userName,
        setUserName,

        isAuthenticated,
        user,
        login,
        logout,

        answers,
        score,
        submitAnswers,

        // ✅ Actual route navigation
        navigateToAssessment,
        navigateToCamera,
        navigateToResult,
        navigateToLearnMore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
