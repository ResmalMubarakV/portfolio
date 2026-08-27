import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Lock, Cloud, CreditCard, ShieldCheck, Zap } from 'lucide-react';

const items = [
  {
    num: "01",
    title: "Architecture",
    subtitle: "MERN Stack Modular API Pipeline",
    detail: "Express.js route controllers, clean middleware pipelines, and MongoDB schema design.",
    icon: Layers,
  },
  {
    num: "02",
    title: "Authentication",
    subtitle: "Bank-Grade JWT & RBAC Controls",
    detail: "JSON Web Tokens, bcrypt password hashing, session cookies, and role-based access.",
    icon: Lock,
  },
  {
    num: "03",
    title: "Cloud Storage",
    subtitle: "Cloud Image Asset Engine",
    detail: "Asynchronous media uploads, real-time image compression, and cloud gallery hosting.",
    icon: Cloud,
  },
  {
    num: "04",
    title: "Payments",
    subtitle: "PayPal REST SDK & PDF Invoices",
    detail: "Secure PayPal payment processing, automated receipt PDF generation, and cart sync.",
    icon: CreditCard,
  },
  {
    num: "05",
    title: "Admin Suite",
    subtitle: "Live Moderation & Inventory Suite",
    detail: "Product CRUD, live analytics, user approval queue, and order fulfillment tracking.",
    icon: ShieldCheck,
  },
  {
    num: "06",
    title: "Performance",
    subtitle: "React 19 Code Splitting & SEO Engine",
    detail: "Vite bundle optimization, Open Graph SEO metadata, and WhatsApp lead capture.",
    icon: Zap,
  },
];

const HorizontalScroll = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <>
      {/* DESKTOP PINNED HORIZONTAL TRACK */}
      <section ref={targetRef} className="relative h-[220vh] bg-[#050508] hidden md:block border-y border-white/10">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">

          {/* HEADER OVERLAY */}
          <div className="absolute top-8 left-10 right-10 z-20 flex items-center justify-between font-mono text-xs text-emerald-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wider">HORIZONTAL CAPABILITY TRACK</span>
            </div>

            <div className="px-3.5 py-1 rounded-full bg-[#0B0E14] border border-white/12 text-slate-400">
              <span>Scroll Horizontally (01 - 06)</span>
            </div>
          </div>

          {/* HORIZONTAL MOVING TRACK */}
          <motion.div style={{ x }} className="flex gap-6 px-12 sm:px-20 w-max">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[360px] sm:w-[400px] shrink-0 glass-card-lab p-8 rounded-[28px] border border-white/12 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500 flex flex-col justify-between h-[340px] bg-[#090d16]/90 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-emerald-400">
                      {item.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#050508] border border-white/10 text-emerald-400 flex items-center justify-center shadow-inner">
                      <Icon size={24} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-emerald-400 font-bold mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      {item.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-slate-400 flex justify-between items-center">
                    <span>CAPABILITY SPEC</span>
                    <span className="text-emerald-400 font-bold">{item.num}/06</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* MOBILE RESPONSIVE CARDS GRID */}
      <section className="block md:hidden py-16 px-4 bg-[#050508] border-y border-white/10">
        <div className="max-w-md mx-auto space-y-4">
          <div className="mb-6 font-mono text-xs text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">CORE CAPABILITIES (01 - 06)</span>
          </div>

          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090d16] border border-white/12 flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-emerald-400">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#050508] border border-white/10 text-emerald-400 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-emerald-400 font-bold mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HorizontalScroll;
