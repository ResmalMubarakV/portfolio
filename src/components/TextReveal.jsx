import React from 'react';
import { motion } from 'framer-motion';

export const TextRevealWords = ({ text, className = '', delay = 0, wordClassName = '' }) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`inline-flex flex-wrap gap-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={childVariants} className={`inline-block ${wordClassName}`}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
