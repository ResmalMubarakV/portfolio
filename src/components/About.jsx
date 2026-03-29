import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.webp';

const About = () => {
  return (
    <section id="about" className="relative py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              <img 
                src={profileImage} 
                alt="Resmal Mubarak V"
                decoding="async"
                className="relative rounded-2xl shadow-xl w-full object-cover border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Engineering with <span className="text-gradient">Precision</span>
            </h2>

            <div className="space-y-5 text-gray-400 text-sm md:text-lg leading-relaxed">
              <p>
                I build full-stack web applications using the MERN stack, focusing on scalability, performance, and clean architecture.
              </p>
              <p>
                I combine strong backend systems with smooth frontend experiences to deliver production-ready applications that solve real-world problems.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;