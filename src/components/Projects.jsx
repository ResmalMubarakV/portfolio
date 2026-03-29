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
    <div className="h-48 relative overflow-hidden">
      <img 
        src={image} 
        alt={`${title} project preview`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>

      {live !== "#" && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live link`}
          className="absolute top-3 right-3 text-xs font-semibold bg-blue-600/90 hover:bg-blue-600 px-3 py-1.5 rounded-full text-white transition hover:scale-105"
        >
          Live →
        </a>
      )}

      <div className="absolute bottom-3 left-3 text-xs bg-black/60 px-3 py-1 rounded-full text-white">
        Preview
      </div>
    </div>

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-300 mb-5 text-sm leading-relaxed flex-1">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center space-x-4 mt-auto">
        <a 
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} GitHub repository`}
          className="flex items-center text-sm text-gray-300 hover:text-white"
        >
          <FaGithub size={16} className="mr-2" />
          Code
        </a>

        <a 
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live demo`}
          className="flex items-center text-sm text-gray-300 hover:text-blue-400"
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
    description: "A full-stack MERN eCommerce platform built with scalable architecture and secure JWT authentication. Includes product management, cart functionality, and PayPal integration. Uses Redux for state management and Cloudinary for optimized image handling, ensuring smooth performance and consistent user experience.",
    tags: ["React", "Redux", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/ResmalMubarakV/zaaish_ecommerce",
    live: "#",
    image: demo1
  },
  {
    title: "Dreamland Properties",
    description: "A real-world client project focused on lead generation and user engagement. Built a fully responsive interface with performance optimization and WhatsApp API integration. Designed for high conversion rates while maintaining smooth navigation, fast loading, and consistent experience across different devices.",
    tags: ["React", "Tailwind", "WhatsApp API"],
    github: "https://github.com/ResmalMubarakV/dreamlands-properties",
    live: "https://www.dreamlandsproperties.com",
    image: demo2
  },
  {
    title: "Authentication System",
    description: "A backend authentication system built using Node.js and Express with session-based login and cookie handling. Implements protected routes and secure user flow. Designed with a clean frontend interface, ensuring reliable authentication, proper session management, and smooth interaction across the application.",
    tags: ["Node.js", "Express", "Sessions"],
    github: "https://github.com/ResmalMubarakV/Login_Project",
    live: "#",
    image: demo3
  },
  {
    title: "Lazza Ice Cream Clone",
    description: "A fully responsive front-end clone built with HTML, CSS, Bootstrap, and JavaScript. Focused on pixel-perfect layout, structured design, and smooth responsiveness. Ensures consistent user experience across devices while maintaining clean UI structure and modern design standards.",
    tags: ["HTML", "CSS", "Bootstrap"],
    github: "https://github.com/ResmalMubarakV/lazza-clone",
    live: "https://resmalmubarakv.github.io/lazza-clone/",
    image: demo4
  }
];

  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="container mx-auto px-5">

        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-300 mt-3">
            Real-world projects built with performance and scalability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projectsList.map((p, i) => (
            <ProjectCard key={i} {...p} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;