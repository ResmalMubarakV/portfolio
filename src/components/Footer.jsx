import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowUp, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 py-12 bg-[#080811] font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* BRAND & LOCATION */}
        <div className="text-center md:text-left">
          <a href="#home" className="font-display font-black text-lg text-white tracking-tight">
            RESMAL <span className="text-blue-400 font-bold">MUBARAK V</span>
          </a>
          <p className="text-slate-400 mt-1">
            Palakkad, Kerala, India • Full Stack MERN Developer
          </p>
        </div>

        {/* SOCIAL LINKS & BACK TO TOP */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ResmalMubarakV"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-[#0d0e24] border border-white/12 text-slate-400 hover:text-white hover:border-blue-400/50 hover:bg-[#14162e] flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/resmal-mubarak-v/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-[#0d0e24] border border-white/12 text-slate-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-[#14162e] flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="mailto:resmalmubarakv@gmail.com"
              aria-label="Direct Email"
              className="w-10 h-10 rounded-xl bg-[#0d0e24] border border-white/12 text-slate-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-[#14162e] flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Mail size={18} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold flex items-center justify-center shadow-[0_0_18px_rgba(59,130,246,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <p>© {new Date().getFullYear()} Resmal Mubarak V. All rights reserved.</p>
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
      </div>
    </footer>
  );
};

export default Footer;