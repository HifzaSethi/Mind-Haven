import React from 'react';

const RiskMeter = ({ level = 3 }) => {
  const segments = 10;
  const radius = 100;
  const center = 140;

  // Ensure level is clamped between 0 and segments
  const clampedLevel = Math.max(0, Math.min(level, segments));

  // Calculate angle for needle (0 degrees = leftmost, 180 degrees = rightmost)
  const angle = (clampedLevel / segments) * 180;

  const getColor = (i) => {
    if (i < 3) return '#22C55E'; // green
    if (i < 7) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const getRiskLabel = () => {
    if (clampedLevel < 4) return 'LOW RISK';
    if (clampedLevel < 7) return 'MEDIUM RISK';
    return 'HIGH RISK';
  };

  return (
    <div className="flex flex-col items-center p-4">
      <svg width="280" height="160" viewBox="0 0 280 160">
        <g transform={`translate(${center},${center})`}>
          {Array.from({ length: segments }).map((_, i) => {
            const startAngle = (i * 180) / segments;
            const endAngle = ((i + 1) * 180) / segments;

            // Convert to radians and adjust for SVG coordinate system
            const startRad = (Math.PI * startAngle) / 180;
            const endRad = (Math.PI * endAngle) / 180;

            const x1 = radius * Math.cos(Math.PI - startRad);
            const y1 = -radius * Math.sin(Math.PI - startRad);
            const x2 = radius * Math.cos(Math.PI - endRad);
            const y2 = -radius * Math.sin(Math.PI - endRad);

            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                stroke={getColor(i)}
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Needle shadow */}
        <g transform={`translate(${center}, ${center}) rotate(${angle - 90})`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={-radius + 10}
            stroke="black"
            strokeWidth="6"
            opacity="0.2"
            strokeLinecap="round"
          />
        </g>

        {/* Main needle */}
        <g transform={`translate(${center}, ${center}) rotate(${angle - 90})`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={-radius + 10}
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Needle base */}
        <circle cx={center} cy={center} r="8" fill="black" />
      </svg>

      <div className="text-xl font-bold mt-4">{getRiskLabel()}</div>
      <div className="text-sm text-gray-600 mt-1">Level: {clampedLevel}/10</div>
    </div>
  );
};

// Demo component to test different levels
const RiskMeterDemo = () => {
  const [level, setLevel] = React.useState(3);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Risk Meter</h1>

        <RiskMeter level={level} />

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Risk Level: {level}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;
