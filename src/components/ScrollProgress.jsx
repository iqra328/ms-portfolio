import React from 'react';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
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
