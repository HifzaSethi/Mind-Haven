import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return {
    goToHome: () => goTo('/'),
    goToAssessment: () => goTo('/Assessment'),
    goToResult: () => goTo('/Result'),
    goToGuidance: () => goTo('/Guidance'),
    goToSignIn: () => goTo('/SignIn'),
    goToSignUp: () => goTo('/SignUp'),
    goToLearnMore: () => navigate('/LearnMore'),
    goToCamera: () => navigate('/Camera'),

    goBack: () => navigate(-1),
  };
};

export default useNavigation;
