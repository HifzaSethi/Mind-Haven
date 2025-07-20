import { Navigate, useNavigate } from "react-router-dom";

const Home = ({ onLearnMoreClick }) => {
  const navigate = useNavigate();

  const MoveTOLearn = () => {
    onLearnMoreClick(); // updates the flag in App.jsx
    navigate("/LearnMore"); // navigates to route
  };

  const MoveToStart = () => {
    navigate("/Assessment");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-blue-50 flex flex-col justify-center items-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 lg:py-24 xl:px-20 xl:py-32 border-t border-b border-emerald-200 shadow-[0_2px_10px_rgba(16,185,129,0.2)]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-green-700 font-bold text-center leading-tight">
          Welcome to 
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mt-2 sm:mt-3 md:mt-4">
            MindHaven
          </span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed tracking-wider mt-4 sm:mt-6 md:mt-8 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-2">
          Your personal mental health companion that helps detect your early signs of depression and provides personalized guidance for better wellbeing
        </p>
      </div>

      {/* What We Offer Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-green-50 text-center border-t border-emerald-200">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-emerald-700 mb-6 sm:mb-8 md:mb-10 px-4">
          🌿 Why choose MindHaven
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-emerald-700 mb-2 sm:mb-3 md:mb-4">
              🧠 AI-Powered Assessments
            </h4>
            <p className="text-slate-600 text-sm sm:text-base md:text-base leading-relaxed">
              Analyze your mental health using intelligent models that detect early signs of depression or stress.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-emerald-700 mb-2 sm:mb-3 md:mb-4">
              📊 Personalized Reports
            </h4>
            <p className="text-slate-600 text-sm sm:text-base md:text-base leading-relaxed">
              Get detailed, confidential feedback on your mental well-being with suggestions for improvement.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-emerald-700 mb-2 sm:mb-3 md:mb-4">
              🌟 Guided Support
            </h4>
            <p className="text-slate-600 text-sm sm:text-base md:text-base leading-relaxed">
              Receive motivational quotes, self-care tips, and guided steps to feel better — anytime, anywhere.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-emerald-700 mb-2 sm:mb-3 md:mb-4">
              🔒 100% Safe & Private
            </h4>
            <p className="text-slate-600 text-sm sm:text-base md:text-base leading-relaxed">
              Your data is never shared. Everything you do here stays completely secure and confidential.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner">
       <button
  onClick={MoveToStart}
  className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 
             hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 
             shadow-xl text-white 
             h-9 w-26 sm:h-12 sm:w-32 md:h-12 md:w-36 lg:h-14 lg:w-36 
             rounded-md 
             text-base sm:text-lg md:text-xl lg:text-2xl 
             font-semibold 
             transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
>
  Start
</button>

<button
  onClick={MoveTOLearn}
  className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 
             hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 
             shadow-xl text-white 
             h-9 w-26 sm:h-12 sm:w-40 md:h-12 md:w-44 lg:h-14 lg:w-48 
             rounded-md 
             text-base sm:text-lg md:text-xl lg:text-2xl 
             font-semibold 
             transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
>
  Learn More
</button>

      </div>
    </>
  );
};

export default Home;