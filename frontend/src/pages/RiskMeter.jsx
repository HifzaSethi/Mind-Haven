// const RiskMeter = ({ riskLevel = 'low', probability = 30, className = '' }) => {
//   const getRiskConfig = (level) => {
//     switch (level.toLowerCase()) {
//       case 'high':
//         return {
//           color: 'text-red-600',
//           bgColor: 'bg-red-100',
//           borderColor: 'border-red-200',
//           progress: 90,
//           label: 'High Risk',
//           description: 'Immediate medical attention recommended',
//         };

//       case 'medium':
//         return {
//           color: 'text-yellow-600',
//           bgColor: 'bg-yellow-100',
//           borderColor: 'border-yellow-200',
//           progress: 60,
//           label: 'Medium Risk',
//           description: 'Monitor symptoms and consult healthcare provider',
//         };

//       default:
//         return {
//           color: 'text-green-600',
//           bgColor: 'bg-green-100',
//           borderColor: 'border-green-200',
//           progress: probability || 30,
//           label: 'Low Risk',
//           description: 'Continue regular health monitoring',
//         };
//     }
//   };

//   const config = getRiskConfig(riskLevel);

//   return (
//     <div
//       className={`p-6 rounded-lg border-2 ${config.borderColor} ${config.bgColor} ${className}`}
//     >
//       <div className="text-center mb-4">
//         <h3 className={`text-xl font-semibold ${config.color} mb-2`}>
//           Risk Assessment
//         </h3>
//         <div
//           className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bgColor}`}
//         >
//           {config.label}
//         </div>
//       </div>

//       <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>

//         <div
//           className="absolute top-0 left-0 h-full bg-white bg-opacity-40 transition-all duration-500"
//           style={{ width: `${100 - config.progress}%` }}
//         ></div>

//         <div
//           className="absolute top-0 h-full w-1 bg-gray-800"
//           style={{ left: `${config.progress}%` }}
//         ></div>
//       </div>

//       <div className="flex justify-center mt-2">
//         <div className={`text-2xl font-bold ${config.color}`}>
//           {config.progress}%
//         </div>
//       </div>

//       <p className="text-sm text-gray-600 text-center mt-2">
//         {config.description}
//       </p>
//     </div>
//   );
// };

// export default RiskMeter;
// const RiskMeter = ({ probability = 0 }) => {
//   return (
//     <div className="p-6 border rounded-lg text-center">
//       <h3>Risk Score</h3>

//       <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
//         <div
//           className="bg-green-500 h-3 rounded-full"
//           style={{ width: `${probability}%` }}
//         />
//       </div>

//       <p className="mt-2 font-bold">{probability}%</p>
//     </div>
//   );
// };
const RiskMeter = ({ probability = 0 }) => {
  const safeValue = Number(probability) || 0;

  let color = 'green';

  if (safeValue > 70) color = 'red';
  else if (safeValue > 40) color = 'yellow';
  else color = 'green';

  const colorMap = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-500',
  };

  return (
    <div className="p-6 rounded-lg border text-center bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Risk Score</h3>

      {/* Background bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${colorMap[color]}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-3 font-bold text-gray-800">{safeValue.toFixed(1)}%</p>
    </div>
  );
};

export default RiskMeter;
