import React from 'react';
import { useEffect, useState } from 'react';
import { education } from './data';

export function EducationPanel() {
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
