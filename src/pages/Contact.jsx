import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import PageHeaderSlider from '../components/PageHeaderSlider';

import { supabase } from '../lib/supabase';

const Contact = () => {
  useScrollAnimation();
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', propertyType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();

    // Save general contact lead into Supabase Cloud Database!
    const enquiryPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      message: formData.message,
      property_name: formData.propertyType ? `Property Type: ${formData.propertyType}` : "General Contact Lead",
      property_id: null,
      agent_name: "General Support Team"
    };

    try {
      const { error } = await supabase.from('elara_enquiries').insert([enquiryPayload]);
      if (error) console.error("Error saving contact lead to Supabase:", error);
    } catch (err) {
      console.error("Supabase contact insert exception:", err);
    }

    // Save locally in localStorage as a backup fallback
    const enquiries = JSON.parse(localStorage.getItem('elara_enquiries') || '[]');
    enquiries.unshift({
      id: Date.now(),
      ...enquiryPayload,
      propertyName: enquiryPayload.property_name,
      propertyId: null,
      agentName: "General Support Team",
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('elara_enquiries', JSON.stringify(enquiries));

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', propertyType: '', message: '' });
  };

  const contactSliderImages = [
    "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1600", // Glass Corporate Entry
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600", // Modern Office Lobby
    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Sunny Chalet Front
  ];

  return (
    <main className="bg-primary">
      <PageHeaderSlider 
        category="Reach Out"
        title="Let's"
        italicTitle="Connect"
        subtitle="Our team of luxury real estate specialists is ready to assist you 7 days a week."
        images={contactSliderImages}
      />

      <section className="py-20 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="scroll-reveal">
            <h2 className="font-heading text-3xl text-accent mb-8">Send an Enquiry</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name"
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted" />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com"
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+971 50 000 0000"
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted" />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange}
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors appearance-none">
                    <option value="" className="text-muted">Select type</option>
                    <option className="text-accent">Villa</option>
                    <option className="text-accent">Penthouse</option>
                    <option className="text-accent">Apartment</option>
                    <option className="text-accent">Commercial</option>
                    <option className="text-accent">Plot</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us about your ideal property..."
                  className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors resize-none placeholder-muted" />
              </div>
              <button type="submit" className="w-full bg-accent text-primary py-4 font-body font-semibold text-sm tracking-wide hover:bg-accent-light transition-all cursor-pointer shadow-md shadow-accent/10">
                {submitted ? '✓ Message Sent Successfully!' : 'Send Enquiry'}
              </button>
            </form>
          </div>

          <div className="scroll-reveal space-y-8">
            <div>
              <h2 className="font-heading text-3xl text-accent mb-8">Get In Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: <MapPin size={20} />, title: 'Office', lines: ['42 Boulevard Royale', 'Downtown Dubai, UAE'] },
                  { icon: <Phone size={20} />, title: 'Phone', lines: ['+971 4 567 8900', '+971 4 567 8901'] },
                  { icon: <Mail size={20} />, title: 'Email', lines: ['hello@elararealty.com', 'invest@elararealty.com'] },
                  { icon: <Clock size={20} />, title: 'Hours', lines: ['Mon–Fri: 9am – 7pm', 'Sat–Sun: 10am – 5pm'] },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-3 bg-accent/5 border border-accent/15 text-accent flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-body font-medium text-accent text-sm">{item.title}</h4>
                      {item.lines.map((l, j) => <p key={j} className="text-muted text-sm">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-64 border border-border overflow-hidden bg-primary shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178543450474!2d55.27195!3d25.19719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(0.95)' }}
                allowFullScreen="" loading="lazy" title="ELARA Office" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
