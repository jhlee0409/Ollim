
import React, { useState } from 'react';
import Header from './components/Header';
import ToneChips from './components/ToneChips';
import ToneSliders from './components/ToneSliders';
import TemplateSelector from './components/TemplateSelector';
import EmailResult from './components/EmailResult';
import { AppState, ToneType, ToneParameters } from './types';
import { polishEmail } from './geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    input: '',
    selectedTone: 'GENERAL',
    toneParams: {
      politeness: 75,
      friendliness: 50,
      assertiveness: 50,
    },
    result: null,
    isLoading: false,
    error: null,
    isFunMode: false,
  });

  const handleProcess = async (refinementInstruction?: string) => {
    if (!state.input.trim() && !refinementInstruction) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await polishEmail(
        state.input, 
        state.selectedTone, 
        state.toneParams, 
        refinementInstruction,
        state.result || undefined,
        state.isFunMode
      );
      setState(prev => ({ ...prev, result, isLoading: false }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.' 
      }));
    }
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      input: '',
      selectedTone: prev.isFunMode ? 'LEGENDARY_MANAGER' : 'GENERAL',
      toneParams: {
        politeness: 75,
        friendliness: 50,
        assertiveness: 50,
      },
      result: null,
      isLoading: false,
      error: null,
    }));
  };

  const handleTemplateSelect = (content: string) => {
    setState(prev => ({ ...prev, input: content }));
  };

  const handleParamsChange = (params: ToneParameters) => {
    setState(prev => ({ ...prev, toneParams: params }));
  };

  const toggleFunMode = () => {
    setState(prev => {
      const newMode = !prev.isFunMode;
      return { 
        ...prev, 
        isFunMode: newMode,
        selectedTone: newMode ? 'LEGENDARY_MANAGER' : 'GENERAL',
        result: null
      };
    });
  };

  const activeThemeColor = state.isFunMode ? 'ollim-green' : 'ollim-sand';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 bg-[#F9F7F2]`}>
      <Header isFunMode={state.isFunMode} onToggleFunMode={toggleFunMode} />
      
      <main className="flex-grow p-4 md:p-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Input Area */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`bg-white rounded-2xl paper-shadow border ${state.isFunMode ? 'border-ollim-green/20' : 'border-ollim-sand/20'} p-8 space-y-8 h-full flex flex-col transition-all`}>
              <TemplateSelector onSelect={handleTemplateSelect} isFunMode={state.isFunMode} />
              
              <div className="space-y-3 flex-grow flex flex-col">
                <div className="flex justify-between items-end px-1">
                  <label htmlFor="draft" className="text-xs font-bold text-warm-gray uppercase tracking-widest">메일 초안 또는 요청 사항</label>
                  <span className={`text-[10px] ${state.isFunMode ? 'text-ollim-green' : 'text-ollim-sand'} font-bold`}>DRAFT</span>
                </div>
                <textarea
                  id="draft"
                  value={state.input}
                  onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
                  placeholder={state.isFunMode ? "팀장님께 보내는 드립 섞인 조퇴 사유를 적어보세요..." : "예: 프로젝트 마감일 미뤄달라고 할거야. 거절할 건데 기분 안 나쁘게 써줘. 등"}
                  className={`w-full min-h-[200px] flex-grow p-5 rounded-xl border-2 focus:ring-4 ${
                    state.isFunMode 
                      ? 'focus:ring-ollim-green/10 focus:border-ollim-green border-ollim-green/10' 
                      : 'focus:ring-ollim-sand/10 focus:border-ollim-sand border-ollim-sand/10'
                  } outline-none transition-all resize-none bg-white text-slate-950 font-semibold shadow-inner placeholder:text-slate-300`}
                ></textarea>
              </div>

              <div className={state.isFunMode ? "w-full" : "space-y-8"}>
                <ToneChips 
                  selected={state.selectedTone} 
                  onSelect={(tone) => setState(prev => ({ ...prev, selectedTone: tone }))} 
                  isFunMode={state.isFunMode}
                />
                {!state.isFunMode && (
                  <ToneSliders 
                    params={state.toneParams} 
                    onChange={handleParamsChange} 
                    isFunMode={state.isFunMode}
                  />
                )}
              </div>

              <div className="pt-4 flex space-x-4">
                <button
                  onClick={() => handleProcess()}
                  disabled={!state.input.trim() || state.isLoading}
                  className={`flex-grow py-5 rounded-xl font-bold flex items-center justify-center space-x-3 shadow-lg transition-all ${
                    !state.input.trim() || state.isLoading
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : `bg-${activeThemeColor} text-white hover:translate-y-[-2px] active:translate-y-0 shadow-${activeThemeColor}/30`
                  }`}
                >
                  {state.isLoading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      <span>{state.isFunMode ? '드립 엔진 가동 중...' : '올림 정제 시스템 가동 중...'}</span>
                    </>
                  ) : (
                    <>
                      <i className={`fas ${state.isFunMode ? 'fa-wand-magic-sparkles' : 'fa-check-double'}`}></i>
                      <span>{state.isFunMode ? '치명적인 드립으로 변신!' : '메일 정중하게 올리기'}</span>
                    </>
                  )}
                </button>
                {(state.result || state.input) && (
                  <button 
                    onClick={handleReset}
                    className={`p-5 rounded-xl border border-slate-200 text-warm-gray hover:bg-slate-50 transition-colors`}
                    title="초기화"
                  >
                    <i className="fas fa-rotate-left"></i>
                  </button>
                )}
              </div>
            </div>

            {state.error && (
              <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-center space-x-4 text-red-700 animate-fade-in">
                <i className="fas fa-triangle-exclamation text-lg"></i>
                <span className="text-sm font-semibold">{state.error}</span>
              </div>
            )}
          </div>

          {/* Answer Area */}
          <div className="lg:col-span-7 relative">
            {state.result ? (
              <EmailResult 
                result={state.result} 
                onRefine={(instruction) => handleProcess(instruction)}
                isRefining={state.isLoading}
                isFunMode={state.isFunMode}
              />
            ) : (
              <div className={`h-full min-h-[600px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-16 text-center transition-all ${state.isFunMode ? 'border-ollim-green/20 bg-ollim-green/5 text-ollim-green/40' : 'border-ollim-sand/30 bg-white/50 text-ollim-sand/40'}`}>
                <div className={`w-28 h-28 rounded-3xl flex items-center justify-center mb-10 rotate-3 transition-transform hover:rotate-0 ${state.isFunMode ? 'bg-ollim-green/10' : 'bg-ollim-sand/10'}`}>
                  <i className={`fas ${state.isFunMode ? 'fa-masks-theater' : 'fa-feather-pointed'} text-5xl ${state.isFunMode ? 'text-ollim-green' : 'text-ollim-sand'}`}></i>
                </div>
                <h3 className={`text-2xl font-bold mb-4 font-serif-ollim ${state.isFunMode ? 'text-ollim-green' : 'text-ollim-sand'}`}>
                  {state.isFunMode ? '드립 한 스푼, 품격 한 스푼' : '정성스럽게 올리는 비즈니스 메일'}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-warm-gray font-medium">
                  {state.isFunMode 
                    ? '딱딱한 메일은 이제 그만! 상대방을 미소 짓게 만드는 마법 같은 문장을 제안해 드릴게요.'
                    : '왼쪽에서 상황을 선택하거나 초안을 작성해 보세요. 당신의 진심에 전문성을 더해 드립니다.'
                  }
                </p>
              </div>
            )}
            
            {state.isLoading && (
               <div className="absolute inset-0 bg-warm-white/40 backdrop-blur-[4px] flex items-center justify-center rounded-3xl z-20">
                  <div className={`bg-white p-10 rounded-[2.5rem] paper-shadow border border-slate-100 text-center space-y-6 max-w-sm scale-in`}>
                    <div className="relative w-24 h-24 mx-auto">
                        <div className={`absolute inset-0 border-[6px] rounded-full ${state.isFunMode ? 'border-ollim-green/10' : 'border-ollim-sand/10'}`}></div>
                        <div className={`absolute inset-0 border-[6px] rounded-full border-t-transparent animate-spin ${state.isFunMode ? 'border-ollim-green' : 'border-ollim-sand'}`}></div>
                    </div>
                    <div>
                        <h4 className={`font-bold text-xl font-serif-ollim ${state.isFunMode ? 'text-ollim-green' : 'text-ollim-sand'}`}>
                          {state.isFunMode ? '유쾌한 영감 로딩 중...' : '진심을 정제하는 중...'}
                        </h4>
                        <p className="text-xs text-warm-gray mt-2 font-medium">잠시만 기다려 주세요</p>
                    </div>
                  </div>
               </div>
            )}
          </div>
        </div>
      </main>

      <footer className={`py-12 text-center text-xs border-t bg-white border-slate-100 text-warm-gray transition-colors`}>
        <p className="mb-4 flex justify-center space-x-6">
          <span className="flex items-center"><i className="fas fa-heart text-ollim-sand mr-2"></i> 진심</span>
          <span className="flex items-center"><i className="fas fa-bolt text-ollim-green mr-2"></i> 위트</span>
          <span className="flex items-center"><i className="fas fa-check-double text-slate-400 mr-2"></i> 전문성</span>
        </p>
        <p className="font-bold tracking-widest text-[10px] uppercase">&copy; 2024 올림 (Ollim). All rights reserved.</p>
      </footer>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .scale-in { animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default App;
