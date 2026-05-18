import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Shield, Award, Globe, Users, Target, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeaderSlider from '../components/PageHeaderSlider';

const values = [
  { icon: <Shield size={28} />, title: 'Integrity', desc: 'Complete transparency and honest counsel in every transaction.' },
  { icon: <Target size={28} />, title: 'Precision', desc: 'Meticulous attention to detail in your property journey.' },
  { icon: <Globe size={28} />, title: 'Global Reach', desc: 'Exclusive listings across 40+ cities worldwide.' },
  { icon: <Gem size={28} />, title: 'Exclusivity', desc: 'Off-market properties for our discerning clientele.' },
  { icon: <Users size={28} />, title: 'Personal Touch', desc: 'Dedicated managers who understand your lifestyle.' },
  { icon: <Award size={28} />, title: 'Excellence', desc: 'Award-winning service since 2015.' },
];

const team = [
  { name: 'Alexander Mercer', role: 'Founder & CEO', initials: 'AM' },
  { name: 'Isabella Chen', role: 'Head of Sales', initials: 'IC' },
  { name: 'James Wellington', role: 'Investment Director', initials: 'JW' },
  { name: 'Sophie Laurent', role: 'Design Consultant', initials: 'SL' },
];

const About = () => {
  useScrollAnimation();

  const aboutSliderImages = [
    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600", // Alpine Chalet
    "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1600", // Creative Office Architecture
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Mansion Exterior
  ];

  return (
    <main className="bg-primary">
      <PageHeaderSlider 
        category="Our Story"
        title="Where Luxury"
        italicTitle="Meets Legacy"
        subtitle="Founded in 2012, ELARA Realty has grown from a boutique Dubai agency into a global luxury real estate powerhouse."
        images={aboutSliderImages}
      />

      <section className="py-20 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="premium-img-frame slide-left w-full">
            <div className="relative aspect-video overflow-hidden bg-darkest shadow-sm">
              <img src="https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=800"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 ease-out hover:scale-105" alt="About ELARA" />
            </div>
          </div>
          <div className="slide-right">
            <h2 className="font-heading text-4xl text-accent font-light mb-6">A Decade of<br /><span className="italic text-accent-light">Defining Luxury</span></h2>
            <p className="text-accent/70 font-body leading-relaxed mb-4">What began as a vision to redefine luxury real estate has evolved into a legacy of excellence. At ELARA, we curate lifestyles and build lasting relationships.</p>
            <p className="text-accent/70 font-body leading-relaxed">Our team of 50+ specialists spans Dubai, London, New York, Monaco, and Singapore, offering unparalleled local expertise with a truly global perspective.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">Our Values</span>
            <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">What Drives Us</h2>
            <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} className="scroll-reveal p-8 border border-border bg-secondary group hover:border-accent/30 transition-all duration-500 shadow-sm" whileHover={{ y: -4 }}>
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
                <h3 className="font-body text-lg font-medium text-accent mb-2">{v.title}</h3>
                <p className="text-muted text-sm font-body leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">Leadership</span>
            <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">Meet the Team</h2>
            <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <div key={i} className="scroll-reveal text-center p-6 border border-border bg-primary hover:border-accent/30 transition-all duration-300 shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center">
                  <span className="font-heading text-2xl text-accent">{m.initials}</span>
                </div>
                <h4 className="font-body font-medium text-accent">{m.name}</h4>
                <p className="text-accent/60 text-xs font-body tracking-wider mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
