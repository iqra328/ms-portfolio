import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { experiences } from './data';

export function ExperiencePanel() {
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
