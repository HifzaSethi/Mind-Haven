import { useAppContext } from '../context/useAppContext';
const LearnMore = () => {
  const { learnMoreClicked } = useAppContext();
  return (
    <div className="px-4 py-8 sm:px-6 md:p-12 lg:p-16 bg-gradient-to-br from-blue-50 to-emerald-50 min-h-screen text-emerald-900">
      {learnMoreClicked && (
        <div className="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-900 p-4 rounded mb-6 font-medium">
          Thanks for clicking “Learn More” on the home page! 💡 Here's how our
          system works:
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-emerald-700 mb-10 sm:mb-12">
        🔹 How the System Works
      </h2>

      {/* Step Cards Container */}
      <div className="space-y-8 sm:space-y-10 md:space-y-12 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-400 transition hover:shadow-xl">
          <h4 className="text-xl sm:text-2xl font-semibold mb-3">
            🧾 Step 1: Create Your Account
          </h4>
          <p className="text-base sm:text-lg leading-relaxed font-light">
            Start by signing up or logging in to create a secure profile. You’ll
            provide basic information and add a trusted contact — someone who
            gets alerts in critical mental health situations.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-400 transition hover:shadow-xl">
          <h4 className="text-xl sm:text-2xl font-semibold mb-3">
            📝 Step 2: Complete the Mental Health Assessment
          </h4>
          <p className="text-base sm:text-lg leading-relaxed font-light">
            You’ll complete a short and meaningful questionnaire about stress,
            lifestyle, and emotional well-being — helping us understand your
            current mental state.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-400 transition hover:shadow-xl">
          <h4 className="text-xl sm:text-2xl font-semibold mb-3">
            📸 Step 3: Facial Emotion Detection
          </h4>
          <p className="text-base sm:text-lg leading-relaxed font-light">
            You’ll take a quick image. Our AI analyzes your facial expressions
            to detect signs of emotional stress or depression.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-400 transition hover:shadow-xl">
          <h4 className="text-xl sm:text-2xl font-semibold mb-3">
            📊 Step 4: Get Results and Guidance
          </h4>
          <p className="text-base sm:text-lg leading-relaxed font-light">
            A personalized mental health report is generated and shared with you
            and your trusted contact. You'll also receive tailored wellness
            suggestions.
          </p>
        </div>

        {/* Step 5 */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-400 transition hover:shadow-xl">
          <h4 className="text-xl sm:text-2xl font-semibold mb-3">
            🔁 Step 5: Weekly Monitoring & Reminders
          </h4>
          <p className="text-base sm:text-lg leading-relaxed font-light">
            To keep you supported, we recommend weekly check-ins. Automated
            reminders help you stay consistent with your mental well-being
            journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
