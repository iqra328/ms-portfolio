import React from 'react';
import { useEffect, useState } from 'react';
import { MESSAGES_KEY, getMessages } from './contactUtils';

export function MessagesInbox({ onClose }) {
  const [messages, setMessages] = useState(getMessages());
  const [activeId, setActiveId] = useState(null);
  const [inboxFilter, setInboxFilter] = useState('all');
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const refresh = () => setMessages(getMessages());
  const unread = messages.filter((message) => !message.read).length;
  const visible = messages.filter((message) => (inboxFilter === 'all' ? true : inboxFilter === 'read' ? message.read : !message.read));
  const active = messages.find((message) => message.id === activeId) || null;
  const markRead = (id) => { localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().map((message) => (message.id === id ? { ...message, read: true } : message)))); refresh(); if (activeId === id) setActiveId(null); };
  const markAllRead = () => { localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().map((message) => ({ ...message, read: true })))); refresh(); };
  const remove = (id) => { localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().filter((message) => message.id !== id))); refresh(); if (activeId === id) setActiveId(null); };
  const clearAll = () => { if (window.confirm('Delete all messages? This cannot be undone.')) { localStorage.setItem(MESSAGES_KEY, JSON.stringify([])); setActiveId(null); refresh(); } };
  return (
    <div className="inbox-overlay" role="dialog" aria-modal="true" aria-label="Message inbox">
      <div className="inbox-panel">
        <div className="inbox-header"><div><h3>Message inbox</h3><small>Owner view — messages stored in this browser</small></div><button className="inbox-close" type="button" onClick={onClose} aria-label="Close inbox">✕</button></div>
        <div className="inbox-stats"><div className="inbox-stat"><b>{messages.length}</b><small>Total</small></div><div className="inbox-stat"><b>{unread}</b><small>Unread</small></div><div className="inbox-stat"><b>{messages.length - unread}</b><small>Read</small></div></div>
        <div className="inbox-toolbar"><div className="inbox-filters">{[['all', 'All'], ['unread', 'Unread'], ['read', 'Read']].map(([key, label]) => <button className={inboxFilter === key ? 'inbox-filter is-active' : 'inbox-filter'} type="button" onClick={() => setInboxFilter(key)} key={key}>{label}</button>)}</div><div className="inbox-actions">{messages.length ? <button className="inbox-action" type="button" onClick={markAllRead}>Mark all read</button> : null}{messages.length ? <button className="inbox-action" type="button" onClick={clearAll}>Delete all</button> : null}</div></div>
        <div className="inbox-list">{visible.length === 0 ? <div className="inbox-empty"><b>No messages{inboxFilter !== 'all' ? ` ${inboxFilter}` : ''} yet.</b>Messages sent through the contact form will appear here.</div> : visible.map((message) => <div className={`inbox-item ${message.read ? 'is-read' : ''} ${activeId === message.id ? 'is-active' : ''}`} key={message.id}><span className="inbox-item-dot" /><div className="inbox-item-main"><button className="inbox-item-open" type="button" onClick={() => setActiveId(activeId === message.id ? null : message.id)}><div className="inbox-item-top"><b>{message.name}</b><small>{new Date(message.createdAt).toLocaleString()}</small></div><div className="inbox-item-subject">{message.subject}</div><div className="inbox-item-preview">{message.message}</div></button></div><div className="inbox-item-actions"><button className="inbox-item-action" type="button" onClick={() => { if (!message.read) markRead(message.id); }}>{message.read ? 'Read' : 'Mark read'}</button><button className="inbox-item-action" type="button" onClick={() => remove(message.id)}>Delete</button></div></div>)}
        {active ? <div className="inbox-detail"><div className="inbox-detail-head"><b>{active.name}</b><a href={`mailto:${active.email}`}>{active.email} ↗</a><small>{new Date(active.createdAt).toLocaleString()}</small></div><span className="inbox-detail-subject">{active.subject}</span><div className="inbox-detail-message">{active.message}</div></div> : null}</div>
      </div>
    </div>
  );
}
