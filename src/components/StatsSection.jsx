import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, ShieldCheck } from 'lucide-react';
import TiltCard from './TiltCard';

const CountUpNumber = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  const numericTarget = parseInt(target, 10) || 0;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / (numericTarget || 1)));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= numericTarget) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 25));

    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  return (
    <span ref={ref}>
      {count < 10 && numericTarget < 10 ? `0${count}` : count}
      {suffix}
    </span>
  );
};

const StatCard = ({ stat, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <TiltCard maxRotate={5}>
        <div className="glass-card-apple p-8 sm:p-10 rounded-[28px] border border-white/12 hover:border-[#2997FF]/40 hover:shadow-[0_0_40px_rgba(41,151,255,0.2)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#000000] border border-white/10 text-[#2997FF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon size={24} />
            </div>
          </div>

          <div className="my-auto">
            <h3 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white group-hover:text-[#2997FF] transition-all tracking-tight leading-none">
              <CountUpNumber target={stat.number} suffix={stat.suffix} />
            </h3>

            <p className="font-display text-sm sm:text-base font-bold text-white tracking-tight uppercase mt-4">
              {stat.label}
            </p>
          </div>

          {/* HOVER CONTEXTUAL EXPLANATION */}
          <div className="mt-4 pt-4 border-t border-white/10 text-xs font-sans text-slate-400 transition-all duration-300">
            {isHovered ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#2997FF] font-medium leading-relaxed">
                {stat.hoverContext}
              </motion.p>
            ) : (
              <p className="text-slate-400 truncate">
                {stat.detail}
              </p>
            )}
          </div>

        </div>
      </TiltCard>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      number: "3",
      suffix: "+",
      label: "Core MERN Builds",
      detail: "Avora, Zaaish & Dreamlands Properties",
      hoverContext: "Flagship travel diary vault, luxury fashion eCommerce, and live real estate portal.",
      icon: Code2,
    },
    {
      number: "25",
      suffix: "+",
      label: "REST APIs",
      detail: "Structured endpoints across production applications",
      hoverContext: "Structured REST API endpoints featuring JWT authentication, Cloudinary asset uploads, and PayPal SDK processing.",
      icon: Server,
    },
    {
      number: "100",
      suffix: "%",
      label: "Production Quality",
      detail: "Client-delivered deployment with 95%+ precision",
      hoverContext: "Real-world client deployments with custom domain, automated SEO metadata, and instant lead capture routing.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section id="experience" className="relative py-24 lg:py-36 bg-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Impact in <span className="text-gradient-blue">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
