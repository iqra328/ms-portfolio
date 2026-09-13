import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls, Sparkles } from '@react-three/drei';
import './styles.css';

const projects = [
  { number: '01 / 04', title: 'MERN Learning Hub', type: 'React / Node.js / MongoDB', year: '2024', category: 'Interactive', className: 'visual-orbit', label: 'BUILD', description: 'A focused learning platform for practical JavaScript and MERN development.', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85' },
  { number: '02 / 04', title: 'Course Management API', type: 'Express / REST API / Auth', year: '2024', category: 'Experience', className: 'visual-coral', label: 'SHIP', description: 'A secure backend for courses, learners, progress tracking, and role-based access.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85' },
  { number: '03 / 04', title: 'E-commerce Dashboard', type: 'React / Redux / UX', year: '2023', category: 'Identity', className: 'visual-blue', label: 'SCALE', description: 'A responsive admin experience for managing products, orders, and customer insights.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85' },
  { number: '04 / 04', title: 'Student Portfolio Lab', type: 'Mentorship / Frontend', year: '2023', category: 'Identity', className: 'visual-green', label: 'GROW', description: 'A guided portfolio builder helping students turn their skills into a real web presence.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85' },
];

const experiences = [
  { id: 'trainer', role: 'Lead Trainer', place: 'SMIT · Karachi', status: 'Current', tags: ['Curriculum design', 'Code reviews', 'MERN mentorship'], detail: 'Leading practical MERN training at SMIT — designing real project paths, reviewing learner code, and turning beginners into builders who ship.' },
  { id: 'mern', role: 'MERN Stack Developer', place: 'Karachi · Remote', status: 'Active', tags: ['React', 'Node.js', 'Express', 'MongoDB'], detail: 'Building full-stack products end to end — responsive React interfaces, secure REST APIs, authentication, and data models that stay quick under real use.' },
  { id: 'frontend', role: 'Frontend Developer', place: 'Product teams · Karachi', status: 'Earlier', tags: ['JavaScript', 'UI engineering', 'Performance'], detail: 'Crafting interfaces people enjoy — clean component architecture, thoughtful motion, accessibility, and pixel-consistent responsive layouts.' },
  { id: 'wordpress', role: 'WordPress Developer', place: 'Freelance projects', status: 'Earlier', tags: ['Themes', 'Plugins', 'WooCommerce'], detail: 'Designing and customising WordPress sites — hand-built themes, plugin tuning, and content flows that make client updates effortless.' },
];

const skills = ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'REST APIs', 'Authentication', 'Developer training'];
const roles = ['MERN Stack Developer', 'Lead Trainer @ SMIT', 'React & Node.js Specialist'];
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

const portraitImage = '/minahil-about.png';

const studentWorks = [
  { id: 'taskflow', category: 'MERN Apps', student: 'Ahmed Raza', title: 'TaskFlow', stack: 'React · Node · Express · MongoDB', description: 'A collaborative task manager built end to end — students learn auth, CRUD, and live progress tracking across the whole stack.', tags: ['Auth', 'CRUD', 'REST API'], image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=85' },
  { id: 'shopverse', category: 'MERN Apps', student: 'Fatima Noor', title: 'ShopVerse', stack: 'React · Express · Mongoose', description: 'A lightweight e-commerce store with product catalog, cart state, and an admin panel — a complete first MERN journey.', tags: ['Cart', 'Admin', 'Inventory'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85' },
  { id: 'blogwave', category: 'MERN Apps', student: 'Usman Ali', title: 'BlogWave', stack: 'React · Node · Markdown · MongoDB', description: 'A writing-first blog engine with editor, comments, and tags — practicing real data modeling instead of tutorials.', tags: ['CRUD', 'Markdown', 'Comments'], image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85' },
  { id: 'weatherly', category: 'Frontend', student: 'Hira Saeed', title: 'Weatherly', stack: 'JavaScript · Fetch API · CSS Grid', description: 'A weather dashboard built against a live API with search, geolocation, and a clean responsive layout.', tags: ['APIs', 'Responsive', 'State'], image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=85' },
  { id: 'volt', category: 'Frontend', student: 'Bilal Khan', title: 'Volt Landing', stack: 'HTML · CSS · Vanilla JS', description: 'A bold product landing page with scroll animations and accessible interactions — design meets discipline.', tags: ['Animation', 'Accessibility'], image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=85' },
  { id: 'typerush', category: 'Mini Tools', student: 'Zara Ahmed', title: 'TypeRush', stack: 'JavaScript · Timer · Web Storage', description: 'A typing-speed trainer with words-per-minute tracking and localStorage-backed score history.', tags: ['JS Logic', 'Timer', 'Storage'], image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=85' },
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
      <div className="project-meta"><div><p className="project-number">{project.number}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div><p className="project-type">{project.type}<br />{project.year}</p><a className="round-arrow" href="#contact" aria-label={`Discuss ${project.title} project`}>↗</a></div>
    </article>
  );
}

function ProjectsSlider({ projects: sliderProjects }) {
  const [activeProject, setActiveProject] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const swipeStart = useRef(null);
  useEffect(() => { setActiveProject(0); }, [sliderProjects.length]);
  useEffect(() => { if (sliderProjects.length < 2 || isPaused) return undefined; const timer = window.setInterval(() => setActiveProject((index) => (index + 1) % sliderProjects.length), 5200); return () => window.clearInterval(timer); }, [sliderProjects.length, isPaused]);
  const moveProject = (direction) => setActiveProject((index) => (index + direction + sliderProjects.length) % sliderProjects.length);
  if (!sliderProjects.length) return <p className="empty-projects">No projects in this category yet.</p>;
  return <div className="projects-slider" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}><div className="slider-stage" onPointerDown={(event) => { swipeStart.current = event.clientX; }} onPointerUp={(event) => { if (swipeStart.current === null) return; const travel = event.clientX - swipeStart.current; if (Math.abs(travel) > 45) moveProject(travel > 0 ? -1 : 1); swipeStart.current = null; }}><div className="slider-track" style={{ '--active-project': activeProject }}>{sliderProjects.map((project, index) => <div className={`slider-item ${activeProject === index ? 'is-active' : ''}`} key={project.title}><ProjectCard project={project} /></div>)}</div></div><div className="slider-controls"><button type="button" className="slider-arrow" onClick={() => moveProject(-1)} aria-label="Previous project">←</button><div className="slider-dots">{sliderProjects.map((project, index) => <button type="button" className={activeProject === index ? 'slider-dot is-active' : 'slider-dot'} onClick={() => setActiveProject(index)} aria-label={`Show project ${index + 1}`} key={project.title} />)}</div><button type="button" className="slider-arrow" onClick={() => moveProject(1)} aria-label="Next project">→</button></div></div>;
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
      <div className="experience-roles" role="tablist" aria-label="Experience roles">{experiences.map((item, index) => <button type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? 'experience-role is-active' : 'experience-role'} onClick={() => setActiveIndex(index)} key={item.id}><span className="experience-role-index">0{index + 1}</span><span className="experience-role-name">{item.role}</span><span className="experience-role-status">{item.status}</span></button>)}</div>
      <div className="experience-card" key={active.id}>
        <div className="experience-card-tilt" ref={tiltRef} onMouseMove={tiltCard} onMouseLeave={clearTilt}>
          <span className="experience-orb experience-orb-one" aria-hidden="true" />
          <span className="experience-orb experience-orb-two" aria-hidden="true" />
          <span className="experience-orb experience-orb-three" aria-hidden="true" />
          <div className="experience-card-content">
            <span className="experience-card-index">0{activeIndex + 1} / 0{experiences.length}</span>
            <p className="eyebrow">The path so far</p>
            <h3>{active.role}</h3>
            <p className="experience-card-place">{active.place}</p>
            <p className="experience-card-detail">{active.detail}</p>
            <div className="experience-card-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <div className="experience-card-progress"><span style={{ width: `${((activeIndex + 1) / experiences.length) * 100}%` }} /></div>
        </div>
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
  return <div className="about-profile"><div className="profile-visual"><img src={portraitImage} alt="Minahil Irfan portrait" /><div className="profile-image-wash" /><div className="profile-frame profile-frame-one" /><div className="profile-frame profile-frame-two" /><span className="profile-index">0{activeTab + 1} / 03</span><span className="profile-caption">Minahil Irfan / MERN Developer</span><div className="profile-progress"><span style={{ width: `${((activeTab + 1) / aboutTabs.length) * 100}%` }} /></div></div><div className="profile-info"><div className="profile-tabs" role="tablist" aria-label="About Minahil"><span className="tab-line" />{aboutTabs.map((tab, index) => <button className={activeTab === index ? 'profile-tab is-active' : 'profile-tab'} type="button" role="tab" aria-selected={activeTab === index} onClick={() => changeTab(index)} key={tab.label}>{tab.label}<b>0{index + 1}</b></button>)}</div><div className={`profile-copy profile-copy-${slideDirection > 0 ? 'right' : 'left'}`} key={activeTab}><p className="eyebrow">{active.label}</p><h3>{active.title}</h3><p>{active.text}</p></div><div className="profile-controls"><button type="button" onClick={() => moveTab(-1)} aria-label="Previous About panel">← <span>Previous</span></button><button type="button" onClick={() => moveTab(1)} aria-label="Next About panel"><span>Next</span> →</button></div></div></div>;
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
  if (!activeWork) return null;
  return (
    <div className="student-showcase" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="student-showcase-head"><p className="eyebrow"><span className="eyebrow-dot" /> Student work / real builds</p><div className="student-tabs" role="tablist" aria-label="Filter student work">{studentTabs.map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'student-tab is-active' : 'student-tab'} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div></div>
      <div className="student-stage">
        <article className={`student-card student-card-${slideDirection > 0 ? 'right' : 'left'}`} key={activeWork.id}>
          <div className={`student-card-visual student-visual-${activeWork.category === 'MERN Apps' ? 'green' : activeWork.category === 'Frontend' ? 'blue' : 'coral'}`}>
            <img src={activeWork.image} alt={`${activeWork.title} — student project`} loading="lazy" />
            <span className="student-visual-index">{String(currentShow + 1).padStart(2, '0')} / {String(visibleWorks.length).padStart(2, '0')}</span>
            <span className="student-visual-stamp">{activeWork.category}</span>
          </div>
          <div className="student-card-body"><p className="student-card-stack">{activeWork.stack}</p><h3>{activeWork.title}</h3><p className="student-card-by">built by <b>{activeWork.student}</b></p><p className="student-card-description">{activeWork.description}</p><div className="student-card-tags">{activeWork.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Projects</a><a href="#students" onClick={closeMenu}>Students</a><a href="#testimonials" onClick={closeMenu}>Kind words</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
        <a className="header-cta" href="mailto:hello@minahil.dev">Let's talk <span>↗</span></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button></div>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title"><video className="hero-background-video" autoPlay muted loop playsInline poster="https://cdn.coverr.co/videos/coverr-coding-sequences-9906/thumbnail?width=1920" aria-hidden="true"><source src="https://cdn.coverr.co/videos/coverr-coding-sequences-9906/1080p.mp4" type="video/mp4" /></video><div className="hero-video-overlay" aria-hidden="true" /><div className="hero-copy hero-copy-featured"><div className="availability"><span className="availability-ping" /> Available for projects</div><h1 className="hero-name" id="hero-title"><span>Minahil</span> <em>Irfan</em></h1><p className="hero-role"><span className="role-swap" key={roles[roleIndex]}>{roles[roleIndex]}</span><span className="typing-caret" /></p><p className="hero-intro">To me, MERN isn't a stack — it's a conversation between a MongoDB document and a React screen, stitched together with Node and Express. I build that bridge for real products and teach the next generation of developers at SMIT to build it too.</p><div className="hero-actions"><a className="hero-button hero-button-primary" href="#work"><span aria-hidden="true">◉</span> See what I ship</a><a className="hero-button hero-button-secondary" href="#contact"><span aria-hidden="true">➤</span> Build something together</a></div><div className="hero-proof"><span><b>03+</b> years building</span><span><b>50+</b> students mentored</span></div><TerminalHint /></div><div className="hero-visual" aria-label="Interactive 3D design study"><span className="visual-label visual-label-top">MERN / 3D study</span><Scene /><span className="visual-label visual-label-bottom">Drag to explore</span></div></section>
        <section className="ticker" aria-label="Services"><div className="ticker-track"><span>MongoDB</span><i>✳</i><span>Express.js</span><i>✳</i><span>React.js</span><i>✳</i><span>Node.js</span><i>✳</i><span>Developer training</span><i>✳</i><span>MongoDB</span><i>✳</i><span>Express.js</span><i>✳</i></div></section>
        <section className="work section-shell" id="work"><div className="section-heading reveal"><div><p className="eyebrow">02 — Minahil's projects</p><h2 className="moving-heading"><span>Work</span> <span>that</span><br /><em>moves.</em></h2></div><div className="project-intro-motion"><span className="project-intro-label">Currently exploring</span><p className="section-note">MERN builds, learning tools, and digital experiences crafted by Minahil Irfan.</p><div className="project-intro-track"><span>React interfaces</span><i>✦</i><span>Secure APIs</span><i>✦</i><span>Useful products</span><i>✦</i></div></div></div><div className="filter-row" role="group" aria-label="Filter projects">{['All', 'Interactive', 'Experience', 'Identity'].map((filter) => <button className={projectFilter === filter ? 'filter-button is-active' : 'filter-button'} type="button" onClick={() => setProjectFilter(filter)} key={filter}>{filter}</button>)}</div><ProjectsSlider projects={visibleProjects} /></section>
        <section className="experience section-shell" id="experience"><div className="section-heading reveal"><div><p className="eyebrow">03 — The path so far</p><h2>Work, study,<br /><em>repeat.</em></h2></div><p className="section-note">Four roles, one through-line — building things, teaching the craft, and shipping real work.</p></div><ExperiencePanel /></section>
        <section className="skills section-shell" id="skills"><div className="skills-intro reveal"><p className="eyebrow">04 — The toolkit</p><h2>Good with<br /><em>the details.</em></h2><p>I move comfortably between big-picture thinking and the tiny interaction that makes a product feel alive.</p></div><div className="skill-cloud">{skills.map((skill, index) => <span className={`skill-pill skill-${index + 1}`} key={skill}>{skill}<b>0{index + 1}</b></span>)}</div></section>
        <section className="about section-shell" id="about"><div className="section-heading reveal"><div><p className="eyebrow">05 — About Minahil</p><h2>Code that is<br /><em>useful.</em></h2></div><p className="section-note about-intro-tab"><span className="about-intro-number">01</span><span>Meet Minahil Irfan: a MERN developer, trainer, and thoughtful builder.</span><b>↗</b></p></div><div className="about-modern-layout"><div className="about-left-column"><AboutProfile /><div className="about-stats"><div className="stat-card reveal reveal-up"><strong>50<span>+</span></strong><small>Students mentored</small></div><div className="stat-card reveal reveal-up"><strong>6<span>+</span></strong><small>Projects delivered</small></div><div className="stat-card reveal reveal-up"><strong>3<span>+</span></strong><small>Years experience</small></div><div className="stat-card reveal reveal-up"><strong>100<span>%</span></strong><small>Dedication</small></div></div></div><div className="services-panel"><p className="services-kicker reveal reveal-right"><span /> What I do for you</p><div className="services-grid">{services.map((service, index) => <article className="service-card reveal reveal-right" style={{ '--delay': `${index * 120}ms` }} key={service.title}><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></div></div><div className="about-grid about-grid-after"><p className="about-lead reveal"><span className="lead-kicker">Build / Teach / Evolve</span><span className="lead-text">I create scalable web applications and teach the thinking behind them, combining clean code, expressive interfaces, and practical problem solving.</span></p><div className="about-details reveal"><p>Open to full stack collaborations, technical mentorship, workshops, and developer training for teams and students.</p><div className="about-tags"><span>MERN specialist</span><span>JavaScript trainer</span><span>Full stack builder</span><span>Remote friendly</span></div><a className="text-link" href="mailto:hello@minahil.dev">Work with Minahil <span>↗</span></a></div></div></section>
        <section className="students section-shell" id="students"><div className="students-mark" aria-hidden="true">MI</div><div className="students-copy reveal"><p className="eyebrow">For students + future developers</p><h2 className="students-heading"><span className="students-word">Learn</span> <span className="students-word">by</span><br /><em className="students-word students-word-alt">building.</em></h2><div className="students-badge" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="students-badge-arc" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs><text><textPath href="#students-badge-arc">IDEAS → CODE → SHIP → REPEAT · </textPath></text></svg><b>✦</b></div><p className="students-lead">Confused by the gap between tutorials and real projects? I teach <em className="hl" title="JavaScript">JavaScript</em> and <em className="hl" title="MongoDB · Express.js · React.js · Node.js">MERN</em> development through practical builds, code reviews, and a clear path from idea to deployment.</p><a className="button button-outline" href="mailto:hello@minahil.dev?subject=MERN%20training">Ask about training <span>↗</span></a></div><StudentShowcase /></section>
        <section className="testimonials section-shell" id="testimonials"><div className="section-heading reveal"><div><p className="eyebrow">06 — Kind words</p><h2>People say<br /><em>nice things.</em></h2></div><p className="section-note">Feedback from learners, clients, and teammates along the way.</p></div><div className="testimonial-grid">{testimonials.map((item, index) => <figure className="testimonial-card reveal reveal-up" style={{ '--delay': `${index * 90}ms` }} key={item.name}><span className="testimonial-quote-mark">"</span><blockquote>{item.quote}</blockquote><figcaption><span className="testimonial-avatar">{item.initials}</span><div><b>{item.name}</b><small>{item.role}</small></div></figcaption></figure>)}</div></section>
        <section className="contact section-shell" id="contact"><div className="contact-inner reveal"><p className="eyebrow">07 — Start a conversation</p><h2>Let's build<br /><em>something.</em></h2><a className="contact-link" href="mailto:hello@minahil.dev">hello@minahil.dev <span>↗</span></a></div><div className="contact-footer"><span>© 2026 Minahil Irfan / Karachi, Pakistan</span><div><a href="#top">Back to top ↑</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
