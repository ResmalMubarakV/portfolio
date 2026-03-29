import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8 mt-16">
      <div className="container mx-auto px-6 flex flex-col items-center gap-4">

        <div className="text-center">
          <h3 className="text-white text-lg font-medium">
            Resmal Mubarak V
          </h3>
          <p className="text-xs text-gray-400">
            Palakkad, Kerala, India
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/ResmalMubarakV"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-400 hover:text-white transition hover:scale-110"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/resmal-mubarak-v/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-gray-400 hover:text-blue-400 transition hover:scale-110"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} • Built by Resmal
        </p>

      </div>
    </footer>
  );
};

export default Footer;