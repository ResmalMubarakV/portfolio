import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-4xl" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
          
          {/* BACKDROP CLICK CLOSER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent"
          />

          {/* MODAL WINDOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} bg-[#0B0B0B] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto`}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2.5 rounded-2xl bg-[#111111] border border-white/10 hover:border-lime-400/40 hover:text-lime-400 transition-all duration-300"
            >
              <X size={20} />
            </button>

            {title && (
              <div className="mb-6 pb-4 border-b border-white/10">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {title}
                </h3>
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
