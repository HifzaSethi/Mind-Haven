import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import AssessmentSchema from '../schemas/AssessmentSchema';
import axios from 'axios';
import { useAppContext } from './../context/AppContext';
import ProgressIndicator from '../pages/AssessmentForm/ProgressIndicator';
import { lazy, Suspense } from 'react';

const Step1 = lazy(() => import('../pages/AssessmentForm/Step1'));
const Step2 = lazy(() => import('../pages/AssessmentForm/Step2'));
const Step3 = lazy(() => import('../pages/AssessmentForm/Step3'));

const initialFormState = {
  academicPressure: '',
  workPressure: '',
  jobSatisfaction: '',
  sleepingHours: '',
  suicidalThoughts: '',
  financialStress: '',
  family_mental_illness: '',
  emotional: '',
  challenge: '',
  support: '',
  photo: '', // Add photo to initial state
};

const steps = [Step1, Step2, Step3];

const Assessment = () => {
  const { navigateToResult, setUserRiskLevel } = useAppContext();
  const { formValues, setFormValues } = useAppContext();
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState(''); // Always start fresh

  const formik = useFormik({
    initialValues: {
      ...initialFormState,
      ...formValues,
      photo: '', // Always start with empty photo for new assessment
    },
    validationSchema: AssessmentSchema,
    onSubmit: async (values) => {
      try {
        const currentPhoto = photo || values.photo;

        if (!currentPhoto) {
          formik.setFieldError('photo', 'Photo is required');
          return;
        }

        // ✅ Combine text safely
        const combinedText = [
          values.emotional,
          values.challenge,
          values.support,
        ]
          .filter(Boolean)
          .join(' ');

        // ✅ Prepare FormData
        const formData = new FormData();

        formData.append('image', currentPhoto);
        formData.append('text', combinedText);

        // Required
        formData.append('age', 22);
        formData.append('gender', 'male');

        formData.append('academic_pressure', values.academicPressure);
        formData.append('work_pressure', values.workPressure);
        formData.append('job_satisfaction', values.jobSatisfaction);
        formData.append('sleeping_hours', values.sleepingHours);
        formData.append('financial_stress', values.financialStress);
        formData.append('suicidal_thoughts', values.suicidalThoughts);
        formData.append('family_mental_illness', values.familyMentalIllness);
        // Extra required (Flask needs these)
        formData.append('academic_performance', 5);
        formData.append('study_satisfaction', 5);
        formData.append('dietary_habits', 5);
        formData.append('work_study_hours', 5);
        // formData.append('family_mental_illness', 0);

        // ✅ CALL NODE BACKEND (NOT FLASK DIRECTLY)
      
        const response = await axios.post(
          'http://localhost:5000/api/full-analysis',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log('Backend Response:', response.data);

        // ✅ STORE CLEAN DATA FOR RESULT PAGE
        setFormValues({
          final_score: response.data.final_score,
          risk_level: response.data.risk_level,
          emotion_detected: response.data.emotion_detected,
          text_analysis: response.data.text_analysis,
          main_causes: response.data.main_causes,
          message: response.data.message,
          consistency_check: response.data.consistency_check,
          consistency_message: response.data.consistency_message,
          primary_cause: response.data.primary_cause,
          positive_signs: response.data.positive_signs,
           lastAssessmentDate: Date.now(),
        });
        localStorage.setItem(
  'lastAssessmentDate',
  Date.now().toString()
);
        // ✅ SET RISK LEVEL
        setUserRiskLevel(response.data.risk_level);

        // ✅ NAVIGATE
        navigateToResult();
      } catch (error) {
        console.error('Submission Error:', error);
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  // Extract setFieldValue to avoid formik dependency
  const setFieldValue = formik.setFieldValue;
  const formikValues = formik.values;

  // Update photo in formik when photo state changes
  useEffect(() => {
    if (photo) {
      setFieldValue('photo', photo);
    }
  }, [photo, setFieldValue]);

  // Auto-save values to localStorage (but never save photo)
  useEffect(() => {
    const dataToSave = { ...formikValues };
    delete dataToSave.photo; // Never save photo to localStorage
    localStorage.setItem('assessmentForm', JSON.stringify(dataToSave));
  }, [formikValues]);

  // Reset assessment when component mounts
  useEffect(() => {
    // Clear previous assessment data
    setPhoto('');
    setFieldValue('photo', '');
    setStep(0);

    // Optionally clear localStorage if you want fresh start every time
    // localStorage.removeItem('assessmentPhoto');
    // localStorage.removeItem('assessmentForm');
  }, [setFieldValue]); // Run only on mount with setFieldValue dependency

  // Update slider background color
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
  }, [step]);

  const renderError = useCallback(
    (field) =>
      formik.touched[field] && formik.errors[field] ? (
        <p className="text-sm text-red-600 mt-1">{formik.errors[field]}</p>
      ) : null,
    [formik.touched, formik.errors]
  );

  const CurrentStep = steps[step];

  const handleNext = useCallback(async () => {
    let fieldsToValidate = [];
    if (step === 0) {
      fieldsToValidate = [
        'academicPressure',
        'workPressure',
        'jobSatisfaction',
        'sleepingHours',
        'suicidalThoughts',
        'financialStress',
      ];
    } else if (step === 1) {
      fieldsToValidate = ['emotional', 'challenge', 'support'];
    }

    await formik.setTouched(
      fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      true
    );

    const errors = await formik.validateForm();
    const hasError = fieldsToValidate.some((field) => errors[field]);

    if (!hasError) setStep((s) => s + 1);
  }, [step, formik]);

  const handleBack = useCallback(() => setStep((s) => s - 1), []);

  const resetAssessment = () => {
    // Reset all states
    setStep(0);
    setPhoto('');

    // Reset formik
    formik.resetForm({ values: initialFormState });

    // Clear localStorage
    localStorage.removeItem('assessmentPhoto');
    localStorage.removeItem('assessmentForm');

    // Clear context
    if (setFormValues) {
      try {
        setFormValues({});
      } catch (error) {
        console.log('Context reset skipped:', error.message);
      }
    }

    console.log('Assessment reset successfully!');
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner flex flex-col justify-center items-center p-6 border border-emerald-100">
        <div className="flex justify-between items-center w-full max-w-4xl">
          <div className="flex-1 text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              Begin Mental Health Check
            </h2>
            <p className="text-sm sm:text-base text-green-700 font-medium">
              Help us understand how you're doing — your honest input leads to
              better care.
            </p>
          </div>
          <button
            onClick={resetAssessment}
            className="ml-4 px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-lg border border-red-200"
            type="button"
          >
            Reset Assessment
          </button>
        </div>
      </div>

      <ProgressIndicator step={step + 1} totalSteps={steps.length} />

      <form
        className="m-6 p-6 bg-white border border-emerald-200 shadow rounded-md space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <Suspense fallback={<div>Loading step...</div>}>
          <CurrentStep
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            renderError={renderError}
            photo={photo}
            setPhoto={setPhoto}
            onSubmit={formik.handleSubmit}
            formik={formik}
          />
        </Suspense>
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-lg shadow"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-lg shadow"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-lg shadow"
            >
              Submit Assessment
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Assessment;
