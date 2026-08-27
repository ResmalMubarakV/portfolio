import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Briefcase, Copy, Check, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "resmalmubarakv@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    toast.success("Email copied to clipboard!");
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
    <section id="contact" className="relative py-28 lg:py-40 bg-[#050508] overflow-hidden">
      
      {/* BACKGROUND AMBIENT RED GLOW */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* LARGE CINEMATIC FINAL HEADING COMPOSITION */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <Sparkles size={14} className="text-red-400 animate-spin-slow" />
            <span>INITIATE COLLABORATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]"
          >
            LET'S BUILD <br />
            <span className="text-gradient-red">SOMETHING GREAT.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-sm sm:text-base mt-6 leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Open for full-stack engineering roles, technical architecture contracts, and high-impact web project buildouts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT INFO CARDS */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* EMAIL QUICK CARD */}
            <TiltCard maxRotate={6}>
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 hover:border-red-500/30 backdrop-blur-md transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <button
                    onClick={copyEmail}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono text-red-300 flex items-center gap-1.5 transition"
                  >
                    {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Direct Email</p>
                <p className="text-white font-semibold text-sm sm:text-base mt-1 break-all">{emailAddress}</p>
              </div>
            </TiltCard>

            {/* LOCATION CARD */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-md">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                <MapPin size={20} />
              </div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Location</p>
              <p className="text-white font-semibold text-sm sm:text-base mt-1">Palakkad, Kerala, India</p>
            </div>

            {/* AVAILABILITY CARD */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-md">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Briefcase size={20} />
              </div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Work Status</p>
              <p className="text-emerald-400 font-semibold text-sm sm:text-base mt-1">Open for Full-Time Roles & Freelance</p>
            </div>
          </motion.div>

          {/* RIGHT CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card-spotlight p-6 sm:p-10 border border-red-500/25 shadow-2xl relative rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
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
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
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
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or role opportunity..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 resize-none outline-none transition"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] disabled:opacity-60 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </MagneticButton>

              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;