import React from 'react';

const sliderFields = [
  'academicPressure',
  'workPressure',
  'jobSatisfaction',
  'sleepingHours',
  'suicidalThoughts',
  'financialStress',
  'familyMentalIllness',
];

const Step1 = ({ values, handleChange, handleBlur, renderError }) => (
  <>
    <p className="text-base text-green-900 font-medium">
      Kindly rate each item on a scale of 1 (low) to 10 (high).
    </p>
    {sliderFields.map((field) => (
      <div key={field}>
        <label className="block text-green-900 font-semibold mb-1 capitalize">
          {field === 'familyMentalIllness'
            ? 'Family history of mental illness (1 = No, 10 = Yes)'
            : field.replace(/([A-Z])/g, ' $1')}
        </label>
        <div className="bg-white border border-slate-200 rounded-md p-3">
          <input
            type="range"
            min="1"
            max="10"
            name={field}
            value={values[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            className="styled-slider w-full"
            style={{
              '--slider-progress': `${((values[field] - 1) / 9) * 100}%`,
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>1</span>

            <span>10</span>
          </div>
        </div>
        {renderError(field)}
      </div>
    ))}
  </>
);

export default React.memo(Step1);
