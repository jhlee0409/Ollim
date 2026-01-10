
import React from 'react';

interface HeaderProps {
  isFunMode: boolean;
  onToggleFunMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isFunMode, onToggleFunMode }) => {
  return (
    <header className={`${isFunMode ? 'bg-ollim-green' : 'bg-ollim-sand'} text-white py-8 px-6 shadow-md transition-colors duration-500`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm border border-white/30 transition-transform hover:rotate-12">
            <i className={`fas ${isFunMode ? 'fa-face-laugh-squint' : 'fa-feather-pointed'} text-2xl`}></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-serif-ollim">올림 (Ollim)</h1>
            <p className="text-white/80 text-xs font-medium tracking-wide uppercase">
              {isFunMode ? 'Witty & Fun Communication' : 'Sincere Business Language'}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <button 
            onClick={onToggleFunMode}
            className={`group relative flex items-center h-10 px-1 rounded-full border border-white/30 bg-black/10 mode-toggle-pilled w-32 overflow-hidden`}
          >
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-lg transition-transform duration-500 ease-in-out flex items-center justify-center ${isFunMode ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}>
               <i className={`fas ${isFunMode ? 'fa-bolt-lightning text-ollim-green' : 'fa-briefcase text-ollim-sand'} text-xs`}></i>
            </div>
            <div className="flex w-full justify-around text-[10px] font-bold uppercase tracking-tighter">
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
