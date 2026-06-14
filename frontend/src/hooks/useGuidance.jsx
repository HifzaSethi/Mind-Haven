import { useEffect, useState } from 'react';
import axios from 'axios';

const useGuidance = (formValues) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (!formValues) return;

    axios
      .post('http://127.0.0.1:5000/api/guidance', {
        cause: formValues.primary_cause,
        emotion: formValues.emotion_detected,
        risk: formValues.final_score,
      })
      .then((res) => setPlan(res.data))
      .catch((err) => console.log(err));
  }, [formValues]);

  return plan;
};

export default useGuidance;
