import React from 'react';

export function ProjectCard({ project }) {
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

export function MiniProjectCard({ project, number }) {
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

export function ProjectsSlider({ projects: sliderProjects }) {
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
