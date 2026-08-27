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
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Menu,
  Plus,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import profileImage from '../../assets/profile.webp';
import avoraImage from '../../assets/avora-optimized.jpg';
import zaaishImage from '../../assets/demo1-optimized.jpg';
import dreamlandsImage from '../../assets/dreamlands-optimized.jpg';

const navigation = [
  { label: 'Index', href: '#index' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const projects = [
  {
    id: '01',
    year: '2025',
    title: 'Avora',
    type: 'Travel journal / Full stack',
    statement: 'An intimate digital keepsake for journeys that deserve more than a camera roll.',
    description: 'Private entries, expressive media uploads, and a resilient MERN foundation designed to keep personal stories close.',
    image: avoraImage,
    tint: 'violet',
    tools: 'React · Express · MongoDB · Cloudinary',
    live: 'https://avorawayfarer.vercel.app',
    code: 'https://github.com/ResmalMubarakV/avora',
  },
  {
    id: '02',
    year: '2025',
    title: 'Zaaish',
    type: 'Luxury commerce / Full stack',
    statement: 'A fashion storefront shaped around confidence, not friction.',
    description: 'An end-to-end retail environment balancing a considered customer journey with payments, invoices, and admin operations.',
    image: zaaishImage,
    tint: 'lime',
    tools: 'React · Node.js · PayPal · PDF automation',
    live: 'https://zaaish-ecommerce.vercel.app',
    code: 'https://github.com/ResmalMubarakV/zaaish_ecommerce',
  },
  {
    id: '03',
    year: '2024',
    title: 'Dreamlands',
    type: 'Real estate / Client delivery',
    statement: 'A polished front door for ambitious property decisions.',
    description: 'A fast, editorial real-estate experience built to convert intent into direct conversations on every device.',
    image: dreamlandsImage,
    tint: 'rose',
    tools: 'React · TypeScript · SEO · WhatsApp leads',
    live: 'https://www.dreamlandsproperties.com',
    code: 'https://github.com/ResmalMubarakV/dreamlands-properties',
  },
];

const disciplines = [
  ['01', 'First impression', 'Narrative, visual direction, motion, and the moments that turn attention into trust.'],
  ['02', 'The system', 'React architecture, accessible interfaces, deliberate states, and a frontend that stays graceful as it grows.'],
  ['03', 'The engine', 'Express APIs, MongoDB data models, authentication, cloud media, and integrations that earn their keep.'],
  ['04', 'The release', 'Performance, SEO, deployment, analytics, and the polish that makes a build feel ready for the world.'],
];

function SignalField() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 85, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 85, damping: 30 });
  const light = useMotionTemplate`radial-gradient(510px circle at ${smoothX}px ${smoothY}px, rgba(141, 110, 255, 0.16), transparent 68%)`;

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) return null;
  return <motion.div aria-hidden="true" className="signal-field" style={{ background: light }} />;
}

function MagneticAnchor({ href, className, children, ...props }) {
  const buttonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });

  const follow = (event) => {
    if (!buttonRef.current || shouldReduceMotion || event.pointerType === 'touch') return;
    const rect = buttonRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onPointerMove={follow}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={shouldReduceMotion ? undefined : { x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function Reveal({ children, className = '', delay = 0, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 38, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectFeature({ project, index }) {
  const featureRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: featureRef,
    offset: ['start end', 'end start'],
  });
  const frameY = useTransform(scrollYProgress, [0, 0.5, 1], [72, 0, -72]);
  const frameScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.94]);
  const frameRotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 ? -4 : 4, index % 2 ? -1.5 : 1.5, index % 2 ? -3 : 3]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.2, 1, 1, 0.25]);
  const copyY = useTransform(scrollYProgress, [0, 0.5, 1], [52, 0, -42]);

  return (
    <article ref={featureRef} className={`nocturne-project nocturne-project--${project.tint}`}>
      <div className="nocturne-project__grid">
        <motion.div style={{ y: copyY }} className="nocturne-project__copy">
          <div className="nocturne-project__index"><span>{project.id}</span><span>{project.year}</span></div>
          <p className="micro-label">{project.type}</p>
          <h3>{project.title}</h3>
          <p className="nocturne-project__statement">{project.statement}</p>
          <p className="nocturne-project__description">{project.description}</p>
          <div className="nocturne-project__links">
            <a href={project.live} target="_blank" rel="noreferrer">Live experience <ArrowUpRight size={17} /></a>
            <a href={project.code} target="_blank" rel="noreferrer"><FaGithub size={17} /> Source</a>
          </div>
        </motion.div>

        <div className="nocturne-project__media">
          <motion.div
            className="nocturne-project__media-frame"
            style={{ y: frameY, scale: frameScale, rotate: frameRotate, opacity: frameOpacity }}
          >
            <img src={project.image} alt={`${project.title} project preview`} loading="lazy" decoding="async" />
            <div className="nocturne-project__cursor-note">Open case study <ArrowUpRight size={16} /></div>
          </motion.div>
          <p className="nocturne-project__tools">{project.tools}</p>
        </div>
      </div>
      <span className="nocturne-project__ghost" aria-hidden="true">0{index + 1}</span>
    </article>
  );
}

function ContactModule() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText('resmalmubarakv@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setNotice('Copy is unavailable in this browser. The address is shown above.');
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (values.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(values.email) || values.message.trim().length < 10) {
      setNotice('Please add your details and a little context for the project.');
      return;
    }
    setSending(true);
    setNotice('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_arjvfnr',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_zl7segi',
        { ...values, reply_to: values.email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'fFWl2ZTAycsCpqRnT',
      );
      setValues({ name: '', email: '', message: '' });
      setNotice('Received. I’ll get back to you shortly.');
    } catch {
      setNotice('The form did not send. Please reach out by email instead.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-module">
      <div className="contact-module__top">
        <p className="micro-label">Direct line</p>
        <a href="mailto:resmalmubarakv@gmail.com">resmalmubarakv@gmail.com</a>
        <button type="button" onClick={copyAddress}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy email'}</button>
      </div>
      <form onSubmit={submit} className="nocturne-form" noValidate>
        <label><span>Name</span><input value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} placeholder="Your name" autoComplete="name" /></label>
        <label><span>Email</span><input type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} placeholder="you@company.com" autoComplete="email" /></label>
        <label><span>Project note</span><textarea rows="4" value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} placeholder="Tell me what is on your mind..." /></label>
        <button className="nocturne-form__submit" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <Send size={16} /></button>
        <p className="nocturne-form__notice" aria-live="polite">{notice}</p>
      </form>
    </div>
  );
}

function ScrollSignature() {
  const signatureRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: signatureRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-38%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={signatureRef} className="scroll-signature" aria-label="Design and engineering statement">
      <motion.div className="scroll-signature__track" style={{ x, rotate }}>
        <span>Thoughtful by design</span><i>✳</i><span>Resilient by default</span><i>✳</i><span>Thoughtful by design</span><i>✳</i><span>Resilient by default</span>
      </motion.div>
      <div className="scroll-signature__line"><span>Scroll-linked type / 02</span><span>Keep going ↓</span></div>
    </section>
  );
}

function NocturnePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 26, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 155]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(heroProgress, [0.55, 1], [1, 0]);

  return (
    <div className="nocturne-shell">
      <SignalField />
      <motion.div className="nocturne-progress" style={{ scaleX: progress }} />

      <header className="nocturne-header">
        <a className="nocturne-logo" href="#top" aria-label="Back to top"><span>R</span><i>·</i><span>M</span><i>·</i><span>V</span></a>
        <nav className="nocturne-nav" aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
        </nav>
        <a className="availability" href="#contact"><span /> Open to meaningful work</a>
        <button type="button" className="nocturne-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation">{menuOpen ? <X size={21} /> : <Menu size={22} />}</button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="nocturne-mobile-nav" initial={{ opacity: 0, scale: 0.98, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -10 }}>
            {navigation.map((item) => <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={18} /></a>)}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="nocturne-hero" id="index" ref={heroRef}>
          <div className="nocturne-hero__top"><span>Resmal Mubarak V</span><span>Full stack developer / India</span></div>
          <motion.div className="nocturne-hero__headline" style={{ y: heroY, opacity: heroOpacity }}>
            <p className="micro-label"><Sparkles size={13} /> Independent digital practice — 2026</p>
            <h1>Build what<br /><em>they remember.</em></h1>
            <div className="nocturne-hero__summary">
              <p>I create distinctive, high-performing digital products where obsessive visual craft meets robust full-stack engineering.</p>
              <MagneticAnchor href="#work" className="hero-action"><span>Selected work</span><ArrowDown size={18} /></MagneticAnchor>
            </div>
          </motion.div>
          <motion.div className="nocturne-hero__portrait" style={{ y: portraitY }}>
            <div className="portrait-sigil"><span>RMV</span><span>RMV</span><span>RMV</span><span>RMV</span></div>
            <img src={profileImage} alt="Resmal Mubarak V" fetchPriority="high" />
            <p>Building in public<br />with private standards</p>
          </motion.div>
          <div className="nocturne-hero__footer"><span>(scroll with intention)</span><span>01 — 05</span></div>
        </section>

        <section className="nocturne-intro">
          <Reveal className="nocturne-intro__copy" amount={0.4}>
            <p className="micro-label">A more complete kind of developer</p>
            <h2>Not just <em>how it works.</em><br />How it <em>feels.</em></h2>
          </Reveal>
          <Reveal className="nocturne-intro__aside" delay={0.1} amount={0.4}>
            <p>My work lives at the overlap of design instinct and systems thinking. I care about the first second, the fiftieth interaction, and the infrastructure that lets both happen beautifully.</p>
            <div><span>03</span><p>Live products<br />in the world</p><span>25+</span><p>Purposeful<br />API endpoints</p></div>
          </Reveal>
        </section>

        <ScrollSignature />

        <section className="nocturne-work" id="work">
          <Reveal className="nocturne-work__heading">
            <p className="micro-label">Selected projects / a closer look</p>
            <h2>Proof,<br /><em>not promises.</em></h2>
          </Reveal>
          <div className="nocturne-projects">
            {projects.map((project, index) => <ProjectFeature key={project.id} project={project} index={index} />)}
          </div>
        </section>

        <section className="nocturne-process" id="process">
          <div className="nocturne-process__background"><span>Method</span><span>Method</span></div>
          <Reveal className="nocturne-process__heading">
            <p className="micro-label">How the work gets made</p>
            <h2>One vision.<br /><em>Every layer.</em></h2>
            <p>I carry a project across the entire product arc, keeping the experience coherent from the first pixel to the last API response.</p>
          </Reveal>
          <div className="discipline-list">
            {disciplines.map(([number, name, description], index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.62, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{number}</span><h3>{name}</h3><p>{description}</p><ArrowRight size={18} />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="nocturne-statement">
          <div className="statement-orb"><Plus size={26} /><span>Full stack</span></div>
          <Reveal>
            <p>Quietly <em>technical.</em><br />Unmistakably <em>human.</em></p>
          </Reveal>
          <div className="statement-stack"><span>React 19</span><span>TypeScript</span><span>Node.js</span><span>Express</span><span>MongoDB</span><span>Cloudinary</span><span>Vercel</span><span>Render</span></div>
        </section>

        <section className="nocturne-contact" id="contact">
          <Reveal className="nocturne-contact__heading">
            <p className="micro-label">Start somewhere good</p>
            <h2>Let’s make<br /><em>an impact.</em></h2>
            <p>Available for ambitious product teams, thoughtful freelance engagements, and the right long-term collaborations.</p>
            <span><MapPin size={16} /> Palakkad, Kerala — working globally</span>
          </Reveal>
          <Reveal className="nocturne-contact__form" delay={0.12}><ContactModule /></Reveal>
        </section>
      </main>

      <footer className="nocturne-footer">
        <span>© {new Date().getFullYear()} Resmal Mubarak V</span>
        <div><a href="https://github.com/ResmalMubarakV" target="_blank" rel="noreferrer"><FaGithub size={17} /> GitHub</a><a href="https://www.linkedin.com/in/resmal-mubarak-v/" target="_blank" rel="noreferrer"><FaLinkedin size={17} /> LinkedIn</a><a href="mailto:resmalmubarakv@gmail.com"><Mail size={17} /> Email</a></div>
        <a href="#top">Back to top <ArrowUpRight size={16} /></a>
      </footer>
    </div>
  );
}

export default NocturnePortfolio;
