const SignUp = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner flex flex-col justify-center items-center p-5 border border-emerald-100">
        <h2 className="text-3xl font-bold text-green-900">
          Create Your Account
        </h2>
      </div>
<form
  action=""
  className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[75%] 2xl:w-[76%] mx-auto p-5 pb-1 my-8 flex flex-col justify-center bg-blue-50 border border-emerald-200 shadow-[0_2px_10px_rgba(16,185,129,0.2)] rounded-md"
>

        <label className="my-2 mt-5 font-medium text-lg sm:text-xl px-2 text-green-900">
          Full Name:
        </label>
        <input
          type="text"
          placeholder="Enter Your Name"
          required
          className="mb-1.5 mx-2 sm:mx-5 mt-0.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">Age</label>
        <input
          type="number"
          placeholder="Enter Your Age"
          required
          className="mx-2 sm:mx-5 mt-0.5 mb-1.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          className="mx-2 sm:mx-5 mt-0.5 mb-2.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">Set Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          className="mx-2 sm:mx-5 mt-0.5 mb-2.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />

        <label className="my-2 font-medium text-lg sm:text-xl px-2 text-green-900">Confirm Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          className="mx-2 sm:mx-5 mt-0.5 mb-2.5 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />

        <label className="my-2 mt-2 font-medium text-lg sm:text-xl px-2 text-green-900">
          Enter Any Trusted Person Email
        </label>
        <input
          type="email"
          placeholder="Email of your guardian or trusted friend"
          required
          className="mx-2 sm:mx-5 mt-0.5 mb-10 bg-white border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 shadow-sm focus:shadow-md placeholder-slate-400 text-sm sm:text-base rounded-md p-3 transition duration-200"
        />

        {/* Button */}
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

export default SignUp;
