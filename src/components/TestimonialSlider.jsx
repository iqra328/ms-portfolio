import React from 'react';
import { useEffect, useState } from 'react';
import { testimonials } from './data';

export function TestimonialSlider() {
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
