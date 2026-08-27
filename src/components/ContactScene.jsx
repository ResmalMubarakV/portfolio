import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Mail, MapPin, Briefcase, Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';

const ContactScene = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "resmalmubarakv@gmail.com";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const letsY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    toast.success("COPIED");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

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
      toast.success("Message sent successfully! ✅", { id: loadingToast });
      setFormState({ name: '', email: '', message: '' });
    })
    .catch(() => {
      toast.error("Failed to send message. Please try again.", { id: loadingToast });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-24 lg:py-36 bg-[#050508] overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* EDITORIAL HEADING */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.h2 style={{ y: letsY }} className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
            LET'S <span className="text-gradient-emerald">TALK.</span>
          </motion.h2>
          <p className="text-slate-400 text-sm mt-3 font-sans">
            Available for full-time roles and freelance projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* LEFT INFO CARDS */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <TiltCard maxRotate={6}>
              <div className="p-6 rounded-3xl bg-[#0B0E14] border border-white/10 hover:border-emerald-400/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#111622] border border-white/10 text-emerald-400 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1 rounded-xl bg-[#111622] hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-1 transition"
                  >
                    {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedEmail ? 'COPIED' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-slate-500 uppercase">Email</p>
                <p className="text-white font-bold text-sm mt-1 break-all">{emailAddress}</p>
              </div>
            </TiltCard>

            <div className="p-6 rounded-3xl bg-[#0B0E14] border border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-[#111622] border border-white/10 text-emerald-400 flex items-center justify-center mb-3">
                <MapPin size={18} />
              </div>
              <p className="text-slate-500 uppercase">Location</p>
              <p className="text-white font-bold text-sm mt-1">Palakkad, Kerala, India</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B0E14] border border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-[#111622] border border-white/10 text-emerald-400 flex items-center justify-center mb-3">
                <Briefcase size={18} />
              </div>
              <p className="text-slate-500 uppercase">Status</p>
              <p className="text-emerald-400 font-bold text-sm mt-1">Available for Hire</p>
            </div>
          </div>

          {/* RIGHT CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="glass-card-lab p-6 sm:p-8 border border-white/15 shadow-2xl relative rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full bg-[#050508] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-400/50 resize-none outline-none transition"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:opacity-90 transition"
                >
                  {loading ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send size={14} />
                    </>
                  )}
                </MagneticButton>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactScene;
