import { useAppContext } from '../context/useAppContext';
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
    navigateToCamera,
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
    navigateToCamera,
  };
};

export default useAssessment;
