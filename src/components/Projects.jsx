import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import demo1 from '../assets/demo1.webp';
import demo2 from '../assets/demo2.webp';
import demo3 from '../assets/demo3.webp';
import demo4 from '../assets/demo4.webp';

const ProjectCard = ({ title, description, tags, github, live, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="glass-card flex flex-col overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
  >
    {/* IMAGE */}
    <div className="h-48 relative overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>

      {/* LIVE BUTTON */}
      {live !== "#" && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 text-xs font-semibold bg-blue-600/90 hover:bg-blue-600 backdrop-blur px-3 py-1.5 rounded-full text-white transition-all duration-300 hover:scale-105"
        >
          Live →
        </a>
      )}

      {/* badge */}
      <div className="absolute bottom-3 left-3 text-xs bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white">
        Preview
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 mb-5 text-sm leading-relaxed flex-1">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center space-x-4 mt-auto">
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub size={16} className="mr-2" />
          Code
        </a>

        <a 
          href={live} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-300 hover:text-blue-400 transition-colors"
        >
          <FaExternalLinkAlt size={16} className="mr-2" />
          Live
        </a>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {

  const projectsList = [
    {
      title: "Zaaish E-Commerce Platform",
      description: "A full-stack eCommerce application built using the MERN stack with secure JWT authentication, product management, cart functionality, and PayPal payment integration. Developed REST APIs with Node.js and Express, managed state using Redux, and integrated Cloudinary for image handling.",
      tags: ["React", "Redux", "Node.js", "Express", "MongoDB", "JWT", "PayPal"],
      github: "https://github.com/ResmalMubarakV/zaaish_ecommerce",
      live: "#",
      image: demo1
    },
    {
      title: "Dreamland Properties (Client Project)",
      description: "A real-world real estate website built for a client to generate leads. Integrated WhatsApp API for direct communication and focused on responsive design and performance optimization.",
      tags: ["React", "TypeScript", "Tailwind CSS", "WhatsApp API"],
      github: "https://github.com/ResmalMubarakV/dreamlands-properties",
      live: "https://www.dreamlandsproperties.com",
      image: demo2
    },
    {
      title: "Authentication & Session Management",
      description: "A backend authentication system using Node.js and Express with session-based login, cookie handling, and protected routes.",
      tags: ["Node.js", "Express", "Sessions", "Authentication"],
      github: "https://github.com/ResmalMubarakV/Login_Project",
      live: "#",
      image: demo3
    },
    {
      title: "Lazza Ice Cream Website Clone",
      description: "A fully responsive UI clone focused on pixel-perfect design and smooth responsiveness across devices.",
      tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      github: "https://github.com/ResmalMubarakV/lazza-clone",
      live: "https://resmalmubarakv.github.io/lazza-clone/",
      image: demo4
    }
  ];

  return (
    <section id="projects" className="relative py-12 md:py-16 bg-black/30">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">

        {/* HEADER */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Featured <span className="text-gradient">Work</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-2xl text-base"
          >
            Selected projects showcasing full-stack development, real-world integrations, and performance-focused UI.
          </motion.p>
        </div>

        {/* GRID FIXED */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projectsList.map((project, index) => (
            <ProjectCard key={index} {...project} delay={index * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;