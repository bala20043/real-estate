import { motion } from 'framer-motion';
import { Home, Key, TrendingUp } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: <Home size={28} />,
    title: 'Property Buying',
    desc: 'Discover your ideal property with our expert guidance. From initial search to final closing, we ensure a seamless acquisition experience tailored to your exact preferences and investment goals.',
  },
  {
    num: '02',
    icon: <Key size={28} />,
    title: 'Rental Management',
    desc: 'Maximize your rental income with our comprehensive property management services. We handle tenant screening, maintenance, and financial reporting with meticulous attention to detail.',
  },
  {
    num: '03',
    icon: <TrendingUp size={28} />,
    title: 'Investment Consulting',
    desc: 'Strategic real estate investment advisory for high-net-worth individuals. Our analysts provide data-driven insights to build and diversify your premium property portfolio globally.',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
            What We Offer
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">
            Our Services
          </h2>
          <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="scroll-reveal group relative p-8 border border-border bg-primary hover:border-accent/50 transition-all duration-500 shadow-sm"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Number */}
              <span className="font-mono text-6xl font-bold text-accent/10 absolute top-4 right-6 group-hover:text-accent/20 transition-colors duration-500">
                {service.num}
              </span>

              {/* Icon */}
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading text-2xl text-accent mb-4">{service.title}</h3>
              <p className="font-body text-muted text-sm leading-relaxed">{service.desc}</p>

              {/* Bottom line */}
              <div className="mt-6 w-8 h-px bg-accent/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
