import { useState } from 'react';
const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return { values, handleChange, handleSubmit };
};
export default useForm;
