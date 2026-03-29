import React from 'react';
import { motion } from 'framer-motion';

const SkillCategory = ({ title, skills, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: delay * 0.5 }}
    className="glass-card p-6 md:p-8 flex flex-col h-full group hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all duration-300 ease-out"
  >
    <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/10 pb-4 group-hover:border-blue-500/30 transition-colors">{title}</h3>
    <div className="flex flex-wrap gap-3 mt-auto">
      {skills.map((skill, index) => (
        <span 
          key={index}
          className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-white/5 text-gray-300 border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-500/10 group-hover:text-blue-200 transition-all duration-300 cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const categories = [
    {
      title: "Frontend",
      skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Session Auth", "Payment Integrations"]
    },
    {
      title: "Database",
      skills: ["MongoDB", "Mongoose", "NoSQL Data Modeling", "Aggregation Pipeline"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "GitHub", "Vite", "Postman", "Responsive Design", "Performance Optimization"]
    }
  ];

  return (
    <section id="skills" className="relative py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white"
          >
            Technical <span className="text-gradient">Arsenal</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {categories.map((cat, index) => (
            <SkillCategory key={index} title={cat.title} skills={cat.skills} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;