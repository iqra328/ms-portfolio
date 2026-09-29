import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls, Sparkles } from '@react-three/drei';
import './styles.css';

const projects = [
  { number: '01 / 04', title: 'MERN Learning Hub', type: 'React / Node.js / MongoDB', year: '2024', category: 'Interactive', className: 'visual-orbit', label: 'BUILD', description: 'A focused learning platform for practical JavaScript and MERN development.', image: '/project%202.jpg' },
  { number: '02 / 04', title: 'Course Management API', type: 'Express / REST API / Auth', year: '2024', category: 'Experience', className: 'visual-coral', label: 'SHIP', description: 'A secure backend for courses, learners, progress tracking, and role-based access.', image: '/project%203.jpg' },
  { number: '03 / 04', title: 'E-commerce Dashboard', type: 'React / Redux / UX', year: '2023', category: 'Identity', className: 'visual-blue', label: 'SCALE', description: 'A responsive admin experience for managing products, orders, and customer insights.', image: '/project%205.jpg' },
  { number: '04 / 04', title: 'Student Portfolio Lab', type: 'Mentorship / Frontend', year: '2023', category: 'Identity', className: 'visual-green', label: 'GROW', description: 'A guided portfolio builder helping students turn their skills into a real web presence.', image: '/project%206.jpg' },
];

const experiences = [
  { id: 'hightable', company: 'High Table Tech', monogram: 'HT', role: 'Frontend Developer', type: 'Full-time', period: 'Jun 2024 — Present', duration: '2 yrs 4 mos', location: 'Online · Remote', status: 'Current', accent: '#d8fa56', tags: ['React.js', 'UI engineering', 'Component architecture', 'Responsive UI'], detail: 'Building production frontend at High Table Tech — component-driven React interfaces, consistent design systems, and fast, accessible product screens.' },
  { id: 'smit', company: 'Saylani Mass IT Training', monogram: 'SM', role: 'Lead Trainer', type: 'Part-time', period: 'Jun 2024 — Present', duration: '2 yrs 4 mos', location: 'Karachi, Sindh, Pakistan · On-site', status: 'Current', accent: '#c9a6ff', tags: ['Curriculum design', 'Code reviews', 'MERN mentorship', 'Workshops'], detail: 'Leading practical MERN training at Saylani Mass IT Training online — designing real project paths, reviewing learner code, and turning beginners into builders who ship.' },
  { id: 'hydro', company: 'Hydro Web Solutions', monogram: 'HW', role: 'WordPress Developer', type: 'Internship', period: 'Oct 2023 — Jun 2024', duration: '9 mos', location: 'Karachi, Sindh, Pakistan · Remote', status: 'Previous', accent: '#85b7ff', tags: ['WordPress', 'Theme development', 'CMS setup', 'SEO basics'], detail: 'WordPress internship at Hydro Web Solutions — building custom themes, page templates, and CMS-driven sites with clean, responsive layouts and structured content.' },
  { id: 'nextrevol', company: 'NextRevol', monogram: 'NR', role: 'Frontend Developer', type: 'Internship', period: 'Aug 2023 — Oct 2023', duration: '3 mos', location: 'Karachi, Sindh, Pakistan', status: 'Internship', accent: '#f36f5f', tags: ['Frontend', 'Dashboards', 'Team collaboration'], detail: 'Internship at NextRevol building frontend features — turning designs into working UI, learning team workflows, and shipping real dashboard screens.' },
];

const education = [
  { degree: 'Web & Mobile App Development', level: 'Certification', institution: 'Saylani Mass IT Training (SMIT)', year: '2023 — 2024', tag: 'SM', accent: '#d8fa56', description: 'Advanced practical training in web and mobile app development — building real MERN projects, REST APIs, and app interfaces that reach production.' },
  { degree: 'Diploma in Information Technology', level: 'Diploma', institution: 'Green Institute of IT', year: '2021 — 2022', tag: 'GI', accent: '#85b7ff', description: 'A foundational IT diploma covering programming, networking, and modern office systems — the base that made a career in code feel possible.' },
  { degree: 'B.A · Bachelor of Arts', level: 'Graduation', institution: 'Graduated in Arts', year: '2020 — 2023', tag: 'BA', accent: '#f36f5f', description: 'Graduated in Arts while sharpening development skills on the side — formal study balanced with hands-on coding, right after pre-engineering.' },
  { degree: 'Intermediate · Pre-Engineering', level: 'Intermediate', institution: 'Board of Secondary Education', year: '2018 — 2020', tag: 'BSE', accent: '#f4f2e9', description: 'Pre-engineering from the Board of Secondary Education — mathematics and science foundations that built strong problem-solving habits.' },
];

const skillGroups = [
  { title: 'Frontend', icon: '</>', items: ['React.js', 'Next.js', 'JavaScript ES6+', 'TypeScript', 'Redux Toolkit', 'GSAP', 'Framer Motion'] },
  { title: 'Backend', icon: '◈', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Socket.io'] },
  { title: 'Data & Services', icon: '◎', items: ['MongoDB', 'Firebase', 'Cloudinary', 'Stripe', 'AI API Integration'] },
  { title: 'Deploy & Tools', icon: '⚙', items: ['Git & GitHub', 'Vercel', 'Render', 'Responsive Design'] },
];
const tickerSkills = ['React.js', 'JavaScript ES6+', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Redux Toolkit', 'Firebase', 'JWT', 'Git & GitHub', 'TypeScript', 'GSAP', 'Framer Motion', 'Cloudinary', 'Stripe', 'Socket.io', 'AI API Integration', 'Vercel', 'Render'];
const tickIcons = (cls) => <i className={`devicon-${cls}`} />;
const skillIcons = {
  'React.js': tickIcons('react-plain'),
  'JavaScript ES6+': tickIcons('javascript-plain'),
  'Next.js': tickIcons('nextjs-plain'),
  'Node.js': tickIcons('nodejs-plain'),
  'Express.js': tickIcons('express-original'),
  'MongoDB': tickIcons('mongodb-plain'),
  'REST APIs': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M6.6 6.6l3 3M17.4 6.6l-3 3M14.4 14.4l3 3M9.6 14.4l-3 3" /></svg>,
  'Redux Toolkit': tickIcons('redux-original'),
  'Firebase': tickIcons('firebase-plain'),
  'JWT': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>,
  'Git & GitHub': tickIcons('github-original'),
  'TypeScript': tickIcons('typescript-plain'),
  'GSAP': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  'Framer Motion': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  'Cloudinary': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
  'Stripe': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
  'Socket.io': tickIcons('socketio-original'),
  'AI API Integration': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>,
  'Vercel': tickIcons('vercel-original'),
  'Render': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
};
const roles = ['MERN Stack Developer', 'Frontend Dev @ High Table Tech', 'Lead Trainer @ SMIT'];
const aboutTabs = [
  { label: 'Profile', title: 'Minahil Irfan.', text: 'I am a MERN stack developer and trainer who builds thoughtful digital products with JavaScript, React, Node.js, Express, and MongoDB. My work sits between strong engineering and human-friendly design.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Craft', title: 'Full stack, fully involved.', text: 'From responsive interfaces to secure REST APIs, authentication, dashboards, and deployment, I enjoy owning the complete journey from a rough idea to a reliable web experience.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Mentorship', title: 'Helping others grow.', text: 'As a developer trainer, I guide students through practical JavaScript and MERN projects, code reviews, and the confidence to move from tutorials to real products.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80' },
];
const services = [
  { icon: '</>', title: 'Full-Stack Web Development', text: 'Scalable MERN applications with React, Node.js, Express, and MongoDB for real-world products.' },
  { icon: '✦', title: 'Training & Mentorship', text: 'Practical JavaScript and MERN learning paths that help students become job-ready builders.' },
  { icon: '◈', title: 'Frontend Experiences', text: 'Responsive interfaces with clear structure, thoughtful motion, and a polished user experience.' },
  { icon: '↗', title: 'Technical Direction', text: 'Helping teams turn rough ideas into focused features, maintainable architecture, and shipped work.' },
];

const testimonials = [
  { quote: "Minahil didn't just teach me React — she showed me how to think like a developer. Her feedback on my TaskFlow project is why I cleared my first technical interview.", name: 'Ahmed Raza', role: 'MERN student → frontend intern', initials: 'AR' },
  { quote: 'Clear communication, solid MERN instincts, and real ownership. Minahil took charge of both the API layer and the frontend with the same calm care.', name: 'Product Lead', role: 'Freelance client', initials: 'PL' },
  { quote: 'The rare developer who can explain complex systems without ego. Every workshop Minahil runs is a shortcut for someone else learning.', name: 'Dev Colleague', role: 'SMIT team', initials: 'DC' },
  { quote: 'From idea to deployment, Minahil kept everything on track — no jargon, no drama, just working software and honest timelines.', name: 'Client', role: 'WordPress project', initials: 'CL' },
];

const portraitImage = '/profile-professional.jpg';

const studentWorks = [
  { id: 'taskflow', category: 'MERN Apps', student: 'Ahmed Raza', title: 'TaskFlow', stack: 'React · Node · Express · MongoDB', description: 'A collaborative task manager built end to end — students learn auth, CRUD, and live progress tracking across the whole stack.', tags: ['Auth', 'CRUD', 'REST API'], image: '/student-pro-1.jpg' },
  { id: 'shopverse', category: 'MERN Apps', student: 'Fatima Noor', title: 'ShopVerse', stack: 'React · Express · Mongoose', description: 'A lightweight e-commerce store with product catalog, cart state, and an admin panel — a complete first MERN journey.', tags: ['Cart', 'Admin', 'Inventory'], image: '/student%20proj%20-2.jpg' },
  { id: 'blogwave', category: 'MERN Apps', student: 'Usman Ali', title: 'BlogWave', stack: 'React · Node · Markdown · MongoDB', description: 'A writing-first blog engine with editor, comments, and tags — practicing real data modeling instead of tutorials.', tags: ['CRUD', 'Markdown', 'Comments'], image: '/student-pro-4.jpg' },
  { id: 'weatherly', category: 'Frontend', student: 'Hira Saeed', title: 'Weatherly', stack: 'JavaScript · Fetch API · CSS Grid', description: 'A weather dashboard built against a live API with search, geolocation, and a clean responsive layout.', tags: ['APIs', 'Responsive', 'State'], image: '/stu-pro-5.jpg' },
  { id: 'volt', category: 'Frontend', student: 'Bilal Khan', title: 'Volt Landing', stack: 'HTML · CSS · Vanilla JS', description: 'A bold product landing page with scroll animations and accessible interactions — design meets discipline.', tags: ['Animation', 'Accessibility'], image: '/student-pro-6.jpg' },
  { id: 'typerush', category: 'Mini Tools', student: 'Zara Ahmed', title: 'TypeRush', stack: 'JavaScript · Timer · Web Storage', description: 'A typing-speed trainer with words-per-minute tracking and localStorage-backed score history.', tags: ['JS Logic', 'Timer', 'Storage'], image: '/WhatsApp_Image_2026-06-02_at_10.47.56_AM_k0vmnf.jpg' },
];

function Sculpture() {
  const group = useRef();
  const moduleRefs = useRef([]);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.34) * 0.1 + 0.28;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.11;
    moduleRefs.current.forEach((module, index) => {
      if (!module) return;
      module.rotation.y -= delta * (0.6 + index * 0.08);
      module.rotation.x = Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.18;
    });
  });
  const stackModules = [
    { position: [1.7, .7, .15], color: '#48b06a', rotation: [0.12, -.35, .1] },
    { position: [-1.5, .76, .15], color: '#f4f2e9', rotation: [.08, .32, -.1] },
    { position: [-1.35, -1.05, .1], color: '#61dafb', rotation: [.12, -.2, .12] },
    { position: [1.38, -1.08, .05], color: '#d8fa56', rotation: [-.08, .2, -.1] },
  ];
  return (
    <group ref={group} rotation={[0.28, 0, 0]}>
      <mesh rotation={[1.25, 0, 0]}>
        <torusGeometry args={[1.85, .018, 12, 100]} />
        <meshBasicMaterial color="#d8fa56" transparent opacity={.62} />
      </mesh>
      <mesh rotation={[.88, .72, .42]}>
        <torusGeometry args={[1.48, .025, 12, 100]} />
        <meshBasicMaterial color="#f4f2e9" transparent opacity={.32} />
      </mesh>
      <Float speed={1.5} rotationIntensity={.12} floatIntensity={.28}>
        <mesh scale={.62} rotation={[.3, .7, .2]}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshTransmissionMaterial backside samples={4} thickness={.7} chromaticAberration={.08} transmission={.9} roughness={.12} color="#d8fa56" />
        </mesh>
      </Float>
      <mesh scale={.23} rotation={[.2, .4, .1]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#f4f2e9" metalness={.7} roughness={.16} />
      </mesh>
      {stackModules.map((item, index) => (
        <group key={item.color} position={item.position} rotation={item.rotation} ref={(node) => { moduleRefs.current[index] = node; }}>
          <mesh>
            <boxGeometry args={[.62, .62, .22]} />
            <meshStandardMaterial color={item.color} metalness={.5} roughness={.22} emissive={item.color} emissiveIntensity={.12} />
          </mesh>
          <mesh position={[0, 0, .13]} scale={[.45, .45, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#101712" transparent opacity={.42} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.9], fov: 34 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 5]} intensity={3.4} color="#f4f2e9" />
      <pointLight position={[-3, -2, 2]} intensity={8} color="#d8fa56" />
      <pointLight position={[2, 1, 3]} intensity={5} color="#61dafb" />
      <Sparkles count={75} scale={[5.5, 4.5, 3]} size={2.2} speed={.35} color="#d8fa56" />
      <Sculpture />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.7} rotateSpeed={0.7} />
    </Canvas>
  );
}

function ProjectCard({ project }) {
  const tiltCard = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    card.style.setProperty('--tilt-x', `${-y * 5}deg`);
    card.style.setProperty('--tilt-y', `${x * 7}deg`);
    card.style.setProperty('--glow-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    card.style.setProperty('--glow-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };
  return (
    <article className={`project-card ${project.className}`} onMouseMove={tiltCard} onMouseLeave={(event) => event.currentTarget.removeAttribute('style')}>
      <div className="project-visual">
        <img className="project-image" src={project.image} alt={`${project.title} preview`} loading="lazy" />
        <div className="project-image-shade" />
        {project.className === 'visual-orbit' && <><span className="visual-word">{project.label}</span><div className="visual-ring ring-a" /><div className="visual-ring ring-b" /><div className="visual-core" /></>}
        {project.className === 'visual-coral' && <><span className="visual-caption">MATERIAL<br />MEMORIES</span><span className="visual-sun" /><span className="visual-wave" /></>}
        {project.className === 'visual-blue' && <><span className="blue-copy">SOFT<br /><strong>POWER</strong></span><div className="blue-shape" /></>}
        {project.className === 'visual-green' && <><div className="green-grid" /><span className="green-copy">FIELD<br /><em>NOTES</em></span><span className="green-stamp">STUDIO<br />/ 04</span></>}
      </div>
      <div className="project-meta"><div><p className="project-number">{project.number}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div><p className="project-type">{project.type}<br /><b>{project.year}</b></p><a className="round-arrow" href="#contact" aria-label={`Discuss ${project.title} project`}>↗</a></div>
    </article>
  );
}

function MiniProjectCard({ project, number }) {
  return (
    <article className="project-card project-card-mini">
      <div className="project-mini-visual">
        <img className="project-image" src={project.image} alt={`${project.title} preview`} loading="lazy" />
        <div className="project-mini-shade" />
        <span className="project-mini-tag">0{number}</span>
        <div className="project-mini-copy"><h3>{project.title}</h3><p>{project.type}<br />{project.year}</p></div>
      </div>
    </article>
  );
}

function ProjectsSlider({ projects: sliderProjects }) {
  if (!sliderProjects.length) return <p className="empty-projects">No projects in this category yet.</p>;
  const drop = [...sliderProjects, ...sliderProjects];
  return (
    <div className="projects-carousel">
      <div className="projects-carousel-viewport">
        <div className="projects-carousel-track" style={{ '--drop-duration': `${Math.max(8, sliderProjects.length * 2)}s` }}>
          {drop.map((project, i) => <div className="projects-carousel-drop" key={`${project.title}-${i}`}><MiniProjectCard project={project} number={(i % sliderProjects.length) + 1} /></div>)}
        </div>
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  const circumference = 2 * Math.PI * 19;
  return <a className="scroll-progress" href="#top" aria-label="Back to top" style={{ '--scroll-dash': circumference, '--scroll-offset': circumference * (1 - progress) }}><svg viewBox="0 0 44 44" aria-hidden="true"><circle className="progress-track" cx="22" cy="22" r="19" /><circle className="progress-value" cx="22" cy="22" r="19" /></svg><span>{Math.round(progress * 100)}%</span></a>;
}

function HeroBackdrop() {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let visible = true;
    const sync = () => {
      if (visible) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(video);
    sync();
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`hero-backdrop ${failed ? 'is-fallback' : ''}`} aria-hidden="true">
      {!failed && <video ref={videoRef} className="hero-background-video" poster="/hero-code-matrix.jpg" autoPlay muted loop playsInline preload="metadata" onError={() => setFailed(true)}><source src="/hero-code-matrix.mp4" type="video/mp4" /></video>}
      <div className="hero-video-overlay" />
    </div>
  );
}

const terminalLines = ['npm run build', 'node server.js', 'git push origin main'];

function TerminalHint() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const line = terminalLines[lineIndex];
  useEffect(() => {
    let delay = deleting ? 26 : 65;
    if (!deleting && typed.length === line.length) delay = 2000;
    if (deleting && typed.length === 0) delay = 400;
    const timer = window.setTimeout(() => {
      if (!deleting && typed.length === line.length) { setDeleting(true); return; }
      if (deleting && typed.length === 0) { setDeleting(false); setLineIndex((i) => (i + 1) % terminalLines.length); return; }
      setTyped((value) => (deleting ? line.slice(0, value.length - 1) : line.slice(0, value.length + 1)));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typed, deleting, lineIndex, line]);
  return <div className="hero-terminal" aria-hidden="true"><span className="hero-terminal-prompt">&gt;</span><span className="hero-terminal-code">{typed}<i className="terminal-caret" /></span></div>;
}

function ExperiencePanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tiltRef = useRef(null);
  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % experiences.length), 4200);
    return () => window.clearInterval(timer);
  }, [isPaused]);
  const tiltCard = (event) => {
    const el = tiltRef.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    el.style.setProperty('--tilt-rx', `${-py * 7}deg`);
    el.style.setProperty('--tilt-ry', `${px * 9}deg`);
  };
  const clearTilt = (event) => {
    event.currentTarget.style.removeProperty('--tilt-rx');
    event.currentTarget.style.removeProperty('--tilt-ry');
  };
  const active = experiences[activeIndex];
  return (
    <div className="experience-panel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="experience-roles" role="tablist" aria-label="Experience roles">{experiences.map((item, index) => <button type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? 'experience-role is-active' : 'experience-role'} onClick={() => setActiveIndex(index)} key={item.id}><span className="experience-role-logo" style={{ '--accent': item.accent }}>{item.monogram}</span><span className="experience-role-copy"><span className="experience-role-index">0{index + 1}</span><span className="experience-role-name">{item.role}</span><span className="experience-role-company">{item.company}</span></span><span className="experience-role-status">{item.status}</span></button>)}</div>
      <div className="experience-card" key={active.id}>
        <div className="experience-card-tilt" ref={tiltRef} onMouseMove={tiltCard} onMouseLeave={clearTilt}>
          <span className="experience-orb experience-orb-one" style={{ '--accent': active.accent }} aria-hidden="true" />
          <span className="experience-orb experience-orb-two" style={{ '--accent': active.accent }} aria-hidden="true" />
          <span className="experience-orb experience-orb-three" style={{ '--accent': active.accent }} aria-hidden="true" />
          {/* Company logo */}
          <div className="experience-logo-float" style={{ '--accent': active.accent }}><span className="experience-logo-ring experience-logo-ring-one" /><span className="experience-logo-ring experience-logo-ring-two" /><span className="experience-logo">{active.monogram}</span></div>
          <div className="experience-card-content">
            <div className="experience-card-meta"><span className="experience-card-index">0{activeIndex + 1} / 0{experiences.length}</span><span className="experience-card-period">{active.period} · <b>{active.duration}</b></span></div>
            <p className="eyebrow">{active.type} / {active.status}</p>
            <h3>{active.role}</h3>
            <p className="experience-card-place">{active.company}</p>
            <p className="experience-card-location">{active.location}</p>
            <p className="experience-card-detail">{active.detail}</p>
            <div className="experience-card-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <div className="experience-card-progress"><span style={{ width: `${((activeIndex + 1) / experiences.length) * 100}%` }} /></div>
        </div>
      </div>
    </div>
  );
}

function EducationPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % education.length), 4600);
    return () => window.clearInterval(timer);
  }, [isPaused]);
  const move = (direction) => setActiveIndex((index) => (index + direction + education.length) % education.length);
  return (
    <div className="education-panel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="education-cards">
        {education.map((item, index) => <article className={`education-card ${activeIndex === index ? 'is-active' : ''}`} style={{ '--accent': item.accent, '--flip': activeIndex === index ? 1 : 0, '--reveal-delay': `${index * 90}ms` }} onClick={() => setActiveIndex(index)} key={item.degree}><div className="education-card-inner"><div className="education-card-face education-card-front"><span className="education-card-watermark">0{index + 1}</span><div className="education-card-top"><span className="education-card-level">{item.level}</span><span className="education-card-tag">{item.tag}</span></div><div className="education-card-year">{item.year}</div><div className="education-card-copy"><h3>{item.degree}</h3><p>{item.institution}</p></div></div><div className="education-card-face education-card-back"><span className="education-card-back-label"><b>0{index + 1}</b>{item.level}</span><h3>{item.degree}</h3><p className="education-card-back-year">{item.year}</p><p className="education-card-back-institution">{item.institution}</p><p className="education-card-back-desc">{item.description}</p><span className="education-card-more">Open →</span></div></div></article>)}
      </div>
      <div className="education-footer">
        <div className="education-progress"><span style={{ width: `${((activeIndex + 1) / education.length) * 100}%` }} /></div>
        <div className="education-controls"><button type="button" className="education-arrow" onClick={() => move(-1)} aria-label="Previous education">←</button><div className="education-dots" role="tablist" aria-label="Choose education">{education.map((item, index) => <button type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? 'education-dot is-active' : 'education-dot'} onClick={() => setActiveIndex(index)} aria-label={`Show ${item.degree}`} key={item.degree} />)}</div><button type="button" className="education-arrow" onClick={() => move(1)} aria-label="Next education">→</button></div>
      </div>
    </div>
  );
}

function FeedbackNote() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['learners', 'clients', 'teammates'];
  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((index) => (index + 1) % words.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return <p className="section-note feedback-note">Straight from the <b key={wordIndex}>{words[wordIndex]}</b> who shaped the work.</p>;
}

function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => { setSlideDirection(1); setActiveIndex((index) => (index + 1) % testimonials.length); }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);
  const active = testimonials[activeIndex];
  const moveTestimonial = (direction) => {
    setSlideDirection(direction);
    setActiveIndex((index) => (index + direction + testimonials.length) % testimonials.length);
  };
  return (
    <div className="testimonial-slider" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <figure className={`testimonial-feature testimonial-feature-${slideDirection > 0 ? 'right' : 'left'}`} key={active.name}>
        <span className="testimonial-quote-mark" aria-hidden="true">"</span>
        <blockquote>{active.quote}</blockquote>
        <figcaption><span className="testimonial-avatar">{active.initials}</span><div><b>{active.name}</b><small>{active.role}</small></div><span className="testimonial-counter">0{activeIndex + 1} / 0{testimonials.length}</span></figcaption>
      </figure>
      <div className="testimonial-side">
        <p className="eyebrow">Who said it</p>
        <div className="testimonial-tabs" role="tablist" aria-label="Testimonials">{testimonials.map((item, index) => <button type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? 'testimonial-tab is-active' : 'testimonial-tab'} onClick={() => { setSlideDirection(index >= activeIndex ? 1 : -1); setActiveIndex(index); }} key={item.name}><b>0{index + 1}</b><span>{item.name}</span></button>)}</div>
        <div className="testimonial-controls"><button type="button" className="testimonial-arrow" onClick={() => moveTestimonial(-1)} aria-label="Previous testimonial">←</button><button type="button" className="testimonial-arrow" onClick={() => moveTestimonial(1)} aria-label="Next testimonial">→</button></div>
      </div>
    </div>
  );
}

function AboutProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const active = aboutTabs[activeTab];
  const changeTab = (nextIndex, direction = nextIndex >= activeTab ? 1 : -1) => { setSlideDirection(direction); setActiveTab(nextIndex); };
  const moveTab = (direction) => changeTab((activeTab + direction + aboutTabs.length) % aboutTabs.length, direction);
  useEffect(() => { const tabTimer = window.setInterval(() => { setActiveTab((index) => { setSlideDirection(index % 2 === 0 ? 1 : -1); return (index + 1) % aboutTabs.length; }); }, 4800); return () => window.clearInterval(tabTimer); }, []);
  return <div className="about-profile"><div className="profile-visual"><img src={portraitImage} alt="Professional developer portrait" /><div className="profile-image-wash" /><div className="profile-frame profile-frame-one" /><div className="profile-frame profile-frame-two" /><span className="profile-index">0{activeTab + 1} / 03</span><span className="profile-caption">Minahil Irfan / MERN Developer</span><div className="profile-progress"><span style={{ width: `${((activeTab + 1) / aboutTabs.length) * 100}%` }} /></div></div><div className="profile-info"><div className="profile-tabs" role="tablist" aria-label="About Minahil"><span className="tab-line" />{aboutTabs.map((tab, index) => <button className={activeTab === index ? 'profile-tab is-active' : 'profile-tab'} type="button" role="tab" aria-selected={activeTab === index} onClick={() => changeTab(index)} key={tab.label}>{tab.label}<b>0{index + 1}</b></button>)}</div><div className={`profile-copy profile-copy-${slideDirection > 0 ? 'right' : 'left'}`} key={activeTab}><p className="eyebrow">{active.label}</p><h3>{active.title}</h3><p>{active.text}</p></div><div className="profile-controls"><button type="button" onClick={() => moveTab(-1)} aria-label="Previous About panel">← <span>Previous</span></button><button type="button" onClick={() => moveTab(1)} aria-label="Next About panel"><span>Next</span> →</button></div></div></div>;
}

function StudentShowcase() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const studentTabs = ['All', 'MERN Apps', 'Frontend', 'Mini Tools'];
  const visibleWorks = activeTab === 'All' ? studentWorks : studentWorks.filter((work) => work.category === activeTab);
  const currentShow = visibleWorks.length ? activeIndex % visibleWorks.length : 0;
  const activeWork = visibleWorks[currentShow];
  useEffect(() => { setActiveIndex(0); setSlideDirection(1); }, [activeTab]);
  useEffect(() => {
    if (visibleWorks.length < 2 || isPaused) return undefined;
    const timer = window.setInterval(() => { setSlideDirection(1); setActiveIndex((index) => (index + 1) % visibleWorks.length); }, 4600);
    return () => window.clearInterval(timer);
  }, [visibleWorks.length, isPaused]);
  const moveWork = (direction) => {
    if (visibleWorks.length < 2) return;
    setSlideDirection(direction);
    setActiveIndex((index) => (index + direction + visibleWorks.length) % visibleWorks.length);
  };
  const shotRef = useRef(null);
  useEffect(() => {
    const shot = shotRef.current;
    const visual = shot ? shot.parentElement : null;
    if (!shot || !visual) return undefined;
    const apply = () => {
      const loaded = shot.querySelector('img');
      if (loaded && !loaded.complete) return;
      const offset = Math.max(0, shot.offsetHeight - visual.clientHeight);
      visual.style.setProperty('--shot-scroll', `${offset}px`);
    };
    apply();
    const img = shot.querySelector('img');
    if (img) img.addEventListener('load', apply);
    const resize = new ResizeObserver(apply);
    resize.observe(visual);
    return () => { if (img) img.removeEventListener('load', apply); resize.disconnect(); };
  }, [activeWork]);
  if (!activeWork) return null;
  return (
    <div className="student-showcase" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="student-showcase-head"><p className="eyebrow"><span className="eyebrow-dot" /> Student work / real builds</p><div className="student-tabs" role="tablist" aria-label="Filter student work">{studentTabs.map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'student-tab is-active' : 'student-tab'} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div></div>
      <div className="student-stage">
        <article className={`student-card student-card-${slideDirection > 0 ? 'right' : 'left'}`} key={activeWork.id}>
          <div className={`student-card-visual student-visual-${activeWork.category === 'MERN Apps' ? 'green' : activeWork.category === 'Frontend' ? 'blue' : 'coral'}`}>
            <div className="student-shot" ref={shotRef}>
              <img src={activeWork.image} alt={`${activeWork.title} — student project`} loading="lazy" />
            </div>
            <span className="student-visual-index">{String(currentShow + 1).padStart(2, '0')} / {String(visibleWorks.length).padStart(2, '0')}</span>
            <span className="student-visual-stamp">{activeWork.category}</span>
          </div>
          <div className="student-card-body"><p className="student-card-stack">{activeWork.stack}</p><h3>{activeWork.title}</h3><p className="student-card-by">built by a <b>student</b></p><p className="student-card-description">{activeWork.description}</p><div className="student-card-tags">{activeWork.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        </article>
        <div className="student-controls">
          <button type="button" className="student-arrow" onClick={() => moveWork(-1)} aria-label="Previous student project">←</button>
          <div className="student-dots" role="tablist" aria-label="Choose student project">{visibleWorks.map((work, index) => <button type="button" className={currentShow === index ? 'student-dot is-active' : 'student-dot'} onClick={() => setActiveIndex(index)} aria-label={`Show ${work.title}`} key={work.id} />)}</div>
          <div className="student-count">{String(currentShow + 1).padStart(2, '0')} / {String(visibleWorks.length).padStart(2, '0')}</div>
          <button type="button" className="student-arrow" onClick={() => moveWork(1)} aria-label="Next student project">→</button>
        </div>
      </div>
    </div>
  );
}

const MESSAGES_KEY = 'minahil_contact_messages_v1';
const OWNER = { phone: '0335-2381776', whatsapp: '0335-2381776', whatsappIntl: '923352381776', email: 'duashaikh603@gmail.com', location: 'Gulshan-e-Hadeed, Karachi' };
const getMessages = () => { try { return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || []; } catch { return []; } };
const saveMessage = (message) => { const all = getMessages(); all.push(message); localStorage.setItem(MESSAGES_KEY, JSON.stringify(all)); };
const msgCount = () => getMessages().filter((message) => !message.read).length;
const sendToWhatsApp = (sent) => {
  const text = [`New message from your portfolio`, ``, `Name: ${sent.name}`, `Email: ${sent.email}`, `Subject: ${sent.subject}`, ``, `Message:`, sent.message, ``, `Sent via portfolio contact form`].join('\n');
  window.open(`https://wa.me/${OWNER.whatsappIntl}?text=${encodeURIComponent(text)}`, '_blank');
};

function ContactForm({ onSent }) {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Project inquiry', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [lastSent, setLastSent] = useState(null);
  const subjects = ['Project inquiry', 'Training / Mentorship', 'Freelance work', 'Just saying hello'];
  const update = (field) => (event) => { setForm((value) => ({ ...value, [field]: event.target.value })); setErrors((value) => ({ ...value, [field]: undefined })); };
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) nextErrors.message = 'A few more words — at least 10 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const sent = { name: form.name.trim(), email: form.email.trim(), subject: form.subject, message: form.message.trim() };
    setStatus('sending');
    setLastSent(null);
    window.setTimeout(() => {
      saveMessage({ id: `msg_${Date.now()}`, ...sent, createdAt: new Date().toISOString(), read: false });
      sendToWhatsApp(sent);
      setLastSent(sent);
      setStatus('success');
      setForm({ name: '', email: '', subject: 'Project inquiry', message: '' });
      if (onSent) onSent();
    }, 850);
  };
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-head"><span className="contact-form-status"><i /> Replies within 24h</span><span className="contact-form-sep" /></div>
      <div className="contact-field-row">
        <div className={`contact-field ${errors.name ? 'has-error' : ''}`}><label htmlFor="contact-name">Name</label><input id="contact-name" type="text" placeholder="Your name" value={form.name} onChange={update('name')} autoComplete="name" /><span className="contact-field-error">{errors.name}</span></div>
        <div className={`contact-field ${errors.email ? 'has-error' : ''}`}><label htmlFor="contact-email">Email</label><input id="contact-email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} autoComplete="email" /><span className="contact-field-error">{errors.email}</span></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-subject">Subject</label><div className="contact-select-wrap"><select id="contact-subject" value={form.subject} onChange={update('subject')}>{subjects.map((option) => <option key={option}>{option}</option>)}</select><span className="contact-select-arrow">▾</span></div></div>
      <div className={`contact-field ${errors.message ? 'has-error' : ''}`}><label htmlFor="contact-message">Message</label><textarea id="contact-message" rows={5} placeholder="Tell me about your project, training, or idea…" value={form.message} onChange={update('message')} /><span className="contact-field-error">{errors.message}</span><span className="contact-field-count">{form.message.length} / 600</span></div>
      <button className="contact-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <span className="contact-submit-spinner" /> : <span className="contact-submit-arrow" aria-hidden="true">↗</span>}<b>{status === 'sending' ? 'Sending…' : 'Send message'}</b></button>
      {status === 'success' && lastSent ? <div className="contact-success"><span aria-hidden="true">✓</span><div><b>Sent — WhatsApp & inbox.</b><small>Thanks {lastSent.name}, your message is on its way to the owner.</small></div></div> : null}
    </form>
  );
}

function MessagesInbox({ onClose }) {
  const [messages, setMessages] = useState(getMessages());
  const [activeId, setActiveId] = useState(null);
  const [inboxFilter, setInboxFilter] = useState('all');
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const refresh = () => setMessages(getMessages());
  const unread = messages.filter((message) => !message.read).length;
  const visible = messages.filter((message) => (inboxFilter === 'all' ? true : inboxFilter === 'read' ? message.read : !message.read));
  const active = messages.find((message) => message.id === activeId) || null;
  const markRead = (id) => { localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().map((message) => (message.id === id ? { ...message, read: true } : message)))); refresh(); if (activeId === id) setActiveId(null); };
  const markAllRead = () => { localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().map((message) => ({ ...message, read: true })))); refresh(); };
  const remove = (id) => { localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().filter((message) => message.id !== id))); refresh(); if (activeId === id) setActiveId(null); };
  const clearAll = () => { if (window.confirm('Delete all messages? This cannot be undone.')) { localStorage.setItem(MESSAGES_KEY, JSON.stringify([])); setActiveId(null); refresh(); } };
  return (
    <div className="inbox-overlay" role="dialog" aria-modal="true" aria-label="Message inbox">
      <div className="inbox-panel">
        <div className="inbox-header"><div><h3>Message inbox</h3><small>Owner view — messages stored in this browser</small></div><button className="inbox-close" type="button" onClick={onClose} aria-label="Close inbox">✕</button></div>
        <div className="inbox-stats"><div className="inbox-stat"><b>{messages.length}</b><small>Total</small></div><div className="inbox-stat"><b>{unread}</b><small>Unread</small></div><div className="inbox-stat"><b>{messages.length - unread}</b><small>Read</small></div></div>
        <div className="inbox-toolbar"><div className="inbox-filters">{[['all', 'All'], ['unread', 'Unread'], ['read', 'Read']].map(([key, label]) => <button className={inboxFilter === key ? 'inbox-filter is-active' : 'inbox-filter'} type="button" onClick={() => setInboxFilter(key)} key={key}>{label}</button>)}</div><div className="inbox-actions">{messages.length ? <button className="inbox-action" type="button" onClick={markAllRead}>Mark all read</button> : null}{messages.length ? <button className="inbox-action" type="button" onClick={clearAll}>Delete all</button> : null}</div></div>
        <div className="inbox-list">{visible.length === 0 ? <div className="inbox-empty"><b>No messages{inboxFilter !== 'all' ? ` ${inboxFilter}` : ''} yet.</b>Messages sent through the contact form will appear here.</div> : visible.map((message) => <div className={`inbox-item ${message.read ? 'is-read' : ''} ${activeId === message.id ? 'is-active' : ''}`} key={message.id}><span className="inbox-item-dot" /><div className="inbox-item-main"><button className="inbox-item-open" type="button" onClick={() => setActiveId(activeId === message.id ? null : message.id)}><div className="inbox-item-top"><b>{message.name}</b><small>{new Date(message.createdAt).toLocaleString()}</small></div><div className="inbox-item-subject">{message.subject}</div><div className="inbox-item-preview">{message.message}</div></button></div><div className="inbox-item-actions"><button className="inbox-item-action" type="button" onClick={() => { if (!message.read) markRead(message.id); }}>{message.read ? 'Read' : 'Mark read'}</button><button className="inbox-item-action" type="button" onClick={() => remove(message.id)}>Delete</button></div></div>)}
        {active ? <div className="inbox-detail"><div className="inbox-detail-head"><b>{active.name}</b><a href={`mailto:${active.email}`}>{active.email} ↗</a><small>{new Date(active.createdAt).toLocaleString()}</small></div><span className="inbox-detail-subject">{active.subject}</span><div className="inbox-detail-message">{active.message}</div></div> : null}</div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [inboxTick, setInboxTick] = useState(0);
  const [projectFilter, setProjectFilter] = useState('All');
  const [roleIndex, setRoleIndex] = useState(0);
  const closeMenu = () => setMenuOpen(false);
  const filters = ['All', 'Interactive', 'Experience', 'Identity'];
  const visibleProjects = projectFilter === 'All' ? projects : projects.filter((project) => project.category === projectFilter);
  useEffect(() => {
    const roleTimer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 3200);
    return () => window.clearInterval(roleTimer);
  }, []);
  useEffect(() => {
    const followPointer = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', followPointer, { passive: true });
    return () => window.removeEventListener('pointermove', followPointer);
  }, []);
  return (
    <div className="app">
      <div className="noise" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <ScrollProgress />
      <header className="site-header"><div className="site-header-inner"><a className="brand" href="#top" onClick={closeMenu} aria-label="Minahil Irfan home"><span className="brand-mark">MI</span><span>minahil.irfan</span></a>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Projects</a><a href="#students" onClick={closeMenu}>Students</a><a href="#testimonials" onClick={closeMenu}>Kind words</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#education" onClick={closeMenu}>Education</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
        <a className="header-cta" href={`mailto:${OWNER.email}`}>Let's talk <span>↗</span></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button></div>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title"><HeroBackdrop /><div className="hero-copy hero-copy-featured"><div className="availability"><span className="availability-ping" /> Available for projects</div><h1 className="hero-name" id="hero-title"><span>Minahil</span> <em>Irfan</em></h1><p className="hero-role"><span className="role-swap" key={roles[roleIndex]}>{roles[roleIndex]}</span><span className="typing-caret" /></p><p className="hero-intro">To me, MERN isn't a stack — it's a conversation between a MongoDB document and a React screen, stitched together with Node and Express. I build that bridge for real products at High Table Tech and lead MERN training at Saylani Mass IT Training, passing the same discipline to the next generation of developers.</p><div className="hero-actions"><a className="hero-button hero-button-primary" href="#work"><span aria-hidden="true">◉</span> See what I ship</a><a className="hero-button hero-button-secondary" href="#contact"><span aria-hidden="true">➤</span> Build something together</a></div><div className="hero-proof"><span><b>03+</b> years building</span><span><b>50+</b> students mentored</span></div><TerminalHint /></div></section>
        <section className="ticker" aria-label="Skills"><div className="ticker-track">{[...tickerSkills, ...tickerSkills].map((skill, index) => <span className="ticker-item" key={`${skill}-${index}`}>{skillIcons[skill]}<b>{skill}</b></span>)}</div></section>
        <section className="work section-shell" id="work"><div className="section-heading reveal"><div><p className="eyebrow">02 — Minahil's projects</p><h2 className="moving-heading"><span>Work</span> <span>that</span><br /><em>moves.</em></h2></div><div className="project-intro-motion"><span className="project-intro-label">Currently exploring</span><p className="section-note">MERN builds, learning tools, and digital experiences crafted by Minahil Irfan.</p><div className="project-intro-track"><span>React interfaces</span><i>✦</i><span>Secure APIs</span><i>✦</i><span>Useful products</span><i>✦</i></div></div></div><div className="filter-row" role="group" aria-label="Filter projects">{['All', 'Interactive', 'Experience', 'Identity'].map((filter) => <button className={projectFilter === filter ? 'filter-button is-active' : 'filter-button'} type="button" onClick={() => setProjectFilter(filter)} key={filter}>{filter}</button>)}</div><ProjectsSlider projects={visibleProjects} /></section>
        <section className="experience section-shell" id="experience"><div className="section-heading reveal"><div><p className="eyebrow">03 — The path so far</p><h2>Work, study,<br /><em>repeat.</em></h2></div><p className="section-note">Three roles, one through-line — building things, teaching the craft, and shipping real work.</p></div><ExperiencePanel /></section>
        <section className="education section-shell" id="education"><div className="section-heading reveal"><div><p className="eyebrow">04 — The learning curve</p><h2>Schooled,<br /><em>self-taught.</em></h2></div><p className="section-note">Formal study met real practice — flip the cards to see how each credential became a building block toward shipping software.</p></div><EducationPanel /></section>
        <section className="skills section-shell" id="skills"><div className="skills-intro reveal"><p className="eyebrow">05 — The toolkit</p><h2>Good with<br /><em>the details.</em></h2><p>I move comfortably between big-picture thinking and the tiny interaction that makes a product feel alive.</p><div className="skills-stats"><div><b>{skillGroups.reduce((total, group) => total + group.items.length, 0)}</b><small>Technologies</small></div><div><b>4</b><small>Core areas</small></div></div></div><div className="skills-grid">{skillGroups.map((group, index) => <article className="skill-group reveal" style={{ '--delay': `${index * 90}ms` }} key={group.title}><div className="skill-group-head"><span className="skill-group-icon">{group.icon}</span><div><p className="skill-group-label">0{index + 1} / {group.title}</p><h3>{group.title}</h3></div></div><div className="skill-group-tags">{group.items.map((item) => <span key={item}><b>✦</b>{item}</span>)}</div></article>)}</div></section>
        <section className="about section-shell" id="about"><div className="section-heading reveal"><div><p className="eyebrow">06 — About Minahil</p><h2>Code that is<br /><em>useful.</em></h2></div><p className="section-note about-intro-tab"><span className="about-intro-number">01</span><span>Meet Minahil Irfan: a MERN developer, trainer, and thoughtful builder.</span><b>↗</b></p></div><div className="about-modern-layout"><div className="about-left-column"><AboutProfile /><div className="about-stats"><div className="stat-card reveal reveal-up"><strong>50<span>+</span></strong><small>Students mentored</small></div><div className="stat-card reveal reveal-up"><strong>6<span>+</span></strong><small>Projects delivered</small></div><div className="stat-card reveal reveal-up"><strong>3<span>+</span></strong><small>Years experience</small></div><div className="stat-card reveal reveal-up"><strong>100<span>%</span></strong><small>Dedication</small></div></div></div><div className="services-panel"><p className="services-kicker reveal reveal-right"><span /> What I do for you</p><div className="services-grid">{services.map((service, index) => <article className="service-card reveal reveal-right" style={{ '--delay': `${index * 120}ms` }} key={service.title}><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></div></div><div className="about-grid about-grid-after"><p className="about-lead reveal"><span className="lead-kicker">Build / Teach / Evolve</span><span className="lead-text">I create scalable web applications and teach the thinking behind them, combining clean code, expressive interfaces, and practical problem solving.</span></p><div className="about-details reveal"><p>Open to full stack collaborations, technical mentorship, workshops, and developer training for teams and students.</p><div className="about-tags"><span>MERN specialist</span><span>JavaScript trainer</span><span>Full stack builder</span><span>Remote friendly</span></div><a className="text-link" href="mailto:hello@minahil.dev">Work with Minahil <span>↗</span></a></div></div></section>
        <section className="students section-shell" id="students"><div className="students-mark" aria-hidden="true">MI</div><div className="students-copy reveal"><p className="eyebrow">For students + future developers</p><h2 className="students-heading"><span className="students-word">Learn</span> <span className="students-word">by</span><br /><em className="students-word students-word-alt">building.</em></h2><div className="students-badge" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="students-badge-arc" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs><text><textPath href="#students-badge-arc">IDEAS → CODE → SHIP → REPEAT · </textPath></text></svg><b>✦</b></div><p className="students-lead">Confused by the gap between tutorials and real projects? I teach <em className="hl" title="JavaScript">JavaScript</em> and <em className="hl" title="MongoDB · Express.js · React.js · Node.js">MERN</em> development through practical builds, code reviews, and a clear path from idea to deployment.</p><a className="button button-outline" href={`mailto:${OWNER.email}?subject=MERN%20training`}>Ask about training <span>↗</span></a></div><StudentShowcase /></section>
        <section className="testimonials section-shell" id="testimonials"><div className="section-heading reveal"><div><p className="eyebrow">07 — Kind words</p><h2>People say<br /><em>nice things.</em></h2></div><FeedbackNote /></div><TestimonialSlider /></section>
        <section className="contact section-shell" id="contact"><div className="contact-inner reveal"><p className="eyebrow">08 — Start a conversation</p><h2>Let's build<br /><em>something.</em></h2></div><div className="contact-layout"><div className="contact-info"><p className="contact-info-note">Call, WhatsApp, or email — whichever is easiest for you. I usually reply within 24 hours.</p><div className="contact-details-card"><a className="contact-detail-row" href="tel:+923352381776"><span className="contact-detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></span><span className="contact-detail-copy"><small>Phone</small><b>{OWNER.phone}</b></span><em className="contact-detail-arrow">↗</em></a><a className="contact-detail-row" href={`https://wa.me/${OWNER.whatsappIntl}`} target="_blank" rel="noreferrer"><span className="contact-detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></span><span className="contact-detail-copy"><small>WhatsApp</small><b>{OWNER.whatsapp}</b></span><em className="contact-detail-arrow">↗</em></a><a className="contact-detail-row" href={`mailto:${OWNER.email}`}><span className="contact-detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></span><span className="contact-detail-copy"><small>Email</small><b>{OWNER.email}</b></span><em className="contact-detail-arrow">↗</em></a><div className="contact-detail-row"><span className="contact-detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></span><span className="contact-detail-copy"><small>Location</small><b>{OWNER.location}</b></span></div></div><p className="contact-availability"><span className="contact-info-live"><i /> Open for projects</span></p><div className="contact-socials"><a href={`https://wa.me/${OWNER.whatsappIntl}`} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={`mailto:${OWNER.email}`}>Email ↗</a><a href="https://www.linkedin.com/in/minahil-irfan-shaikh/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/minahilirfan26" target="_blank" rel="noreferrer">GitHub ↗</a></div></div><ContactForm onSent={() => setInboxTick((tick) => tick + 1)} /></div><div className="contact-footer"><span>© 2026 Minahil Irfan / Karachi, Pakistan</span><div><a href="#top">Back to top ↑</a><button className="contact-inbox-trigger" type="button" onClick={() => setInboxOpen(true)}>Inbox{msgCount() > 0 ? <b>{msgCount()}</b> : null}</button><a href="https://www.linkedin.com/in/minahil-irfan-shaikh/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/minahilirfan26" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>{inboxOpen ? <MessagesInbox onClose={() => setInboxOpen(false)} /> : null}</section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
