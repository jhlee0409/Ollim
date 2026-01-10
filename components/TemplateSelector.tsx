
import React from 'react';
import { EMAIL_TEMPLATES, FUN_EMAIL_TEMPLATES } from '../constants';

interface TemplateSelectorProps {
  onSelect: (content: string) => void;
  isFunMode?: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, isFunMode }) => {
  const templates = isFunMode ? FUN_EMAIL_TEMPLATES : EMAIL_TEMPLATES;
  const activeColor = isFunMode ? 'ollim-green' : 'ollim-sand';

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-bold text-warm-gray uppercase tracking-widest ml-1">
        {isFunMode ? 'Fun Scenarios' : '상황별 템플릿'}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.content)}
            className={`flex items-center space-x-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-${activeColor}/30 hover:shadow-sm transition-all group`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-50 shadow-sm transition-transform group-hover:scale-110`}>
              <i className={`fas ${tpl.icon} text-slate-300 group-hover:text-${activeColor} text-sm`}></i>
            </div>
            <span className={`text-[11px] font-bold text-slate-500 group-hover:text-charcoal leading-tight`}>{tpl.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
