
import React from 'react';
import { TONE_OPTIONS, FUN_TONE_OPTIONS } from '../constants';
import { ToneType } from '../types';

interface ToneChipsProps {
  selected: ToneType;
  onSelect: (tone: ToneType) => void;
  isFunMode?: boolean;
}

const ToneChips: React.FC<ToneChipsProps> = ({ selected, onSelect, isFunMode }) => {
  const options = isFunMode ? FUN_TONE_OPTIONS : TONE_OPTIONS;
  const activeColor = isFunMode ? 'ollim-green' : 'ollim-sand';

  return (
    <div className="space-y-3">
      <label className="text-[9px] font-bold text-warm-gray uppercase tracking-widest ml-1">
        {isFunMode ? '컨셉 페르소나 선택' : '톤앤매너 선택'}
      </label>
      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
        {options.map((option) => {
          const isSelected = selected === option.id;
          
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl border transition-all duration-300 text-[10px] font-bold text-left ${
                isSelected
                  ? `bg-${activeColor} border-${activeColor} text-white shadow-lg z-10`
                  : `bg-white border-slate-100 text-slate-500 hover:border-${activeColor}/30 hover:bg-slate-50`
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isSelected 
                  ? 'bg-white/20' 
                  : 'bg-slate-100'
              }`}>
                <i className={`fas ${option.icon} text-[10px] ${isSelected ? 'text-white' : 'text-slate-400'}`}></i>
              </div>
              <span className="truncate leading-tight">{option.label}</span>
            </button>
          );
        })}
      </div>
      <div className={`p-3 rounded-xl border border-dashed transition-colors flex items-start space-x-2 ${
        isFunMode ? 'bg-ollim-green/5 border-ollim-green/20' : 'bg-ollim-sand/5 border-ollim-sand/20'
      }`}>
        <i className={`fas fa-info-circle mt-0.5 text-[10px] ${isFunMode ? 'text-ollim-green' : 'text-ollim-sand'}`}></i>
        <p className={`text-[10px] font-medium leading-relaxed ${
          isFunMode ? 'text-ollim-green/80' : 'text-ollim-sand/80'
        }`}>
          {options.find(o => o.id === selected)?.description || "페르소나를 선택해 주세요."}
        </p>
      </div>
    </div>
  );
};

export default ToneChips;
