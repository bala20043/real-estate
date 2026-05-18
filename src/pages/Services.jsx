import { motion } from 'framer-motion';
import { Home, Key, TrendingUp, Building, FileText, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import PageHeaderSlider from '../components/PageHeaderSlider';

const services = [
  { num: '01', icon: <Home size={32} />, title: 'Property Buying', desc: 'From initial search to closing, our experts guide you through every step of acquiring your dream luxury property with complete transparency.' },
  { num: '02', icon: <Key size={32} />, title: 'Rental Management', desc: 'Full-service rental management including tenant screening, maintenance coordination, and monthly financial reporting for your portfolio.' },
  { num: '03', icon: <TrendingUp size={32} />, title: 'Investment Consulting', desc: 'Data-driven investment advisory for high-net-worth individuals seeking to build and diversify premium real estate portfolios globally.' },
  { num: '04', icon: <Building size={32} />, title: 'Property Development', desc: 'End-to-end development consulting from land acquisition and planning to project delivery and sales for signature developments.' },
  { num: '05', icon: <FileText size={32} />, title: 'Legal & Documentation', desc: 'Comprehensive legal support covering title verification, due diligence, contract drafting, and regulatory compliance across jurisdictions.' },
  { num: '06', icon: <Globe size={32} />, title: 'Global Relocation', desc: 'Bespoke relocation services for executives and families moving internationally, covering property, schools, and lifestyle setup.' },
];

const Services = () => {
  useScrollAnimation();

  const servicesSliderImages = [
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600", // Penthouse interior
    "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1600", // Meeting room
    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Architect layout
  ];

  return (
    <main className="bg-primary">
      <PageHeaderSlider 
        category="What We Do"
        title="Our Bespoke"
        italicTitle="Services"
        subtitle="A complete suite of luxury real estate services designed for the world's most discerning clients."
        images={servicesSliderImages}
      />

      <section className="py-20 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={i} className="scroll-reveal group p-8 border border-border bg-primary hover:border-accent/50 transition-all duration-500 relative overflow-hidden shadow-sm"
              whileHover={{ y: -6 }}>
              <span className="font-mono text-6xl font-bold text-accent/10 absolute top-4 right-6 group-hover:text-accent/20 transition-colors">{s.num}</span>
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <h3 className="font-heading text-2xl text-accent mb-3">{s.title}</h3>
              <p className="font-body text-muted text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-6 w-8 h-px bg-accent/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">How It Works</span>
            <h2 className="font-heading text-4xl text-accent mt-4 font-light">Our Process</h2>
            <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Discovery Call', 'Property Curation', 'Site Visits', 'Seamless Closing'].map((step, i) => (
              <div key={i} className="scroll-reveal text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-accent/20 flex items-center justify-center bg-secondary">
                  <span className="font-mono text-accent font-bold text-xl">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="font-body font-medium text-accent">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
