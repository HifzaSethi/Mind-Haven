import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import SignInSchema from '../schemas/signinSchema';
import { useAppContext } from '../context/AppContext';
const initialValues = {
  email: '',
  password: '',
};
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const formik = useFormik({
    initialValues,
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      console.log(values);

      // Extract the name from email (before @ symbol) or use the full email as name
      const userName = values.email.includes('@')
        ? values.email.split('@')[0]
        : values.email;

      const fakeUser = { name: userName }; // ✅ Now uses actual input value
      login(fakeUser);
      navigate('/');
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <>
      <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner flex flex-col justify-center items-center p-5 border border-emerald-100">
        <h2 className="text-3xl font-bold text-green-900">
          Sign In To Your Account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[75%] 2xl:w-[60%] mx-auto p-5 pb-1 my-8 flex flex-col justify-center bg-blue-50 border border-emerald-200 shadow-[0_2px_10px_rgba(16,185,129,0.2)] rounded-md"
      >
        <label className="my-2 mt-5 font-medium text-lg sm:text-xl px-2 text-green-900">
          Username or Email:
        </label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Your Username or Email"
          className="mb-1.5 mx-2 sm:mx-5 mt-0.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.email && touched.email && (
          <p className="text-sm text-red-600 font-medium mx-3">
            {errors.email}
          </p>
        )}

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Enter Password
        </label>
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Password"
          className="mx-2 sm:mx-5 mt-0.5 mb-2.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.password && touched.password && (
          <p className="text-sm text-red-600 font-medium mx-3">
            {errors.password}
          </p>
        )}

        <button
          type="submit"
          className="mt-8 mb-3 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 shadow-xl text-white h-13 w-full rounded-md text-lg sm:text-xl font-semibold transition-transform duration-300 transform hover:scale-103"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default React.memo(SignIn);
