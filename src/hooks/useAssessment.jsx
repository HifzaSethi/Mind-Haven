import { useAppContext } from "../Context/AppContext";

const useAssessment = () => {
  const {
    answers,
    score,
    submitAnswers,
    userRiskLevel,
    setUserRiskLevel,
    showResult,
    setShowResult,
    navigateToAssessment,
    navigateToResult,
  } = useAppContext();

  return {
    answers,
    score,
    submitAnswers,
    userRiskLevel,
    setUserRiskLevel,
    showResult,
    setShowResult,
    navigateToAssessment,
    navigateToResult,
  };
};

export default useAssessment;