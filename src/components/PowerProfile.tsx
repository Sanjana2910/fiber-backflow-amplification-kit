
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface PowerProfileProps {
  pumpPower: number;
  signalPower: number;
  fiberLength: number;
  absorptionCoeff: number;
  gainCoeff: number;
}

const PowerProfile: React.FC<PowerProfileProps> = ({
  pumpPower,
  signalPower,
  fiberLength,
  absorptionCoeff,
  gainCoeff,
}) => {
  // Create data points for the power profile chart
  const generateProfileData = () => {
    const data = [];
    const steps = 20;
    
    for (let i = 0; i <= steps; i++) {
      const position = (i / steps) * fiberLength;
      const normalizedPos = position / fiberLength;
      
      // Backward pump model: pump starts at position=fiberLength
      const pumpRemainingPower = pumpPower * Math.exp(-absorptionCoeff * (fiberLength - position));
      
      // Signal amplification model using remaining pump power
      // Signal grows exponentially based on pump power at each position
      const signalGain = Math.exp(gainCoeff * pumpRemainingPower * position / fiberLength);
      const amplifiedSignal = signalPower * signalGain;
      
      data.push({
        position: parseFloat(position.toFixed(1)),
        signal: parseFloat(amplifiedSignal.toFixed(2)),
        pump: parseFloat(pumpRemainingPower.toFixed(2)),
      });
    }
    
    return data;
  };
  
  const profileData = generateProfileData();
  const maxSignal = Math.max(...profileData.map(d => d.signal));
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Power Profile Along Fiber</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={profileData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="position" 
                label={{ value: 'Position (m)', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis 
                yAxisId="left" 
                domain={[0, Math.max(signalPower * 2.5, maxSignal)]}
                label={{ value: 'Signal Power (mW)', angle: -90, position: 'insideLeft' }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, pumpPower * 1.2]}
                label={{ value: 'Pump Power (mW)', angle: 90, position: 'insideRight' }} 
              />
              <Tooltip formatter={(value) => [`${value} mW`]} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="signal" 
                stroke="#48bb78" 
                name="Signal Power" 
                strokeWidth={2} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="pump" 
                stroke="#f56565" 
                name="Pump Power" 
                strokeWidth={2} 
                strokeDasharray="5 3" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerProfile;
