import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Lock, CreditCard, LayoutTemplate, Zap } from 'lucide-react';

const ImpactCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6 flex flex-col items-start group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all duration-300"
  >
    <div className="p-3 rounded-xl bg-white/5 text-blue-400 mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Experience = () => {
  const impacts = [
    {
      icon: LayoutTemplate,
      title: "Full-Stack Applications",
      description: "Built and deployed multiple end-to-end MERN stack applications serving real client needs."
    },
    {
      icon: Server,
      title: "25+ REST APIs",
      description: "Designed robust, scalable API architectures capable of handling complex database operations."
    },
    {
      icon: Lock,
      title: "Authentication Systems",
      description: "Implemented secure JWT and session-based authentication with role-based access control."
    },
    {
      icon: CreditCard,
      title: "Payment Integrations",
      description: "Seamlessly integrated PayPal gateway for secure ecommerce transactions."
    },
    {
      icon: Database,
      title: "Real Client Delivery",
      description: "Successfully delivered Dreamland Properties project with lead capture system."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Improved metrics, conversion rates, and overall user experience across projects."
    }
  ];

  return (
    <section id="experience" className="relative py-12 md:py-16 bg-black/50">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white"
          >
            Proven <span className="text-gradient">Impact</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Delivering measurable results through technical excellence and strategic implementation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {impacts.map((impact, index) => (
            <ImpactCard key={index} {...impact} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
