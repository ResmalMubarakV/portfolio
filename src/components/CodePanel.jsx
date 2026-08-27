import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import TiltCard from './TiltCard';

const CodePanel = () => {
  const [copied, setCopied] = useState(false);
  const [activeCodeLine, setActiveCodeLine] = useState(null);

  const codeSnippet = `const developer = {
  name: "Resmal Mubarak V",
  role: "Full Stack MERN Developer",
  location: "Palakkad, Kerala, India",
  stack: ["MongoDB", "Express", "React", "Node"],
  status: "Available for Hire"
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-20 bg-[#000000] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <TiltCard maxRotate={5}>
          <div className="glass-card-apple rounded-[28px] border border-white/12 overflow-hidden shadow-2xl">
            
            {/* MACOS WINDOW HEADER */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#0a0a0f] border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-2">
                  <Terminal size={14} className="text-[#2997FF]" /> developer.js
                </span>
              </div>

              <button
                onClick={copyCode}
                aria-label="Copy code snippet"
                className="px-3.5 py-1.5 text-slate-300 hover:text-white rounded-full bg-[#181820] border border-white/10 hover:border-[#2997FF]/40 transition flex items-center gap-1.5 text-xs font-mono"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* CODE BODY WITH LINE REVEALS */}
            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 bg-[#060609] overflow-x-auto select-text">
              <div
                onMouseEnter={() => setActiveCodeLine(1)}
                onMouseLeave={() => setActiveCodeLine(null)}
                className={`transition-colors py-1 rounded px-2 ${activeCodeLine === 1 ? 'bg-[#2997FF]/15 text-blue-200' : ''}`}
              >
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">1</span>
                <span className="text-[#2997FF] font-bold">const</span>{' '}
                <span className="text-white font-bold">developer</span>{' '}
                <span className="text-slate-400">=</span> <span className="text-amber-300 font-bold">{"{"}</span>
              </div>

              <div
                onMouseEnter={() => setActiveCodeLine(2)}
                onMouseLeave={() => setActiveCodeLine(null)}
                className={`pl-6 transition-colors py-1 rounded px-2 ${activeCodeLine === 2 ? 'bg-[#2997FF]/15 text-blue-200' : ''}`}
              >
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">2</span>
                <span className="text-slate-400">name:</span>{' '}
                <span className="text-emerald-300 font-semibold">"Resmal Mubarak V"</span>,
              </div>

              <div
                onMouseEnter={() => setActiveCodeLine(3)}
                onMouseLeave={() => setActiveCodeLine(null)}
                className={`pl-6 transition-colors py-1 rounded px-2 ${activeCodeLine === 3 ? 'bg-[#2997FF]/15 text-blue-200' : ''}`}
              >
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">3</span>
                <span className="text-slate-400">role:</span>{' '}
                <span className="text-emerald-300 font-semibold">"Full Stack MERN Developer"</span>,
              </div>

              <div
                onMouseEnter={() => setActiveCodeLine(4)}
                onMouseLeave={() => setActiveCodeLine(null)}
                className={`pl-6 transition-colors py-1 rounded px-2 ${activeCodeLine === 4 ? 'bg-[#2997FF]/15 text-blue-200' : ''}`}
              >
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">4</span>
                <span className="text-slate-400">location:</span>{' '}
                <span className="text-slate-200">"Palakkad, Kerala, India"</span>,
              </div>

              <div
                onMouseEnter={() => setActiveCodeLine(5)}
                onMouseLeave={() => setActiveCodeLine(null)}
                className={`pl-6 transition-colors py-1 rounded px-2 ${activeCodeLine === 5 ? 'bg-[#2997FF]/15 text-blue-200' : ''}`}
              >
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">5</span>
                <span className="text-slate-400">stack:</span> <span className="text-amber-300">[</span>
                <span className="text-[#2997FF] font-semibold">"MongoDB"</span>, <span className="text-[#2997FF] font-semibold">"Express"</span>,{' '}
                <span className="text-[#2997FF] font-semibold">"React"</span>, <span className="text-[#2997FF] font-semibold">"Node"</span>
                <span className="text-amber-300">]</span>,
              </div>

              <div
                onMouseEnter={() => setActiveCodeLine(6)}
                onMouseLeave={() => setActiveCodeLine(null)}
                className={`pl-6 transition-colors py-1 rounded px-2 ${activeCodeLine === 6 ? 'bg-[#2997FF]/15 text-blue-200' : ''}`}
              >
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">6</span>
                <span className="text-slate-400">status:</span>{' '}
                <span className="text-[#2997FF] font-bold">"Available for Hire"</span>
              </div>

              <div className="py-1 px-2">
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">7</span>
                <span className="text-amber-300 font-bold">{"};"}</span>
                <span className="inline-block w-2 h-4 bg-[#2997FF] ml-2 animate-pulse align-middle" />
              </div>
            </div>

          </div>
        </TiltCard>

      </div>
    </section>
  );
};

export default CodePanel;
