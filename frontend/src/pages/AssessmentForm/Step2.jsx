import React from 'react';

const textareaFields = ['emotional', 'challenge', 'support'];

const Step2 = ({ values, handleChange, handleBlur, renderError }) => (
  <div className="mt-10 bg-emerald-50 border border-emerald-100 p-5 rounded-lg shadow-sm space-y-5">
    <h3 className="text-xl font-semibold text-emerald-800">
      We're here to listen
    </h3>
    <p className="text-sm text-green-700">
      This is a safe, judgment-free space. Feel free to share what's on your
      mind.
    </p>
    {textareaFields.map((field) => (
      <div key={field}>
        <label className="block text-green-900 font-medium mb-1 capitalize">
          {field === 'emotional'
            ? 'Describe your emotions in a few words'
            : field === 'challenge'
              ? 'What challenges are you currently facing?'
              : 'How supported do you feel by people around you?'}
        </label>
        <textarea
          name={field}
          value={values[field]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Type here..."
          className="w-full bg-white border border-slate-300 focus:ring-emerald-300 focus:border-emerald-400 rounded-md text-sm p-3 shadow-sm"
          rows={3}
        />
        {renderError(field)}
      </div>
    ))}
  </div>
);

export default React.memo(Step2);
