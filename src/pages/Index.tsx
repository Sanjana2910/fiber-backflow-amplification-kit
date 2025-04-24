
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FiberDiagram from "@/components/FiberDiagram";
import PowerProfile from "@/components/PowerProfile";
import AmplifierParameters from "@/components/AmplifierParameters";
import AmplifierStats from "@/components/AmplifierStats";

const Index = () => {
  // State for amplifier parameters
  const [pumpPower, setPumpPower] = useState<number>(200); // mW
  const [signalPower, setSignalPower] = useState<number>(1.0); // mW
  const [fiberLength, setFiberLength] = useState<number>(10); // meters
  const [absorptionCoeff, setAbsorptionCoeff] = useState<number>(0.15); // absorption coefficient
  const [gainCoeff, setGainCoeff] = useState<number>(0.05); // gain coefficient

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Fiber Amplifier Backward-Pumping Model
          </h1>
          <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
            Interactive simulation of a backward-pumped optical fiber amplifier, demonstrating how counter-propagating pump light amplifies the signal.
          </p>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left section - Parameters & Stats */}
          <div className="space-y-6">
            <AmplifierParameters
              pumpPower={pumpPower}
              setPumpPower={setPumpPower}
              signalPower={signalPower}
              setSignalPower={setSignalPower}
              fiberLength={fiberLength}
              setFiberLength={setFiberLength}
              absorptionCoeff={absorptionCoeff}
              setAbsorptionCoeff={setAbsorptionCoeff}
              gainCoeff={gainCoeff}
              setGainCoeff={setGainCoeff}
            />
            
            <AmplifierStats
              pumpPower={pumpPower}
              signalPower={signalPower}
              fiberLength={fiberLength}
              absorptionCoeff={absorptionCoeff}
              gainCoeff={gainCoeff}
            />
          </div>
          
          {/* Right section - Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <FiberDiagram
                  pumpPower={pumpPower}
                  signalPower={signalPower}
                  fiberLength={fiberLength}
                />
                
                <Separator className="my-6" />
                
                <PowerProfile
                  pumpPower={pumpPower}
                  signalPower={signalPower}
                  fiberLength={fiberLength}
                  absorptionCoeff={absorptionCoeff}
                  gainCoeff={gainCoeff}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">About Backward-Pumping Configuration</h3>
                <p className="text-gray-700">
                  In a backward-pumping configuration, pump light is injected from the output end of the fiber, counter-propagating against the signal. This arrangement provides several advantages:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Higher signal output power as gain peaks at the output end of the fiber</li>
                  <li>Lower noise figure due to higher inversion at the input end</li>
                  <li>Better power efficiency for signal amplification</li>
                  <li>Reduced susceptibility to nonlinear effects</li>
                </ul>
                <p className="mt-2 text-gray-700">
                  This model uses simplified rate equations to demonstrate the principle. Adjust the parameters to see how they affect amplifier performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-6 mt-8">
        <div className="container">
          <p className="text-center text-gray-500 text-sm">
            Interactive Fiber Amplifier Simulation — Educational Model © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
