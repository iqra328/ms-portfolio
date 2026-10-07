import React from 'react';
import { useEffect, useState } from 'react';

export function FeedbackNote() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['learners', 'clients', 'teammates'];
  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((index) => (index + 1) % words.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return <p className="section-note feedback-note">Straight from the <b key={wordIndex}>{words[wordIndex]}</b> who shaped the work.</p>;
}
