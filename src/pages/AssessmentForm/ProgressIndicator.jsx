import React from 'react';

const ProgressIndicator = ({ step, totalSteps }) => (
  <div className="flex items-center justify-center mb-6">
    {[...Array(totalSteps)].map((_, idx) => (
      <div
        key={idx}
        className={`h-2 w-10 mx-1 rounded-full ${idx < step ? 'bg-emerald-600' : 'bg-emerald-200'}`}
      />
    ))}
  </div>
);

export default React.memo(ProgressIndicator);
