"use client";
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone:'', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await emailjs.send(
        'service_3gpcn9h',
        'template_l9am7f3',
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
      },
        'vQQP408855YPbeFMB'
      );
      setStatus('Email sent successfully!');
      try {
        await emailjs.send(
        'service_3gpcn9h',
        'template_7j40dvf',
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
      },
        'vQQP408855YPbeFMB'
      );
      console.log('auto replied');
      } catch (error) {
        console.log('fail to Reply', error);
      }
      setForm({ name: '', email: '', phone:'', message: '' });
    } catch (error) {
      setStatus('Failed to send email. Try again.');
    }
  };

  return (
    <form 
    onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={form.name} 
        onChange={(e) => setForm({ ...form, name: e.target.value })} 
        required 
      />
      <input 
        
        type="email" 
        placeholder="Your Email" 
        value={form.email} 
        onChange={(e) => setForm({ ...form, email: e.target.value })} 
        required 
      />
      <input 
       
        type="tel" 
        placeholder="Your phone" 
        value={form.phone} 
        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
        required 
      />
      <textarea 
        placeholder="Your Message" 
        value={form.message} 
        onChange={(e) => setForm({ ...form, message: e.target.value })} 
        required 
      />
      <button className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700" type="submit">Send An Email</button>
      <p>{status}</p>
    </form>
  );
}
