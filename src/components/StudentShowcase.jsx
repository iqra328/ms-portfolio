import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { studentWorks } from './data';

export function StudentShowcase() {
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
