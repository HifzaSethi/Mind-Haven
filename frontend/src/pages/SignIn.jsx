import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import SignInSchema from '../schemas/signinSchema';
import { useAppContext } from '../context/AppContext';
import { requestNotificationPermission } from '../notification';
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

    onSubmit: async (values) => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        console.log('LOGIN RESPONSE:', data);
        if (!res.ok) {
          alert(data.message);
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        login(data);

        alert('Login successful 🎉');

        // ⭐ STEP 1: Ask notification permission (ONLY FIRST TIME)
        const token = await requestNotificationPermission();

        await fetch('http://localhost:5000/api/user/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data._id,
            token: token,
          }),
        });

        // ⭐ STEP 2: Go to home
        navigate('/');
      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
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
          Email:
        </label>

        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Enter Your Email"
          className="mb-1.5 mx-2 sm:mx-5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm rounded-md p-3"
        />
        {errors.email && touched.email && (
          <p className="text-sm text-red-600 mx-3">{errors.email}</p>
        )}

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Password
        </label>

        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Enter Password"
          className="mb-2.5 mx-2 sm:mx-5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm rounded-md p-3"
        />
        {errors.password && touched.password && (
          <p className="text-sm text-red-600 mx-3">{errors.password}</p>
        )}

        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-3 rounded-md font-semibold"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default React.memo(SignIn);
