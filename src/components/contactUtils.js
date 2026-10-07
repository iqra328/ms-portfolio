export const MESSAGES_KEY = 'minahil_contact_messages_v1';
export const OWNER = { phone: '0335-2381776', whatsapp: '0335-2381776', whatsappIntl: '923352381776', email: 'duashaikh603@gmail.com', location: 'Gulshan-e-Hadeed, Karachi' };
export const getMessages = () => { try { return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || []; } catch { return []; } };
export const saveMessage = (message) => { const all = getMessages(); all.push(message); localStorage.setItem(MESSAGES_KEY, JSON.stringify(all)); };
export const msgCount = () => getMessages().filter((message) => !message.read).length;
export const sendToWhatsApp = (sent) => {
  const text = [`New message from your portfolio`, ``, `Name: ${sent.name}`, `Email: ${sent.email}`, `Subject: ${sent.subject}`, ``, `Message:`, sent.message, ``, `Sent via portfolio contact form`].join('\n');
  window.open(`https://wa.me/${OWNER.whatsappIntl}?text=${encodeURIComponent(text)}`, '_blank');
};
