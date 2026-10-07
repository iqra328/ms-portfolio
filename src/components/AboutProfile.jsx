import React from 'react';
import { useEffect, useState } from 'react';
import { aboutTabs, portraitImage } from './data';

export function AboutProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const active = aboutTabs[activeTab];
  const changeTab = (nextIndex, direction = nextIndex >= activeTab ? 1 : -1) => { setSlideDirection(direction); setActiveTab(nextIndex); };
  const moveTab = (direction) => changeTab((activeTab + direction + aboutTabs.length) % aboutTabs.length, direction);
  useEffect(() => { const tabTimer = window.setInterval(() => { setActiveTab((index) => { setSlideDirection(index % 2 === 0 ? 1 : -1); return (index + 1) % aboutTabs.length; }); }, 4800); return () => window.clearInterval(tabTimer); }, []);
  return <div className="about-profile"><div className="profile-visual"><img src={portraitImage} alt="Professional developer portrait" /><div className="profile-image-wash" /><div className="profile-frame profile-frame-one" /><div className="profile-frame profile-frame-two" /><span className="profile-index">0{activeTab + 1} / 03</span><span className="profile-caption">Minahil Irfan / MERN Developer</span><div className="profile-progress"><span style={{ width: `${((activeTab + 1) / aboutTabs.length) * 100}%` }} /></div></div><div className="profile-info"><div className="profile-tabs" role="tablist" aria-label="About Minahil"><span className="tab-line" />{aboutTabs.map((tab, index) => <button className={activeTab === index ? 'profile-tab is-active' : 'profile-tab'} type="button" role="tab" aria-selected={activeTab === index} onClick={() => changeTab(index)} key={tab.label}>{tab.label}<b>0{index + 1}</b></button>)}</div><div className={`profile-copy profile-copy-${slideDirection > 0 ? 'right' : 'left'}`} key={activeTab}><p className="eyebrow">{active.label}</p><h3>{active.title}</h3><p>{active.text}</p></div><div className="profile-controls"><button type="button" onClick={() => moveTab(-1)} aria-label="Previous About panel">← <span>Previous</span></button><button type="button" onClick={() => moveTab(1)} aria-label="Next About panel"><span>Next</span> →</button></div></div></div>;
}
