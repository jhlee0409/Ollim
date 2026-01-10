
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
    <div className="space-y-10 animate-fade-in pb-12">
      <div className={`bg-white rounded-3xl paper-shadow border border-slate-100 overflow-hidden paper-texture`}>
        <div className={`border-b border-slate-50 px-8 py-6 flex justify-between items-center`}>
          <h3 className={`font-bold text-charcoal flex items-center font-serif-ollim text-lg`}>
            <i className={`fas ${isFunMode ? 'fa-wand-magic-sparkles' : 'fa-feather'} mr-3 text-${activeColorClass}`}></i>
            정제된 서신
          </h3>
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all border ${
              copied 
                ? 'bg-green-50 text-green-700 border-green-100' 
                : `bg-${activeColorClass}/5 text-${activeColorClass} border-${activeColorClass}/20 hover:bg-${activeColorClass} hover:text-white`
            }`}
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} text-xs`}></i>
            <span className="text-xs font-bold">{copied ? '복사됨' : '본문 복사'}</span>
          </button>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="space-y-3">
            <label className={`text-[10px] font-bold text-warm-gray uppercase tracking-[0.2em]`}>Subject Line</label>
            <div className={`text-xl font-bold text-charcoal font-serif-ollim border-b border-slate-100 pb-4`}>
              {currentSubject}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-[10px] font-bold text-warm-gray uppercase tracking-[0.15em]">
                {isFunMode ? 'Alternative Hooks' : '추천 제목 후보'}
              </label>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {allSubjects.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSubject(sub)}
                  className={`text-[11px] px-4 py-2 rounded-full border transition-all duration-300 font-medium ${
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

          <div className="space-y-3">
            <label className={`text-[10px] font-bold text-warm-gray uppercase tracking-[0.2em]`}>Message Body</label>
            <div className={`text-charcoal whitespace-pre-wrap text-base leading-[1.8] p-8 rounded-2xl border border-slate-50 font-serif-ollim bg-white/40 min-h-[300px] shadow-inner`}>
              {result.body}
            </div>
          </div>

          <div className={`pt-8 border-t border-slate-50`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-warm-gray">
                <i className="fas fa-comment-dots text-xs"></i>
                <span className="text-[11px] font-bold tracking-tight">{isFunMode ? '드립 컨셉이 만족스러우신가요?' : '결과가 원하시는 방향인가요?'}</span>
              </div>
              <div className="flex items-center space-x-3">
                {feedback === null ? (
                  <>
                    <button 
                      onClick={() => setFeedback('up')}
                      className={`group flex items-center space-x-2 px-5 py-2 rounded-full border border-slate-200 text-warm-gray hover:text-green-600 hover:bg-green-50 hover:border-green-200 transition-all`}
                    >
                      <i className="far fa-thumbs-up text-xs"></i>
                      <span className="text-[11px] font-bold uppercase">Great</span>
                    </button>
                    <button 
                      onClick={() => setFeedback('down')}
                      className={`group flex items-center space-x-2 px-5 py-2 rounded-full border border-slate-200 text-warm-gray hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all`}
                    >
                      <i className="far fa-thumbs-down text-xs"></i>
                      <span className="text-[11px] font-bold uppercase">Needs Work</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    {feedback === 'down' && !showRefineInput && (
                      <button 
                        onClick={() => setShowRefineInput(true)}
                        className={`text-[11px] text-${activeColorClass} font-bold hover:underline`}
                      >
                        세부 사항 수정 요청하기
                      </button>
                    )}
                    <div className={`flex items-center space-x-2 text-white animate-fade-in bg-${activeColorClass} px-6 py-2 rounded-full shadow-sm`}>
                      <i className="fas fa-heart text-[10px]"></i>
                      <span className="text-[11px] font-bold uppercase tracking-widest">Thank you!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showRefineInput && (
              <div className={`mt-6 p-6 rounded-2xl border border-slate-100 space-y-4 animate-fade-in bg-slate-50/50`}>
                <p className={`text-[11px] font-bold text-charcoal uppercase tracking-widest`}>Refinement Instructions</p>
                <textarea
                  value={refineText}
                  onChange={(e) => setRefineText(e.target.value)}
                  placeholder={isFunMode ? "예: 조금 더 뻔뻔하게 고쳐줘, 유행어를 듬뿍 섞어봐 등" : "예: 조금 더 단호하게 말해줘, 상대방의 일정에 맞춰야 한다는 점을 강조해줘 등"}
                  className={`w-full p-4 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-${activeColorClass}/40 min-h-[100px] resize-none bg-white`}
                ></textarea>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowRefineInput(false)}
                    className="px-4 py-2 text-[11px] font-bold text-warm-gray hover:text-charcoal"
                  >
                    취소
                  </button>
                  <button 
                    onClick={handleRefineSubmit}
                    disabled={!refineText.trim() || isRefining}
                    className={`px-6 py-2 bg-${activeColorClass} text-white rounded-xl text-[11px] font-bold shadow-md hover:brightness-110 disabled:bg-slate-300 transition-all`}
                  >
                    {isRefining ? '반영 중...' : '요청하기'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-colors`}>
        <h4 className="font-bold text-charcoal mb-6 flex items-center font-serif-ollim">
          <i className={`fas fa-lightbulb mr-3 text-ollim-sand`}></i>
          작성 포인트 가이드
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
              <div className={`bg-${activeColorClass} text-white w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[10px]`}>
                {idx + 1}
              </div>
              <span className="text-xs leading-relaxed text-slate-600 font-medium">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailResult;
