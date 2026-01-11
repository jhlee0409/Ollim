
import React from 'react';
import { ToneParameters } from '../types';

interface ToneSlidersProps {
  params: ToneParameters;
  onChange: (newParams: ToneParameters) => void;
  isFunMode?: boolean;
}

const ToneSliders: React.FC<ToneSlidersProps> = ({ params, onChange, isFunMode }) => {
  const handleChange = (key: keyof ToneParameters, value: number) => {
    onChange({ ...params, [key]: value });
  };

  const activeColor = isFunMode ? 'ollim-green' : 'ollim-sand';

  const sliderConfigs = [
    { 
      key: 'politeness' as const, 
      label: isFunMode ? 'Wit Intensity' : '정중함', 
      icon: isFunMode ? 'fa-bolt-lightning' : 'fa-medal', 
      steps: [
        { label: 'Level 1', value: 25 },
        { label: 'Level 2', value: 50 },
        { label: 'Level 3', value: 75 },
        { label: 'Level 4', value: 100 },
      ]
    },
    { 
      key: 'friendliness' as const, 
      label: '친근함', 
      icon: 'fa-face-smile', 
      steps: [
        { label: 'Low', value: 25 },
        { label: 'Mid', value: 50 },
        { label: 'High', value: 75 },
        { label: 'Max', value: 100 },
      ]
    },
    { 
      key: 'assertiveness' as const, 
      label: '단호함', 
      icon: 'fa-fire-flame-simple', 
      steps: [
        { label: 'Soft', value: 25 },
        { label: 'Medium', value: 50 },
        { label: 'Firm', value: 75 },
        { label: 'Direct', value: 100 },
      ]
    },
  ];

  return (
    <div className={`space-y-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50`}>
      <h3 className="text-[9px] font-bold text-warm-gray uppercase tracking-widest flex items-center">
        <i className="fas fa-sliders-h mr-2"></i>
        Fine Tuning
      </h3>
      <div className="space-y-3">
        {sliderConfigs.map((config) => (
          <div key={config.key} className="space-y-2">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tight">
              <div className="flex items-center text-charcoal">
                <i className={`fas ${config.icon} mr-1.5 text-${activeColor}`}></i>
                <span>{config.label}</span>
              </div>
              <span className={`text-${activeColor}`}>
                {config.steps.find(s => s.value >= params[config.key])?.label || 'Default'}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl border border-slate-100 bg-white shadow-inner">
              {config.steps.map((step) => {
                const isActive = params[config.key] === step.value;
                return (
                  <button
                    type="button"
                    key={step.value}
                    onClick={() => handleChange(config.key, step.value)}
                    className={`py-1.5 text-[9px] font-black rounded-lg transition-all duration-300 ${
                      isActive 
                        ? `bg-${activeColor} text-white shadow-md scale-[1.05]` 
                        : 'text-warm-gray hover:text-charcoal hover:bg-slate-50'
                    }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSliders;
