import React from 'react';
import { useEffect, useRef, useState } from 'react';

export function HeroBackdrop() {
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
