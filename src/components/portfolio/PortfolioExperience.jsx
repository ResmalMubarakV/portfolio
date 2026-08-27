import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Menu,
  Send,
  X,
} from 'lucide-react';
import profileImage from '../../assets/profile.webp';
import avoraImage from '../../assets/avora-optimized.jpg';
import zaaishImage from '../../assets/demo1-optimized.jpg';
import dreamlandsImage from '../../assets/dreamlands-optimized.jpg';

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Capabilities', href: '#capabilities' },
];

const projects = [
  {
    number: '01',
    name: 'Avora',
    category: 'Digital travel journal',
    description:
      'A quieter, more personal home for travel stories, private entries, and the images that make a trip worth remembering.',
    impact: 'From entry to memory — one considered flow.',
    stack: ['React', 'Node', 'MongoDB', 'Cloudinary'],
    image: avoraImage,
    live: 'https://avorawayfarer.vercel.app',
    code: 'https://github.com/ResmalMubarakV/avora',
    color: 'coral',
  },
  {
    number: '02',
    name: 'Zaaish',
    category: 'Commerce with character',
    description:
      'A luxury retail experience that makes product discovery, cart state, payments, and invoice delivery feel beautifully uncomplicated.',
    impact: 'Checkout confidence, engineered into every detail.',
    stack: ['React', 'Express', 'PayPal', 'PDF invoices'],
    image: zaaishImage,
    live: 'https://zaaish-ecommerce.vercel.app',
    code: 'https://github.com/ResmalMubarakV/zaaish_ecommerce',
    color: 'blue',
  },
  {
    number: '03',
    name: 'Dreamlands',
    category: 'Property, made personable',
    description:
      'A polished real estate platform designed to turn browsing into a clear next step through a fast, mobile-first experience.',
    impact: 'A premium digital front door for property discovery.',
    stack: ['React', 'TypeScript', 'SEO', 'WhatsApp leads'],
    image: dreamlandsImage,
    live: 'https://www.dreamlandsproperties.com',
    code: 'https://github.com/ResmalMubarakV/dreamlands-properties',
    color: 'yellow',
  },
];

const capabilities = [
  ['01', 'Experience', 'Design systems, responsive interfaces, and the small moments that make a product feel inevitable.'],
  ['02', 'Architecture', 'Composable React frontends paired with clean, predictable Express service layers.'],
  ['03', 'Commerce', 'Secure payments, carts, orders, receipts, and the operational surfaces behind the sale.'],
  ['04', 'Momentum', 'SEO, performance budgets, observability, and deployments built for the real world.'],
];

const visible = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function MagneticLink({ children, className = '', href, ...props }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 14, stiffness: 180 });
  const springY = useSpring(y, { damping: 14, stiffness: 180 });

  const handlePointerMove = (event) => {
    if (shouldReduceMotion || !ref.current || event.pointerType === 'touch') return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.16);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.16);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function PointerWash() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const smoothX = useSpring(x, { damping: 32, stiffness: 85 });
  const smoothY = useSpring(y, { damping: 32, stiffness: 85 });
  const background = useMotionTemplate`radial-gradient(430px circle at ${smoothX}px ${smoothY}px, rgba(69, 89, 255, 0.13), transparent 70%)`;

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const trackPointer = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', trackPointer, { passive: true });
    return () => window.removeEventListener('pointermove', trackPointer);
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) return null;
  return <motion.div aria-hidden="true" className="pointer-wash" style={{ background }} />;
}

function ProjectPanel({ project, index }) {
  const panelRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <motion.article
      ref={panelRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      variants={visible}
      className={`project-panel project-panel--${project.color}`}
    >
      <div className="project-panel__meta">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </div>

      <div className="project-panel__content">
        <div>
          <p className="eyebrow">Case study / {project.number}</p>
          <h3>{project.name}</h3>
          <p className="project-panel__description">{project.description}</p>
        </div>

        <div className="project-panel__bottom">
          <p>{project.impact}</p>
          <div className="project-panel__tags">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>

      <div className="project-panel__visual">
        <div className="project-panel__window">
          <div className="project-panel__window-bar">
            <span /><span /><span />
            <p>resmal / selected-work / {project.name.toLowerCase()}</p>
          </div>
          <motion.img
            style={{ y: imageY, scale: imageScale }}
            src={project.image}
            alt={`${project.name} project preview`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-panel__links">
          <a href={project.live} target="_blank" rel="noreferrer">Visit site <ArrowUpRight size={16} /></a>
          <a href={project.code} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source code`}><FaGithub size={17} /></a>
        </div>
      </div>
    </motion.article>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('resmalmubarakv@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus('Copy is unavailable here. Please use the email address above.');
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      setStatus('Please complete each field with a little more detail.');
      return;
    }

    setIsSending(true);
    setStatus('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_arjvfnr',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_zl7segi',
        { ...form, reply_to: form.email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'fFWl2ZTAycsCpqRnT',
      );
      setForm({ name: '', email: '', message: '' });
      setStatus('Message received. I’ll be in touch soon.');
    } catch {
      setStatus('That did not send. Please email me directly instead.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-card__identity">
        <p className="eyebrow">Send a note</p>
        <a className="contact-email" href="mailto:resmalmubarakv@gmail.com">resmalmubarakv@gmail.com</a>
        <button type="button" onClick={copyEmail} className="copy-button">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>

      <form className="contact-form" onSubmit={submitForm} noValidate>
        <label>
          <span>Name</span>
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@company.com"
            autoComplete="email"
            type="email"
          />
        </label>
        <label>
          <span>What are we making?</span>
          <textarea
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder="A launch, a product, a very good idea..."
            rows="4"
          />
        </label>
        <button type="submit" className="send-button" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send enquiry'} <Send size={16} />
        </button>
        <p className="form-status" aria-live="polite">{status}</p>
      </form>
    </div>
  );
}

function PortfolioExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroPortraitY = useTransform(heroProgress, [0, 1], [0, -45]);

  return (
    <div className="portfolio-shell">
      <PointerWash />
      <motion.div className="reading-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Return to top">
          <span>RMV</span><i>°</i>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-status" href="#contact"><span /> Available for select work</a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mobile-nav"
          >
            {navigation.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={18} /></a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero" ref={heroRef}>
          <div className="hero__topline"><span>Independent full-stack developer</span><span>India / Worldwide</span></div>
          <motion.div className="hero__copy" style={{ y: heroTextY }}>
            <p className="eyebrow hero__eyebrow">Resmal Mubarak V — 2026</p>
            <h1>Clear thinking<br />for <em>complex</em><br />digital worlds.</h1>
            <div className="hero__intro">
              <p>I design and build expressive web products for people who care about the details — and the system underneath them.</p>
              <MagneticLink href="#work" className="round-link"><ArrowDown size={19} /><span>See selected work</span></MagneticLink>
            </div>
          </motion.div>

          <motion.div className="hero__portrait-wrap" style={{ y: heroPortraitY }}>
            <div className="hero__portrait-orbit"><span>BUILD WITH INTENTION · BUILD WITH INTENTION · </span></div>
            <div className="hero__portrait">
              <img src={profileImage} alt="Resmal Mubarak V" fetchPriority="high" />
              <span className="hero__portrait-caption">MERN / product / motion</span>
            </div>
          </motion.div>
          <div className="hero__index"><span>(01 — 05)</span><span>Scroll to explore</span></div>
        </section>

        <section className="manifesto" id="approach">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            The best digital products feel <em>obvious</em> on the surface and extraordinarily well-resolved beneath it.
          </motion.p>
          <div className="manifesto__notes">
            <span>Based in Palakkad, Kerala</span>
            <span>Building for ambitious teams</span>
            <ArrowDownRight size={22} />
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected work / 2024—26</p>
            <h2>Things worth<br /><em>opening.</em></h2>
            <p>Each project is a balance of visual taste, customer clarity, and dependable engineering.</p>
          </div>
          <div className="projects-list">
            {projects.map((project, index) => <ProjectPanel project={project} index={index} key={project.name} />)}
          </div>
        </section>

        <section className="systems-section" id="capabilities">
          <div className="systems-section__heading">
            <p className="eyebrow">What I bring to the table</p>
            <h2>Full-stack, <em>full picture.</em></h2>
            <p>From a first sketch to production, every decision is connected. Good product work needs both range and care.</p>
          </div>
          <div className="capability-list">
            {capabilities.map(([number, title, description]) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="capability"
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowRight size={20} />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="stack-ticker" aria-label="Technical toolkit">
          <div><span>React 19</span><span>TypeScript</span><span>Express</span><span>MongoDB</span><span>Tailwind</span><span>Cloudinary</span><span>PayPal</span><span>Vite</span></div>
          <div aria-hidden="true"><span>React 19</span><span>TypeScript</span><span>Express</span><span>MongoDB</span><span>Tailwind</span><span>Cloudinary</span><span>PayPal</span><span>Vite</span></div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-section__heading">
            <p className="eyebrow">A good conversation starts here</p>
            <h2>Have something<br /><em>in mind?</em></h2>
            <p>Whether it is a new product, a sharper web presence, or a tricky implementation, I’d like to hear about it.</p>
            <div className="contact-location"><MapPin size={17} /> Palakkad, Kerala / working globally</div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Resmal Mubarak V</p>
        <div>
          <a href="https://github.com/ResmalMubarakV" target="_blank" rel="noreferrer"><FaGithub size={17} /> GitHub</a>
          <a href="https://www.linkedin.com/in/resmal-mubarak-v/" target="_blank" rel="noreferrer"><FaLinkedin size={17} /> LinkedIn</a>
          <a href="mailto:resmalmubarakv@gmail.com"><Mail size={17} /> Email</a>
        </div>
        <a href="#top" className="back-to-top">Back to top <ArrowUpRight size={16} /></a>
      </footer>
    </div>
  );
}

export default PortfolioExperience;
