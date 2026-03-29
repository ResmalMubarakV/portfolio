import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Sending message...");

    emailjs.send(
      "service_arjvfnr",
      "template_zl7segi",
      {
        name: formState.name,
        email: formState.email,
        message: formState.message,
      },
      "fFWl2ZTAycsCpqRnT"
    )
    .then(() => {
      toast.success("Message sent ✅", { id: loadingToast });
      setFormState({ name: '', email: '', message: '' });
    })
    .catch(() => {
      toast.error("Something went wrong", { id: loadingToast });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <section id="contact" className="relative py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 max-w-4xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          >
            Let's <span className="text-gradient">Connect</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            I'm available for full-time roles or freelance work.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] transition-all duration-500"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  placeholder="Your Email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                />
              </div>

            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                rows={5}
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                placeholder="Your Message"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 resize-none outline-none"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                aria-label="Send message"
                disabled={loading}
                className="group relative px-10 py-4 rounded-xl bg-white text-black font-medium 
                           flex items-center justify-center gap-2
                           transition-all duration-300
                           hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)]
                           active:scale-95
                           disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Glow */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-all"></span>

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;