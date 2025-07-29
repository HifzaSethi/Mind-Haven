import { useEffect } from 'react';
import useAssessment from '../hooks/useAssessment';
import useForm from '../hooks/useForm';

const Assessment = () => {
  const { submitAnswers, navigateToResult, navigateToCamera } = useAssessment();

  // Initial values for sliders and textareas
  const initialValues = {
    academicPressure: 3,
    workPressure: 3,
    jobSatisfaction: 3,
    sleepingHours: 3,
    suicidalThoughts: 1,
    financialStress: 5,
    emotional: '',
    challenge: '',
    support: '',
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    (formValues) => {
      const userAnswers = [
        Number(formValues.academicPressure),
        Number(formValues.workPressure),
        Number(formValues.jobSatisfaction),
        Number(formValues.sleepingHours),
        Number(formValues.suicidalThoughts),
        Number(formValues.financialStress),
      ];
      submitAnswers(userAnswers);
      navigateToResult();
    }
  );

  // Slider color effect
  useEffect(() => {
    const sliders = document.querySelectorAll('.styled-slider');
    const updateBackground = (slider) => {
      const value =
        ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
      slider.style.background = `linear-gradient(to right, #047857 ${value}%, #d1fae5 ${value}%)`;
    };
    sliders.forEach((slider) => {
      updateBackground(slider);
      slider.addEventListener('input', () => updateBackground(slider));
    });
    return () => {
      sliders.forEach((slider) => {
        slider.removeEventListener('input', () => updateBackground(slider));
      });
    };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner flex flex-col justify-center items-center p-6 border border-emerald-100">
        <h2 className="text-3xl font-bold text-green-900 mb-2">
          Begin Mental Health Check
        </h2>
        <p className="text-sm sm:text-base text-green-700 font-medium text-center">
          Help us understand how you're doing — your honest input leads to
          better care.
        </p>
      </div>

      {/* Form */}
      <form
        className="m-6 p-6 bg-white border border-emerald-200 shadow-[0_2px_10px_rgba(16,185,129,0.1)] rounded-md space-y-6"
        onSubmit={handleSubmit}
      >
        <p className="text-base text-green-900 font-medium">
          Kindly rate each item on a scale of 1 (low) to 10 (high).
        </p>

        {/* Numeric Questions */}
        <div>
          <label className="block text-green-900 font-semibold mb-1">
            Academic Pressure
          </label>
          <div className="bg-white border border-slate-200 rounded-md p-3">
            <input
              type="range"
              min="1"
              max="10"
              name="academicPressure"
              value={values.academicPressure}
              onChange={handleChange}
              className="styled-slider w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-green-900 font-semibold mb-1">
            Work Pressure
          </label>
          <div className="bg-white border border-slate-200 rounded-md p-3">
            <input
              type="range"
              min="1"
              max="10"
              name="workPressure"
              value={values.workPressure}
              onChange={handleChange}
              className="styled-slider w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-green-900 font-semibold mb-1">
            Job Satisfaction
          </label>
          <div className="bg-white border border-slate-200 rounded-md p-3">
            <input
              type="range"
              min="1"
              max="10"
              name="jobSatisfaction"
              value={values.jobSatisfaction}
              onChange={handleChange}
              className="styled-slider w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-green-900 font-semibold mb-1">
            Sleeping Hours
          </label>
          <div className="bg-white border border-slate-200 rounded-md p-3">
            <input
              type="range"
              min="1"
              max="10"
              name="sleepingHours"
              value={values.sleepingHours}
              onChange={handleChange}
              className="styled-slider w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-green-900 font-semibold mb-1">
            Suicidal Thoughts
          </label>
          <div className="bg-white border border-slate-200 rounded-md p-3">
            <input
              type="range"
              min="1"
              max="10"
              name="suicidalThoughts"
              value={values.suicidalThoughts}
              onChange={handleChange}
              className="styled-slider w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-green-900 font-semibold mb-1">
            Financial Stress
          </label>
          <div className="bg-white border border-slate-200 rounded-md p-3">
            <input
              type="range"
              min="1"
              max="10"
              name="financialStress"
              value={values.financialStress}
              onChange={handleChange}
              className="styled-slider w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Emotional Questions */}
        <div className="mt-10 bg-emerald-50 border border-emerald-100 p-5 rounded-lg shadow-sm space-y-5">
          <h3 className="text-xl font-semibold text-emerald-800">
            We’re here to listen
          </h3>
          <p className="text-sm text-green-700">
            This is a safe, judgment-free space. Feel free to share what’s on
            your mind.
          </p>

          <div>
            <label className="block text-green-900 font-medium mb-1">
              How have you been feeling emotionally lately?
            </label>
            <textarea
              name="emotional"
              value={values.emotional}
              onChange={handleChange}
              placeholder="Type your feelings here..."
              className="w-full bg-white border border-slate-300 focus:ring-emerald-300 focus:border-emerald-400 rounded-md text-sm p-3 shadow-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-green-900 font-medium mb-1">
              Is there anything recently that's been really hard for you?
            </label>
            <textarea
              name="challenge"
              value={values.challenge}
              onChange={handleChange}
              placeholder="Describe your current challenges..."
              className="w-full bg-white border border-slate-300 focus:ring-emerald-300 focus:border-emerald-400 rounded-md text-sm p-3 shadow-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-green-900 font-medium mb-1">
              Do you feel supported by the people around you?
            </label>
            <textarea
              name="support"
              value={values.support}
              onChange={handleChange}
              placeholder="Do you feel heard or understood?"
              className="w-full bg-white border border-slate-300 focus:ring-emerald-300 focus:border-emerald-400 rounded-md text-sm p-3 shadow-sm"
              rows={3}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={navigateToCamera}
            className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow"
          >
            Launch Camera
          </button>

          <button
            type="submit"
            className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-lg shadow"
          >
            Submit Assessment
          </button>
        </div>
      </form>
    </>
  );
};

export default Assessment;
