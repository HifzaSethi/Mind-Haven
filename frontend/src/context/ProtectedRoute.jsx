// import { Navigate } from 'react-router-dom';
// import { useAppContext } from './AppContext';

// export const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAppContext();

// const token = localStorage.getItem("token");

// if (!isAuthenticated && !token) {
//   return <Navigate to="/signin" replace />;
// }

//   return children;
// };
import { Navigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  const token = localStorage.getItem('token');

  if (!isAuthenticated && !token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

// NEW
export const AssessmentProtectedRoute = ({ children }) => {
  const { formValues } = useAppContext();

  const hasAssessment = formValues && formValues.final_score !== undefined;

  if (!hasAssessment) {
    return <Navigate to="/assessment" replace />;
  }

  return children;
};
