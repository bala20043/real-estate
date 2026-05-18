import { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const ContactSection = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', propertyType: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', propertyType: '', message: '' });
  };

  return (
    <section className="py-24 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">
            Contact Us
          </h2>
          <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="scroll-reveal">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors duration-300 placeholder-muted"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors duration-300 placeholder-muted"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors duration-300 placeholder-muted"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors duration-300 appearance-none"
                  >
                    <option value="" className="text-muted">Select type</option>
                    <option value="villa" className="text-accent">Villa</option>
                    <option value="penthouse" className="text-accent">Penthouse</option>
                    <option value="apartment" className="text-accent">Apartment</option>
                    <option value="commercial" className="text-accent">Commercial</option>
                    <option value="plot" className="text-accent">Plot</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-body text-muted tracking-wider uppercase mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-primary border border-border px-4 py-3 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors duration-300 resize-none placeholder-muted"
                  placeholder="Tell us about your dream property..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-primary py-4 font-body font-semibold text-sm tracking-wide hover:bg-accent-light transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-accent/10"
              >
                <Send size={16} />
                {submitted ? 'Message Sent!' : 'Send Enquiry'}
              </button>
            </form>
          </div>

          {/* Info + Map */}
          <div className="scroll-reveal space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/5 border border-accent/15">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-accent text-sm">Office Address</h4>
                  <p className="text-muted text-sm mt-1">42 Boulevard Royale, Downtown Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/5 border border-accent/15">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-accent text-sm">Phone</h4>
                  <p className="text-muted text-sm mt-1">+971 4 567 8900</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/5 border border-accent/15">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-accent text-sm">Email</h4>
                  <p className="text-muted text-sm mt-1">hello@elararealty.com</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-64 border border-border overflow-hidden bg-primary shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178543450474!2d55.27195!3d25.19719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(0.95)' }}
                allowFullScreen=""
                loading="lazy"
                title="ELARA Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
