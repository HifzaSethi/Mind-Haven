import React, { lazy, Suspense } from 'react';
import { useAppContext } from '../context/AppContext';
import useNavigation from '../hooks/useNavigation';
const RiskMeter = lazy(() => import('./RiskMeter'));
const Result = () => {
  const {
    userRiskLevel,
    showResult,
    setShowResult,
    userName = 'Friend',
  } = useAppContext();
  const { goToGuidance, goToAssessment } = useNavigation();
  const handleViewResult = () => {
    console.log('handleViewResult called, setShowResult:', setShowResult); // Debug log
    if (typeof setShowResult === 'function') {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error('setShowResult is not a function:', setShowResult);
    }
  };
  // Debug log to check what we're getting from context
  console.log('Context values:', {
    userRiskLevel,
    showResult,
    setShowResult,
    userName,
  });
  return (
    <>
      {!showResult ? (
        <>
          <div className="bg-green-100 shadow-inner flex flex-col items-center p-5 text-center">
            <h2 className="text-3xl font-bold text-green-900">
              Assessment Complete
            </h2>
            <p className="text-base text-green-700 font-medium mt-1">
              Thank you for taking the time to share with us.
            </p>

            {/* Go Back Link */}
            <p
              onClick={goToAssessment}
              className="mt-6 text-emerald-600 underline cursor-pointer hover:text-emerald-700"
            >
              ← Go Back to Assessment
            </p>

            <div className="mx-4 sm:mx-auto max-w-3xl p-6 sm:p-8 my-6 sm:my-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200 shadow-lg rounded-3xl">
              <div className="text-center space-y-6">
                <div className="relative w-full">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 right-1/3 sm:right-1/2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-yellow-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl sm:text-3xl font-bold text-emerald-800 leading-tight">
                    You're Brave for Being Here
                  </h4>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto"></div>
                  <p className="text-base sm:text-lg text-emerald-700 font-medium max-w-2xl mx-auto leading-relaxed">
                    Taking this assessment shows incredible strength and
                    self-awareness...
                  </p>
                  <p className="text-base sm:text-lg text-emerald-700 font-medium max-w-2xl mx-auto leading-relaxed">
                    Remember: you are resilient, you are valuable, and you are
                    never alone...
                  </p>
                </div>
              </div>
            </div>

            {/* Important Disclaimer */}
            <div className="mx-4 sm:mx-auto max-w-3xl p-6 sm:p-8 my-6 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-l-4 border-yellow-400 shadow-lg rounded-r-3xl">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-xl sm:text-2xl font-bold text-amber-800">
                    Important: Please Read Before Viewing Results
                  </h4>
                  {/* Sections */}
                  <div className="grid gap-4">
                    {/* Box 1 */}
                    <div className="flex items-start gap-3 p-4 bg-white bg-opacity-60 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-800">
                          This is NOT a medical diagnosis
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          This assessment is a general wellness tool...
                        </p>
                      </div>
                    </div>
                    {/* Box 2 */}
                    <div className="flex items-start gap-3 p-4 bg-white bg-opacity-60 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-800">
                          Results are informational only
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          They reflect patterns in your responses today...
                        </p>
                      </div>
                    </div>
                    {/* Box 3 */}
                    <div className="flex items-start gap-3 p-4 bg-white bg-opacity-60 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-amber-800">
                          Always consult healthcare professionals
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          Please speak with a qualified doctor or therapist.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Encouragement Before Results */}
            <div className="mx-4 sm:mx-auto max-w-3xl p-5 sm:p-6 my-6 bg-green-50 border border-green-200 shadow-sm rounded-xl text-center space-y-3">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700">
                🌱 Before We Show Your Results...
              </h4>
              <p className="text-sm sm:text-base text-green-700 font-medium">
                Mental health exists on a spectrum...
              </p>
              <p className="text-sm sm:text-base text-green-700 font-medium">
                You're not defined by a result...
              </p>
              <p className="text-sm sm:text-base text-green-700 font-medium">
                You've already taken a brave first step.
              </p>
            </div>

            {/* Crisis Resources */}
            <div className="mx-4 sm:mx-auto max-w-3xl p-5 sm:p-6 my-6 bg-red-50 border-l-4 border-red-400 shadow-sm rounded-r-xl">
              <h4 className="text-base sm:text-lg font-semibold text-red-700 mb-3">
                🆘 If You're in Crisis - Help is Available 24/7
              </h4>
              <div className="text-sm sm:text-base text-red-700 space-y-2">
                <p>
                  <strong>National Suicide Prevention Lifeline:</strong> 988 or
                  1-800-273-8255
                </p>
                <p>
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </p>
                <p>
                  <strong>Emergency Services:</strong> Call 911 if you're in
                  immediate danger
                </p>
              </div>
            </div>

            {/* View Result Button */}
            <button
              onClick={handleViewResult}
              className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition duration-200"
            >
              I Understand - View My Results
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div className="bg-green-100 shadow-inner flex flex-col items-center p-5">
            <h2 className="text-3xl font-bold text-green-900">
              Your Assessment Results
            </h2>
            <p className="text-base text-green-700 font-medium mt-1 text-center">
              Remember: This is informational guidance, not a medical diagnosis.
            </p>
          </div>

          {/* Encouragement */}
          <div className="mx-auto max-w-3xl p-6 my-8 bg-white border border-emerald-200 shadow-md rounded-2xl text-center space-y-4">
            <h4 className="text-2xl font-semibold text-emerald-700">
              Well done, {userName}!
            </h4>
            <p className="text-green-700 font-medium">
              Mental health matters. Thank you for checking in with yourself.
            </p>
            <p className="text-green-700 font-medium">
              This isn't a diagnosis — just a reflection of today. You're never
              alone.
            </p>
          </div>

          {/* Risk Meter */}
          <div className="mx-auto max-w-3xl p-6 my-6 bg-blue-50 border border-emerald-200 shadow-sm rounded-xl text-center">
            <h4 className="text-2xl font-semibold text-emerald-700 mb-4">
              Your Current Mental Health Risk Level
            </h4>
            <Suspense fallback={<div>Loading meter...</div>}>
              <RiskMeter level={userRiskLevel} />
            </Suspense>

            {/* Placeholder for cause */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-xl font-semibold text-green-700 mb-2">
                Main Cause or Issue
              </h4>
              <p className="text-green-600 font-medium">
                (Add backend-generated cause or placeholder)
              </p>
            </div>
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">
                💡 This result reflects today's pattern. It may change — support
                is always available.
              </p>
            </div>
          </div>

          {/* Reflection Quote */}
          <div className="mx-auto max-w-3xl my-6 space-y-4">
            <div className="p-5 bg-white border border-emerald-100 shadow-sm rounded-xl">
              <p className="italic text-green-800 text-center text-lg">
                "You don't have to control your thoughts. You just have to stop
                letting them control you."
              </p>
              <p className="text-sm text-emerald-600 text-center mt-2">
                — Dan Millman
              </p>
            </div>

            <div className="p-5 bg-white border border-emerald-100 rounded-xl shadow-sm space-y-2">
              <h4 className="text-lg font-semibold text-emerald-700">
                🌿 A Thought to Reflect On:
              </h4>
              <p className="text-green-700 text-sm">
                What has been weighing on your mind lately?
              </p>
              <p className="text-green-700 text-sm">
                What small action could ease that burden today?
              </p>
            </div>
          </div>

          {/* Guidance Button */}
          <div className="flex justify-center my-8">
            <button
              onClick={goToGuidance}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition duration-200"
            >
              Get Personalized Guidance
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(Result);
