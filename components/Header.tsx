
import React from 'react';

interface HeaderProps {
  isFunMode: boolean;
  onToggleFunMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isFunMode, onToggleFunMode }) => {
  return (
    <header className={`${isFunMode ? 'bg-ollim-green' : 'bg-ollim-sand'} text-white py-2 px-6 shadow-md transition-colors duration-500`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/images/ollim_logo.png"
            alt="Ollim Logo"
            className="h-10 w-auto object-contain hover:rotate-12 transition-transform duration-300"
          />
          <div>
            <h1 className="text-lg font-bold tracking-tight font-serif-ollim">올림 (Ollim)</h1>
            <p className="text-white/80 text-[9px] font-medium tracking-wide uppercase">
              {isFunMode ? 'Witty & Fun Communication' : 'Sincere Business Language'}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={onToggleFunMode}
            className={`group relative flex items-center h-7 px-1 rounded-full border border-white/30 bg-black/10 mode-toggle-pilled w-24 overflow-hidden`}
          >
            <div className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-lg transition-transform duration-500 ease-in-out flex items-center justify-center ${isFunMode ? 'translate-x-full' : 'translate-x-0'}`}>
            </div>
            <div className="flex w-full justify-around text-[8px] font-bold uppercase tracking-tighter">
              <span className={`z-10 transition-colors ${isFunMode ? 'text-white/60' : 'text-ollim-sand'}`}>PRO</span>
              <span className={`z-10 transition-colors ${isFunMode ? 'text-ollim-green' : 'text-white/60'}`}>FUN</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
