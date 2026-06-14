const RiskMeter = ({ riskLevel = 'low', className = '' }) => {
  const getRiskConfig = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          progress: 90,
          label: 'High Risk',
          description: 'Immediate medical attention recommended',
        };
      case 'medium':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
          progress: 60,
          label: 'Medium Risk',
          description: 'Monitor symptoms and consult healthcare provider',
        };
      default:
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          progress: 30,
          label: 'Low Risk',
          description: 'Continue regular health monitoring',
        };
    }
  };

  const config = getRiskConfig(riskLevel);

  return (
    <div
      className={`p-6 rounded-lg border-2 ${config.borderColor} ${config.bgColor} ${className}`}
    >
      <div className="text-center mb-4">
        <h3 className={`text-xl font-semibold ${config.color} mb-2`}>
          Risk Assessment
        </h3>
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bgColor}`}
        >
          {config.label}
        </div>
      </div>

      {/* Risk Meter Visual */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>

        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>

          {/* Progress indicator */}
          <div
            className="absolute top-0 left-0 h-full bg-white bg-opacity-40 transition-all duration-500"
            style={{ width: `${100 - config.progress}%` }}
          ></div>

          {/* Current level marker */}
          <div
            className={`absolute top-0 h-full w-1 bg-gray-800 transition-all duration-500`}
            style={{ left: `${config.progress}%` }}
          ></div>
        </div>

        <div className="flex justify-center mt-2">
          <div
            className={`text-2xl font-bold ${config.color} transition-all duration-500`}
          >
            {config.progress}%
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 text-center">{config.description}</p>

      {/* Risk Level Indicator */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div
          className={`text-center p-2 rounded ${riskLevel === 'low' ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-500'}`}
        >
          Low
        </div>
        <div
          className={`text-center p-2 rounded ${riskLevel === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}
        >
          Medium
        </div>
        <div
          className={`text-center p-2 rounded ${riskLevel === 'high' ? 'bg-red-200 text-red-800' : 'bg-gray-100 text-gray-500'}`}
        >
          High
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;
