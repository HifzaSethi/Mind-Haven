import { useFormik } from 'formik';
import SignUpSchemas from '../schemas/signup';
import React from 'react';

const initialValues = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  trustedEmail: '',
};
const SignUp = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchemas,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  return (
    <>
      <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner flex flex-col justify-center items-center p-5 border border-emerald-100">
        <h2 className="text-3xl font-bold text-green-900">
          Create Your Account
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[75%] 2xl:w-[76%] mx-auto p-5 pb-1 my-8 flex flex-col justify-center bg-blue-50 border border-emerald-200 shadow-[0_2px_10px_rgba(16,185,129,0.2)] rounded-md"
      >
        <label className="my-2 mt-5 font-medium text-lg sm:text-xl px-2 text-green-900">
          Full Name:
        </label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          placeholder="Enter Your Name"
          className="mb-1.5 mx-2 sm:mx-5 mt-0.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.name && touched.name && (
          <p className="text-sm text-red-600 font-medium mx-3">{errors.name}</p>
        )}

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Age
        </label>

        <input
          name="age"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          placeholder="Enter Your Age"
          className="mx-2 sm:mx-5 mt-0.5 mb-1.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.age && touched.age && (
          <p className="text-sm text-red-600 font-medium mx-3">{errors.age}</p>
        )}

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Email
        </label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Enter Your Email"
          className="mx-2 sm:mx-5 mt-0.5 mb-2.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.email && touched.email && (
          <p className="text-sm text-red-600 font-medium mx-3">
            {errors.email}
          </p>
        )}

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Set Password
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

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Password"
          className="mx-2 sm:mx-5 mt-0.5 mb-2.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-sm text-red-600 font-medium mx-3">
            {errors.confirmPassword}
          </p>
        )}

        <label className="my-2 mt-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Enter Any Trusted Person Email
        </label>
        <input
          name="trustedEmail"
          value={values.trustedEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Email of your guardian or trusted friend"
          className="mx-2 sm:mx-5 mt-0.5 mb-10 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />
        {errors.trustedEmail && touched.trustedEmail && (
          <p className="text-sm text-red-600 font-medium mx-3">
            {errors.trustedEmail}
          </p>
        )}

        <button
          type="submit"
          className="mt-8 mb-3 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 shadow-xl text-white h-13 w-full rounded-md text-lg sm:text-xl font-semibold transition-transform duration-300 transform hover:scale-103"
        >
          Create Account
        </button>
      </form>
    </>
  );
};

export default React.memo(SignUp);
