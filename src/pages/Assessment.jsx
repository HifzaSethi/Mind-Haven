import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import AssessmentSchema from '../schemas/AssessmentSchema';

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
  emotional: '',
  challenge: '',
  support: '',
  photo: '', // Add photo to initial state
};

const steps = [Step1, Step2, Step3];

const Assessment = () => {
  const { navigateToResult } = useAppContext();
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
    onSubmit: (submittedValues) => {
      // Get the current photo state
      const currentPhoto = photo || submittedValues.photo;

      if (!currentPhoto) {
        formik.setFieldError('photo', 'Photo is required');
        return;
      }

      const allData = { ...submittedValues, photo: currentPhoto };

      console.log('=== SUBMITTED ASSESSMENT DATA ===');
      console.log('Form Values:', submittedValues);
      console.log(
        'Photo Status:',
        currentPhoto ? 'Photo captured ✓' : 'No photo ✗'
      );
      console.log(
        'Photo Data Length:',
        currentPhoto ? currentPhoto.length + ' characters' : 'No photo'
      );

      // Display photo directly in console
      if (currentPhoto) {
        console.log('📸 CAPTURED PHOTO:');
        console.log(
          'To view photo: Copy the data URL below and paste in browser address bar'
        );
        console.log('Photo Data URL:', currentPhoto);

        // Create a temporary image element to display in console
        const img = new Image();
        img.onload = () => {
          console.log('✅ Photo loaded successfully');
          console.log(
            '📏 Photo dimensions:',
            img.width + 'x' + img.height + 'px'
          );
        };
        img.src = currentPhoto;

        // Log the image object (some browsers show preview)
        console.log('🖼️ Photo Image Object:', img);
      }

      console.log('Complete Data:', allData);
      console.log('================================');

      // Safely update context
      try {
        setFormValues(allData);
      } catch (error) {
        console.log('Context update skipped:', error.message);
      }

      // Save form data but NOT photo to localStorage
      const dataToSave = { ...allData };
      delete dataToSave.photo; // Remove photo from localStorage
      localStorage.setItem('assessmentForm', JSON.stringify(dataToSave));

      // Don't save photo to localStorage
      // localStorage.setItem('assessmentPhoto', currentPhoto);

      navigateToResult();
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
