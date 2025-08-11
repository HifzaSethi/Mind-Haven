// import React from 'react';

// const textareaFields = ['emotional', 'challenge', 'support'];

// const Step2 = ({
//   values,
//   errors,
//   touched,
//   handleChange,
//   handleBlur,
//   renderError,
// }) => (
//   <div className="mt-10 bg-emerald-50 border border-emerald-100 p-5 rounded-lg shadow-sm space-y-5">
//     <h3 className="text-xl font-semibold text-emerald-800">
//       We’re here to listen
//     </h3>
//     <p className="text-sm text-green-700">
//       This is a safe, judgment-free space. Feel free to share what’s on your
//       mind.
//     </p>
//     {textareaFields.map((field) => (
//       <div key={field}>
//         <label className="block text-green-900 font-medium mb-1 capitalize">
//           {field === 'emotional'
//             ? 'How have you been feeling emotionally lately?'
//             : field === 'challenge'
//               ? "Is there anything recently that's been really hard for you?"
//               : 'Do you feel supported by the people around you?'}
//         </label>
//         <textarea
//           name={field}
//           value={values[field]}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           placeholder="Type here..."
//           className="w-full bg-white border border-slate-300 focus:ring-emerald-300 focus:border-emerald-400 rounded-md text-sm p-3 shadow-sm"
//           rows={3}
//         />
//         {renderError(field)}
//       </div>
//     ))}
//   </div>
// );

// export default React.memo(Step2);
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
            ? 'How have you been feeling emotionally lately?'
            : field === 'challenge'
              ? "Is there anything recently that's been really hard for you?"
              : 'Do you feel supported by the people around you?'}
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
