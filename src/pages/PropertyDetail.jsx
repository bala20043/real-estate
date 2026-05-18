import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Car, Calendar, Heart, ArrowLeft, Check } from 'lucide-react';
import { properties } from '../data/properties';
import { useWishlist } from '../hooks/useWishlist';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import { supabase } from '../lib/supabase';

const PropertyDetail = () => {
  useScrollAnimation();
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [emi, setEmi] = useState({ principal: 5000000, rate: 8.5, months: 240 });
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!property) return (
    <div className="pt-32 text-center text-accent min-h-screen bg-primary">
      <p className="font-heading text-3xl">Property not found</p>
      <Link to="/properties" className="mt-6 inline-block text-accent">← Back to Properties</Link>
    </div>
  );

  const calculateEMI = () => {
    const r = emi.rate / (12 * 100);
    const result = (emi.principal * r * Math.pow(1 + r, emi.months)) / (Math.pow(1 + r, emi.months) - 1);
    return isNaN(result) ? 0 : result.toFixed(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save to Supabase Cloud Database!
    const enquiryPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone || 'N/A',
      message: form.message,
      property_name: property.title,
      property_id: property.id,
      agent_name: property.agent.name
    };

    try {
      const { error } = await supabase.from('elara_enquiries').insert([enquiryPayload]);
      if (error) console.error("Error saving lead to Supabase:", error);
    } catch (err) {
      console.error("Supabase insert exception:", err);
    }

    // Save locally in localStorage as a backup fallback
    const enquiries = JSON.parse(localStorage.getItem('elara_enquiries') || '[]');
    enquiries.unshift({
      id: Date.now(),
      ...enquiryPayload,
      propertyName: property.title,
      propertyId: property.id,
      agentName: property.agent.name,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('elara_enquiries', JSON.stringify(enquiries));

    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const related = properties.filter(p => p.id !== property.id && p.type === property.type).slice(0, 3);

  return (
    <main className="pt-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back */}
        <Link to="/properties" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-body text-sm mb-8">
          <ArrowLeft size={16} /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Bright Main Image Showcase */}
            <motion.div className="premium-img-frame mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="relative aspect-video overflow-hidden bg-darkest">
                <img
                  src={property.imageUrl}
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt={property.title} 
                />
              </div>
            </motion.div>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-accent text-xs font-body tracking-[0.2em] uppercase">{property.tag}</span>
                <h1 className="font-heading text-4xl text-accent mt-1">{property.title}</h1>
                <div className="flex items-center gap-2 mt-2 text-muted"><MapPin size={16} className="text-accent/60" />{property.location}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-3xl text-accent font-bold">{property.price}</span>
                <button onClick={() => toggleWishlist(property.id)}
                  className="p-3 border border-border hover:border-accent transition-all cursor-pointer bg-secondary shadow-sm">
                  <Heart size={20} className={isWishlisted(property.id) ? 'fill-accent text-accent' : 'text-accent/40'} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Bed size={18} />, label: 'Bedrooms', value: property.beds || 'N/A' },
                { icon: <Bath size={18} />, label: 'Bathrooms', value: property.baths },
                { icon: <Maximize size={18} />, label: 'Area (sqft)', value: property.sqft.toLocaleString() },
                { icon: <Car size={18} />, label: 'Parking', value: property.parking || 'N/A' },
              ].map((s, i) => (
                <div key={i} className="p-4 bg-secondary border border-border text-center">
                  <div className="text-accent mx-auto mb-1 flex justify-center">{s.icon}</div>
                  <div className="font-body font-semibold text-accent">{s.value}</div>
                  <div className="text-muted text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl text-accent mb-4">About This Property</h2>
              <p className="text-accent/70 font-body leading-relaxed">{property.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl text-accent mb-4">Key Highlights</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-accent/80 font-body text-sm">
                    <Check size={14} className="text-accent flex-shrink-0" />{h}
                  </div>
                ))}
              </div>
            </div>

            {/* Property Location (Google Maps Integration) */}
            <div className="mb-8 p-6 bg-secondary border border-border">
              <h2 className="font-heading text-2xl text-accent mb-4 flex items-center gap-2">
                <MapPin size={22} className="text-accent" /> Property Location
              </h2>
              <p className="text-muted font-body text-sm mb-4">
                Address: <span className="text-accent font-medium">{property.location}</span>
              </p>
              <div className="w-full h-80 overflow-hidden premium-img-frame shadow-none p-1 border-border">
                <iframe
                  title="Google Maps Location"
                  className="w-full h-full border-0 select-none grayscale dark:invert-[90%] dark:hue-rotate-[180deg]"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.title + ", " + property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* EMI Calculator */}
            <div className="p-6 bg-secondary border border-border mb-8">
              <h2 className="font-heading text-2xl text-accent mb-6">EMI Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-xs text-muted font-body tracking-wider uppercase mb-2 block">Loan Amount (₹)</label>
                  <input type="number" value={emi.principal} onChange={e => setEmi(p => ({ ...p, principal: Number(e.target.value) }))}
                    className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted font-body tracking-wider uppercase mb-2 block">Interest Rate (%)</label>
                  <input type="number" step="0.1" value={emi.rate} onChange={e => setEmi(p => ({ ...p, rate: Number(e.target.value) }))}
                    className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted font-body tracking-wider uppercase mb-2 block">Tenure (months)</label>
                  <input type="number" value={emi.months} onChange={e => setEmi(p => ({ ...p, months: Number(e.target.value) }))}
                    className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/20">
                <span className="font-body text-sm text-muted">Monthly EMI</span>
                <span className="font-mono text-2xl text-accent font-bold">₹{Number(calculateEMI()).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-6">
              {/* Agent Contact Card */}
              <div className="p-6 bg-secondary border border-border">
                <h3 className="font-heading text-xl text-accent mb-4">Contact Agent</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                    <span className="font-heading text-accent text-sm font-semibold">{property.agent.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <div className="font-body font-medium text-accent text-sm">{property.agent.name}</div>
                    <div className="text-muted text-xs">{property.agent.phone}</div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                    placeholder="Your name" className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none placeholder-muted" />
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required
                    placeholder="Email address" className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none placeholder-muted" />
                  <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="Phone number" className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none placeholder-muted" />
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={3}
                    placeholder="I'm interested in this property..." className="w-full bg-primary border border-border px-3 py-2 text-accent font-body text-sm focus:border-accent focus:outline-none resize-none placeholder-muted" />
                  <button type="submit" className="w-full bg-accent text-primary py-3 font-body font-semibold text-sm tracking-wide hover:bg-accent-light transition-all cursor-pointer shadow-md shadow-accent/10">
                    {sent ? 'Enquiry Sent!' : 'Send Enquiry'}
                  </button>
                </form>
              </div>

              {/* Year Built */}
              <div className="p-4 bg-secondary border border-border flex items-center gap-3">
                <Calendar size={18} className="text-accent" />
                <div>
                  <div className="text-xs text-muted font-body">Year Built</div>
                  <div className="text-accent font-body font-medium">{property.yearBuilt}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Similar Properties */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-3xl text-accent mb-8 scroll-reveal">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(p => (
                <Link key={p.id} to={`/property/${p.id}`}
                  className="group border border-border bg-secondary hover:border-accent/30 transition-all duration-300 overflow-hidden">
                  <div className="premium-img-frame border-none shadow-none p-1">
                    <div className="relative h-48 overflow-hidden bg-darkest">
                      <img
                        src={p.imageUrl} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt={p.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 text-xs font-body font-bold shadow-md">{p.price}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-body font-medium text-accent group-hover:text-accent-light transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-muted text-xs"><MapPin size={11} className="text-accent/60" />{p.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default PropertyDetail;
