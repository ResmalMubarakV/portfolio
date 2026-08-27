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
    <section ref={targetRef} className="relative h-[220vh] bg-[#000000] hidden md:block">
      
      {/* PINNED VIEWPORT CONTAINER */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* HEADER OVERLAY */}
        <div className="absolute top-8 left-10 right-10 z-20 flex items-center justify-between font-mono text-xs text-[#2997FF]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2997FF] animate-pulse" />
            <span>Horizontal Capability Track</span>
          </div>

          <div className="px-3.5 py-1 rounded-full bg-[#121217] border border-white/12 text-slate-400">
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
                className="w-[360px] sm:w-[400px] shrink-0 glass-card-apple p-8 rounded-[28px] border border-white/12 hover:border-[#2997FF]/40 hover:shadow-[0_0_40px_rgba(41,151,255,0.2)] transition-all duration-500 flex flex-col justify-between h-[340px]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-[#2997FF]">
                    {item.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#000000] border border-white/10 text-[#2997FF] flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-extrabold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-[#2997FF] font-bold mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-slate-500 flex justify-between items-center">
                  <span>TECHNICAL HIGHLIGHT</span>
                  <span className="text-[#2997FF] font-bold">{item.num}/06</span>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default HorizontalScroll;
