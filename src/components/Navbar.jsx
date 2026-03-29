import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaDownload } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl py-4 border-b border-white/10 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white tracking-tight">
          Resmal<span className="text-blue-500">.dev</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                relative
                text-xs md:text-sm lg:text-sm
                font-medium
                text-gray-400
                transition-all duration-300

                hover:text-transparent
                hover:bg-clip-text
                hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500
              "
            >
              {link.name}

              {/* Underline Gradient */}
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px]
                bg-gradient-to-r from-blue-500 to-purple-500
                transition-all duration-300
                group-hover:w-full
              "></span>
            </a>
          ))}

          {/* Resume Button */}
          <a
            href="/Resmal_MERN_FullStack_Developer.pdf"
            download
            className="
              flex items-center space-x-2 
              px-4 py-2 md:px-4 md:py-2 lg:px-6 lg:py-2.5
              text-xs md:text-sm lg:text-sm
              font-medium text-white 
              bg-gradient-to-r from-blue-600 to-purple-600 
              rounded-lg shadow-lg 
              hover:scale-105 transition duration-300
            "
          >
            <FaDownload size={14} />
            <span>Resume</span>
          </a>

        </div>

        {/* Mobile Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition z-[1000]"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/60 backdrop-blur-lg border-b border-t border-white/10 px-6 py-6 space-y-4 rounded-b-2xl shadow-xl z-[99998]"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-white/70 hover:text-white uppercase tracking-widest text-sm font-semibold border-b border-white/5 pb-3 hover:translate-x-2 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;