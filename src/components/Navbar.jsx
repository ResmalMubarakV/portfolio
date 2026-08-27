import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaDownload } from 'react-icons/fa';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'WORK', href: '#projects', id: 'projects' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'ARCHITECTURE', href: '#engineering', id: 'engineering' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'projects', 'skills', 'engineering', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#080811]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.85)]'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* LEFT BRAND EMBLEM */}
        <a
          href="#home"
          className="flex items-center gap-2.5 font-mono text-sm font-bold text-white hover:text-blue-400 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#60a5fa]" />
          <span className="tracking-wider">RESMAL<span className="text-blue-400">.DEV</span></span>
        </a>

        {/* CENTER DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 rounded-full font-mono ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-violet-500/30 border border-blue-400/50 rounded-full -z-10 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* RIGHT RESUME CTA BUTTON */}
        <div className="hidden md:flex items-center">
          <MagneticButton
            href="/Resmal_MERN_FullStack_Developer.pdf"
            download
            className="group relative px-5 py-2 text-xs font-bold font-mono text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <FaDownload size={11} className="group-hover:-translate-y-0.5 transition-transform text-white" />
            <span>RESUME</span>
          </MagneticButton>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            className="text-white p-2.5 rounded-2xl bg-[#0d0e24] border border-white/15 hover:bg-[#14162e] transition"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#080811]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 mt-3"
          >
            <div className="space-y-2 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                    activeSection === link.id
                      ? 'bg-violet-500/20 text-cyan-300 border border-violet-500/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 font-mono">
              <a
                href="/Resmal_MERN_FullStack_Developer.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 rounded-full shadow-lg"
              >
                <FaDownload size={14} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;