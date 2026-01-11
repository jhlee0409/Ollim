
import React, { useState, useEffect } from 'react';
import { EmailResult as EmailResultType } from '../types';

interface EmailResultProps {
  result: EmailResultType;
  onRefine: (instruction: string) => void;
  isRefining: boolean;
  isFunMode?: boolean;
}

const EmailResult: React.FC<EmailResultProps> = ({ result, onRefine, isRefining, isFunMode }) => {
  const [copied, setCopied] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(result.subject);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [showRefineInput, setShowRefineInput] = useState(false);
  const [refineText, setRefineText] = useState('');

  const activeColorClass = isFunMode ? 'ollim-green' : 'ollim-sand';

  useEffect(() => {
    setCurrentSubject(result.subject);
    setFeedback(null);
    setShowRefineInput(false);
    setRefineText('');
  }, [result]);

  const handleCopy = () => {
    const fullText = `제목: ${currentSubject}\n\n${result.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefineSubmit = () => {
    if (!refineText.trim()) return;
    onRefine(refineText);
  };

  const allSubjects = [result.subject, ...result.alternativeSubjects];

  return (
    <div className="space-y-4 animate-fade-in pb-6">
      <div className={`bg-white rounded-3xl paper-shadow border border-slate-100 overflow-hidden paper-texture`}>
        <div className={`border-b border-slate-50 px-5 py-3 flex justify-between items-center`}>
          <h3 className={`font-bold text-charcoal flex items-center font-serif-ollim text-base`}>
            <i className={`fas ${isFunMode ? 'fa-wand-magic-sparkles' : 'fa-feather'} mr-2 text-${activeColorClass}`}></i>
            정제된 서신
          </h3>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full transition-all border ${
              copied 
                ? 'bg-green-50 text-green-700 border-green-100' 
                : `bg-${activeColorClass}/5 text-${activeColorClass} border-${activeColorClass}/20 hover:bg-${activeColorClass} hover:text-white`
            }`}
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} text-[10px]`}></i>
            <span className="text-[10px] font-bold">{copied ? '복사됨' : '본문 복사'}</span>
          </button>
        </div>
        
        <div className="p-5 space-y-5">
          <div className="space-y-1.5">
            <label className={`text-[9px] font-bold text-warm-gray uppercase tracking-[0.2em]`}>Subject Line</label>
            <div className={`text-lg font-bold text-charcoal font-serif-ollim border-b border-slate-100 pb-2`}>
              {currentSubject}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <label className="text-[9px] font-bold text-warm-gray uppercase tracking-[0.15em]">
                {isFunMode ? 'Alternative Hooks' : '추천 제목 후보'}
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {allSubjects.map((sub, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentSubject(sub)}
                  className={`text-[10px] px-3 py-1.5 rounded-full border transition-all duration-300 font-medium ${
                    currentSubject === sub
                      ? `bg-${activeColorClass} border-${activeColorClass} text-white shadow-md scale-105`
                      : `bg-white border-slate-200 text-slate-500 hover:border-${activeColorClass}/40`
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[9px] font-bold text-warm-gray uppercase tracking-[0.2em]`}>Message Body</label>
            <div className={`text-charcoal whitespace-pre-wrap text-sm leading-[1.7] p-5 rounded-2xl border border-slate-50 font-serif-ollim bg-white/40 min-h-[150px] shadow-inner`}>
              {result.body}
            </div>
          </div>

          <div className={`pt-5 border-t border-slate-50`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-warm-gray">
                <i className="fas fa-comment-dots text-[10px]"></i>
                <span className="text-[10px] font-bold tracking-tight">{isFunMode ? '드립 컨셉이 만족스러우신가요?' : '결과가 원하시는 방향인가요?'}</span>
              </div>
              <div className="flex items-center space-x-2">
                {feedback === null ? (
                  <>
                    <button 
                      type="button"
                      onClick={() => setFeedback('up')}
                      className={`group flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-warm-gray hover:text-green-600 hover:bg-green-50 hover:border-green-200 transition-all`}
                    >
                      <i className="far fa-thumbs-up text-[10px]"></i>
                      <span className="text-[10px] font-bold uppercase">Great</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFeedback('down')}
                      className={`group flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-warm-gray hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all`}
                    >
                      <i className="far fa-thumbs-down text-[10px]"></i>
                      <span className="text-[10px] font-bold uppercase">Needs Work</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    {feedback === 'down' && !showRefineInput && (
                      <button 
                        type="button"
                        onClick={() => setShowRefineInput(true)}
                        className={`text-[10px] text-${activeColorClass} font-bold hover:underline`}
                      >
                        세부 사항 수정 요청하기
                      </button>
                    )}
                    <div className={`flex items-center space-x-1.5 text-white animate-fade-in bg-${activeColorClass} px-4 py-1.5 rounded-full shadow-sm`}>
                      <i className="fas fa-heart text-[9px]"></i>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Thank you!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showRefineInput && (
              <div className={`mt-4 p-4 rounded-2xl border border-slate-100 space-y-3 animate-fade-in bg-slate-50/50`}>
                <p className={`text-[10px] font-bold text-charcoal uppercase tracking-widest`}>Refinement Instructions</p>
                <textarea
                  value={refineText}
                  onChange={(e) => setRefineText(e.target.value)}
                  placeholder={isFunMode ? "예: 조금 더 뻔뻔하게 고쳐줘, 유행어를 듬뿍 섞어봐 등" : "예: 조금 더 단호하게 말해줘, 상대방의 일정에 맞춰야 한다는 점을 강조해줘 등"}
                  className={`w-full p-3 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-${activeColorClass}/40 min-h-[80px] resize-none bg-white`}
                ></textarea>
                <div className="flex justify-end space-x-2">
                  <button 
                    type="button"
                    onClick={() => setShowRefineInput(false)}
                    className="px-3 py-1.5 text-[10px] font-bold text-warm-gray hover:text-charcoal"
                  >
                    취소
                  </button>
                  <button 
                    type="button"
                    onClick={handleRefineSubmit}
                    disabled={!refineText.trim() || isRefining}
                    className={`px-4 py-1.5 bg-${activeColorClass} text-white rounded-xl text-[10px] font-bold shadow-md hover:brightness-110 disabled:bg-slate-300 transition-all`}
                  >
                    {isRefining ? '반영 중...' : '요청하기'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-colors`}>
        <h4 className="font-bold text-charcoal mb-4 flex items-center font-serif-ollim text-sm">
          <i className={`fas fa-lightbulb mr-2 text-ollim-sand`}></i>
          작성 포인트 가이드
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
              <div className={`bg-${activeColorClass} text-white w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[9px]`}>
                {idx + 1}
              </div>
              <span className="text-[11px] leading-relaxed text-slate-600 font-medium">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailResult;
