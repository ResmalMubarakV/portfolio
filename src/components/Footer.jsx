import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8 mt-16">
      <div className="container mx-auto px-6 flex flex-col items-center gap-4">

        {/* Name + Location */}
        <div className="text-center">
          <h3 className="text-white text-lg font-medium tracking-wide">
            Resmal Mubarak V
          </h3>
          <p className="text-xs text-gray-500">
            Palakkad, Kerala • Open to remote
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">

          <a
            href="https://github.com/ResmalMubarakV"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/resmal-mubarak-v/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
          >
            <FaLinkedin size={20} />
          </a>

        </div>

        {/* Bottom */}
        <p className="text-xs text-gray-600 mt-2">
          © {new Date().getFullYear()} • Built & deployed by Resmal
        </p>

      </div>
    </footer>
  );
};

export default Footer;