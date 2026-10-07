import React from 'react';
import { useState } from 'react';
import { OWNER, getMessages, saveMessage, sendToWhatsApp } from './contactUtils';

export function ContactForm({ onSent }) {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Project inquiry', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [lastSent, setLastSent] = useState(null);
  const subjects = ['Project inquiry', 'Training / Mentorship', 'Freelance work', 'Just saying hello'];
  const update = (field) => (event) => { setForm((value) => ({ ...value, [field]: event.target.value })); setErrors((value) => ({ ...value, [field]: undefined })); };
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) nextErrors.message = 'A few more words — at least 10 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const sent = { name: form.name.trim(), email: form.email.trim(), subject: form.subject, message: form.message.trim() };
    setStatus('sending');
    setLastSent(null);
    window.setTimeout(() => {
      saveMessage({ id: `msg_${Date.now()}`, ...sent, createdAt: new Date().toISOString(), read: false });
      sendToWhatsApp(sent);
      setLastSent(sent);
      setStatus('success');
      setForm({ name: '', email: '', subject: 'Project inquiry', message: '' });
      if (onSent) onSent();
    }, 850);
  };
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-head"><span className="contact-form-status"><i /> Replies within 24h</span><span className="contact-form-sep" /></div>
      <div className="contact-field-row">
        <div className={`contact-field ${errors.name ? 'has-error' : ''}`}><label htmlFor="contact-name">Name</label><input id="contact-name" type="text" placeholder="Your name" value={form.name} onChange={update('name')} autoComplete="name" /><span className="contact-field-error">{errors.name}</span></div>
        <div className={`contact-field ${errors.email ? 'has-error' : ''}`}><label htmlFor="contact-email">Email</label><input id="contact-email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} autoComplete="email" /><span className="contact-field-error">{errors.email}</span></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-subject">Subject</label><div className="contact-select-wrap"><select id="contact-subject" value={form.subject} onChange={update('subject')}>{subjects.map((option) => <option key={option}>{option}</option>)}</select><span className="contact-select-arrow">▾</span></div></div>
      <div className={`contact-field ${errors.message ? 'has-error' : ''}`}><label htmlFor="contact-message">Message</label><textarea id="contact-message" rows={5} placeholder="Tell me about your project, training, or idea…" value={form.message} onChange={update('message')} /><span className="contact-field-error">{errors.message}</span><span className="contact-field-count">{form.message.length} / 600</span></div>
      <button className="contact-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <span className="contact-submit-spinner" /> : <span className="contact-submit-arrow" aria-hidden="true">↗</span>}<b>{status === 'sending' ? 'Sending…' : 'Send message'}</b></button>
      {status === 'success' && lastSent ? <div className="contact-success"><span aria-hidden="true">✓</span><div><b>Sent — WhatsApp & inbox.</b><small>Thanks {lastSent.name}, your message is on its way to the owner.</small></div></div> : null}
    </form>
  );
}
