
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface AmplifierParametersProps {
  pumpPower: number;
  setPumpPower: (value: number) => void;
  signalPower: number;
  setSignalPower: (value: number) => void;
  fiberLength: number;
  setFiberLength: (value: number) => void;
  absorptionCoeff: number;
  setAbsorptionCoeff: (value: number) => void;
  gainCoeff: number;
  setGainCoeff: (value: number) => void;
}

const AmplifierParameters: React.FC<AmplifierParametersProps> = ({
  pumpPower,
  setPumpPower,
  signalPower,
  setSignalPower,
  fiberLength,
  setFiberLength,
  absorptionCoeff,
  setAbsorptionCoeff,
  gainCoeff,
  setGainCoeff,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Amplifier Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="pump-power" className="flex items-center gap-1">
              Pump Power (mW)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      The optical power injected into the fiber from the pump laser. Higher power typically results in more signal amplification.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className="font-mono">{pumpPower.toFixed(0)}</span>
          </div>
          <Slider 
            id="pump-power"
            min={10} 
            max={500} 
            step={5}
            value={[pumpPower]} 
            onValueChange={([value]) => setPumpPower(value)} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="signal-power" className="flex items-center gap-1">
              Signal Power (mW)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">The input signal power that will be amplified.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className="font-mono">{signalPower.toFixed(1)}</span>
          </div>
          <Slider 
            id="signal-power"
            min={0.1} 
            max={20} 
            step={0.1}
            value={[signalPower]} 
            onValueChange={([value]) => setSignalPower(value)} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="fiber-length" className="flex items-center gap-1">
              Fiber Length (m)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Total length of the active fiber. Optimal length depends on pump power and dopant concentration.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className="font-mono">{fiberLength.toFixed(1)}</span>
          </div>
          <Slider 
            id="fiber-length"
            min={1} 
            max={20} 
            step={0.5}
            value={[fiberLength]} 
            onValueChange={([value]) => setFiberLength(value)} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="absorption-coeff" className="flex items-center gap-1">
              Absorption Coefficient
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Represents how quickly the pump light is absorbed by the doped fiber.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className="font-mono">{absorptionCoeff.toFixed(2)}</span>
          </div>
          <Slider 
            id="absorption-coeff"
            min={0.01} 
            max={0.5} 
            step={0.01}
            value={[absorptionCoeff]} 
            onValueChange={([value]) => setAbsorptionCoeff(value)} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="gain-coeff" className="flex items-center gap-1">
              Gain Coefficient
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Determines how efficiently pump power is converted to signal gain.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className="font-mono">{gainCoeff.toFixed(2)}</span>
          </div>
          <Slider 
            id="gain-coeff"
            min={0.01} 
            max={0.2} 
            step={0.01}
            value={[gainCoeff]} 
            onValueChange={([value]) => setGainCoeff(value)} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AmplifierParameters;
