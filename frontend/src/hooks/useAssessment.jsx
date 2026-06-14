import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const useAssessment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Get the context values
  const { setShowResult } = useAppContext();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const resetAssessment = () => {
    setStep(1);
    setFormData({});
  };

  return {
    step,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    resetAssessment,
    setShowResult,
  };
};

export default useAssessment;
