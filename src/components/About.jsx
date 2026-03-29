import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.webp';

const About = () => {
  return (
    <section id="about" className="relative py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left">
            {/* Left/Top Column: Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8 lg:mb-0"
            >
              <div className="relative group w-full max-w-sm">
                {/* Soft glow shadow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                {/* Image */}
                <img 
                  src={profileImage} 
                  alt="Resmal Mubarak V" 
                  className="relative rounded-2xl shadow-xl w-full object-cover border border-white/10 group-hover:scale-[1.02] transition-transform duration-500" 
                />
              </div>
            </motion.div>

            {/* Right/Bottom Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Engineering with <span className="text-gradient">Precision</span>
              </h2>
              <div className="space-y-6 text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
                <p>
                  I specialize in architecting and developing end-to-end web applications using the MERN stack. My focus is on creating scalable, high-performance systems that solve complex business problems.
                </p>
                <p>
                  By combining robust backend engineering with seamless frontend experiences, I deliver production-ready software that scales. Security, clean architecture, and optimal user experiences are at the core of my development philosophy.
                </p>
              </div>
            </motion.div>
          </div>
      </div>
    </section>
  );
};

export default About;