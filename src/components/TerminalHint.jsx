import React from 'react';
import { useEffect, useState } from 'react';

const terminalLines = ['npm run build', 'node server.js', 'git push origin main'];

export function TerminalHint() {
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
