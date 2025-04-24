
import React from 'react';

interface FiberDiagramProps {
  pumpPower: number;
  signalPower: number;
  fiberLength: number;
}

const FiberDiagram: React.FC<FiberDiagramProps> = ({
  pumpPower,
  signalPower,
  fiberLength,
}) => {
  // Calculate amplification factor based on parameters
  const calculateAmplification = (position: number) => {
    // Simple model: amplification increases along fiber as pump power is absorbed
    const normalizedPosition = position / fiberLength;
    const pumpAbsorption = pumpPower * (1 - normalizedPosition);
    return signalPower * (1 + (pumpAbsorption * 0.8));
  };

  // Generate points for signal power along fiber
  const generateSignalPoints = () => {
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const position = (i / segments) * fiberLength;
      const x = (i / segments) * 100; // Percentage of width
      const amplifiedSignal = calculateAmplification(position);
      const normalizedSignal = 10 + (50 * (amplifiedSignal / (signalPower * 3)));
      points.push(`${x},${normalizedSignal}`);
    }
    return points.join(' ');
  };

  // Generate points for pump power along fiber
  const generatePumpPoints = () => {
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const position = fiberLength - ((i / segments) * fiberLength); // Backward pump
      const x = (i / segments) * 100; // Percentage of width (from right to left)
      const remainingPump = pumpPower * (position / fiberLength);
      const normalizedPump = 10 + (50 * (remainingPump / pumpPower));
      points.push(`${x},${normalizedPump}`);
    }
    return points.join(' ');
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-center mb-3">Fiber Amplifier Visualization</h3>
      
      <svg viewBox="0 0 100 80" className="w-full h-60">
        {/* Fiber cladding */}
        <rect x="0" y="30" width="100" height="20" fill="rgb(190, 227, 248)" rx="2" />
        
        {/* Fiber core */}
        <rect x="0" y="35" width="100" height="10" fill="rgb(43, 108, 176)" rx="1" />
        
        {/* Signal path with animation */}
        <g className="signal-path">
          {[...Array(5)].map((_, i) => (
            <circle
              key={`signal-${i}`}
              cx={15 + (i * 15)}
              cy="40"
              r="1.2"
              fill="rgb(72, 187, 120)"
              className="animate-flow-right"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </g>
        
        {/* Pump path with animation */}
        <g className="pump-path">
          {[...Array(5)].map((_, i) => (
            <circle
              key={`pump-${i}`}
              cx={85 - (i * 15)}
              cy="40"
              r="1.5"
              fill="rgb(245, 101, 101)"
              className="animate-flow-left"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </g>
        
        {/* Signal power profile */}
        <polyline
          points={generateSignalPoints()}
          fill="none"
          stroke="rgb(72, 187, 120)"
          strokeWidth="1.5"
        />
        
        {/* Pump power profile */}
        <polyline
          points={generatePumpPoints()}
          fill="none"
          stroke="rgb(245, 101, 101)"
          strokeWidth="1.5"
          strokeDasharray="2,1"
        />
        
        {/* Labels */}
        <text x="2" y="25" fontSize="3" fill="#333">Signal In</text>
        <text x="83" y="25" fontSize="3" fill="#333">Amplified Signal Out</text>
        <text x="83" y="65" fontSize="3" fill="#333">Pump In</text>
        
        {/* Fiber length markers */}
        <line x1="0" y1="55" x2="0" y2="60" stroke="#666" strokeWidth="0.5" />
        <line x1="100" y1="55" x2="100" y2="60" stroke="#666" strokeWidth="0.5" />
        <line x1="0" y1="57.5" x2="100" y2="57.5" stroke="#666" strokeWidth="0.5" />
        <text x="45" y="62" fontSize="2.5" fill="#666" textAnchor="middle">Fiber Length ({fiberLength} m)</text>
      </svg>
      
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <div>
          <span className="inline-block w-3 h-3 bg-fiber-signal rounded-full mr-1"></span>
          Signal
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-fiber-pump rounded-full mr-1"></span>
          Pump
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-fiber-amplified rounded-full mr-1"></span>
          Amplified Signal
        </div>
      </div>
    </div>
  );
};

export default FiberDiagram;
