
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AmplifierStatsProps {
  pumpPower: number;
  signalPower: number;
  fiberLength: number;
  absorptionCoeff: number;
  gainCoeff: number;
}

const AmplifierStats: React.FC<AmplifierStatsProps> = ({
  pumpPower,
  signalPower,
  fiberLength,
  absorptionCoeff,
  gainCoeff,
}) => {
  // Calculate amplifier performance metrics
  const calculateStats = () => {
    // Simple model for backward pumping fiber amplifier
    
    // Estimate total pump absorption
    const pumpAbsorption = 1 - Math.exp(-absorptionCoeff * fiberLength);
    
    // Calculate effective pump power contributing to gain
    const effectivePump = pumpPower * pumpAbsorption;
    
    // Estimate small signal gain
    const smallSignalGain = Math.exp(gainCoeff * effectivePump);
    
    // Calculate expected output power (simple model)
    const outputSignal = signalPower * smallSignalGain;
    
    // Calculate gain in dB
    const gainInDB = 10 * Math.log10(outputSignal / signalPower);
    
    // Estimate pump efficiency
    const pumpEfficiency = (outputSignal - signalPower) / (pumpPower * pumpAbsorption) * 100;
    
    // Estimate noise figure (simplified model)
    // In a real amplifier, this would depend on many factors
    const noiseFigure = 3 + 2 * (1 / Math.min(10, smallSignalGain));
    
    return {
      outputSignal: outputSignal.toFixed(2),
      gainInDB: gainInDB.toFixed(1),
      pumpAbsorption: (pumpAbsorption * 100).toFixed(1),
      pumpEfficiency: pumpEfficiency.toFixed(1),
      noiseFigure: noiseFigure.toFixed(1)
    };
  };
  
  const stats = calculateStats();
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Output Signal</p>
            <p className="text-2xl font-bold">{stats.outputSignal} <span className="text-sm font-normal">mW</span></p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Gain</p>
            <p className="text-2xl font-bold">{stats.gainInDB} <span className="text-sm font-normal">dB</span></p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pump Absorption</p>
            <p className="text-2xl font-bold">{stats.pumpAbsorption} <span className="text-sm font-normal">%</span></p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pump Efficiency</p>
            <p className="text-2xl font-bold">{stats.pumpEfficiency} <span className="text-sm font-normal">%</span></p>
          </div>
          
          <div className="space-y-1 col-span-2">
            <p className="text-sm text-muted-foreground">Noise Figure (estimated)</p>
            <p className="text-2xl font-bold">{stats.noiseFigure} <span className="text-sm font-normal">dB</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmplifierStats;
