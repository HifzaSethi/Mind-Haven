import React, { lazy, Suspense, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import useNavigation from '../hooks/useNavigation';
import { motion } from 'framer-motion';
import { FaBrain, FaHeartbeat, FaSmile } from 'react-icons/fa';
const RiskMeter = lazy(() => import('./RiskMeter'));

const safeArray = (data) => (Array.isArray(data) ? data : []);
const safeString = (data) => (typeof data === 'string' ? data : '');

const Result = () => {
  const {
    formValues,
    userName = 'Friend',
    showResult,
    setShowResult,
  } = useAppContext();

  const { goToGuidance, goToAssessment } = useNavigation();

  // const probability = useMemo(() => {
  //   return Number(formValues?.final_score ?? 0);
  // }, [formValues]);
  const probability = useMemo(() => {
    const value = formValues?.final_score;

    if (typeof value === 'number') return value;
    if (typeof value === 'string') return Number(value);

    return 0;
  }, [formValues]);
  const causes = useMemo(() => {
    return safeArray(formValues?.main_causes);
  }, [formValues]);

  const handleViewResult = () => {
    if (typeof setShowResult === 'function') {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  // const fallbackMessage = useMemo(() => {
  //   const messages = [
  //     "Even small things matter — you're trying, and that counts more than you think.",
  //     "You're still showing strength, even if it's not obvious right now.",
  //     "The fact you're here means you're not giving up.",
  //     "Progress isn't always loud — sometimes it's just showing up.",
  //     "You're doing better than you feel right now.",
  //   ];
  //   return messages[Math.floor(Math.random() * messages.length)];
  // }, []);

  if (!showResult) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-bold text-green-800">
          Assessment Completed
        </h1>

        <p className="mt-2 text-green-600">Your results are ready to view.</p>

        <button
          onClick={handleViewResult}
          className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl"
        >
          View Results
        </button>

        <p
          onClick={goToAssessment}
          className="mt-4 text-sm text-emerald-700 underline cursor-pointer"
        >
          Go back
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      {/* HEADER */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-green-900">
          Your Mental Health Report
        </h1>
        <p className="text-green-600 mt-2">
          Informational analysis, not a medical diagnosis
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-emerald-100 mb-8"
      >
        <div className="flex items-center justify-center gap-4">
          <FaBrain className="text-5xl text-emerald-600" />

          <div>
            <h1 className="text-4xl font-bold text-emerald-900">
              Mental Wellness Analysis
            </h1>

            <p className="text-slate-600 mt-2">
              AI-powered emotional and behavioral insights
            </p>
          </div>
        </div>
      </motion.div>
      {/* RISK SECTION */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-semibold text-center text-green-700 mb-4">
          Risk Level
        </h2>

        <Suspense fallback={<div>Loading...</div>}>
          {typeof probability === 'number' && !isNaN(probability) ? (
            <RiskMeter probability={probability} />
          ) : (
            <div>Invalid risk data</div>
          )}
        </Suspense>

        <p className="text-center mt-4 text-gray-600">
          Score: {probability.toFixed(2)}%
        </p>
      </div>

      {/* ANALYSIS GRID */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-6 space-y-6"
      >
        {/* Emotion */}
        <Section title="Emotion Detected" color="blue">
          {safeString(formValues?.emotion_detected)}
        </Section>

        {/* Text Analysis */}
        <Section title="Text Analysis" color="purple">
          {safeString(formValues?.text_analysis)}
        </Section>
      </motion.div>
      <Section title="Main Cause" color="green">
        {safeArray(formValues?.main_causes).length > 0
          ? formValues.main_causes.join(', ')
          : 'No major cause detected'}
      </Section>
      <Section title="Primary Cause" color="green">
        {safeString(formValues?.primary_cause || '') ||
          'No clear dominant cause identified'}
      </Section>

      <Section title="Positive Signs" color="blue">
        {safeArray(formValues?.positive_signs).length > 0 ? (
          <ul className="space-y-2">
            {formValues.positive_signs.map((item, index) => (
              <li
                key={index}
                className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg"
              >
                ✅ {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">
            No strong positive indicators detected.
          </div>
        )}
      </Section>
      <Section title="Consistency Insight" color="purple">
        {formValues?.consistency_check === 'Emotional Conflict'
          ? formValues?.consistency_message
          : 'No mismatch detected'}
      </Section>

      <Section title="Support Message" color="yellow">
        {safeString(formValues?.message)}
      </Section>
      {/* BUTTON */}
      <div className="flex justify-center mt-8">
        <button
          onClick={goToGuidance}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow"
        >
          Get Guidance
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, color, children }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-sm">{children}</div>
    </div>
  );
};

export default Result;
