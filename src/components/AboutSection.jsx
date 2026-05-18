import { Shield, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-primary overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Beautiful Static Architectural Showcase */}
          <div className="slide-left relative">
            <div className="premium-img-frame">
              <div className="relative overflow-hidden aspect-[3/4] max-h-[580px] bg-darkest shadow-sm">
                <img
                  src="https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 ease-out hover:scale-105"
                  alt="About ELARA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent/10 -z-10" />
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-primary px-6 py-4 text-center shadow-md">
              <div className="font-mono text-3xl font-bold">12+</div>
              <div className="text-xs font-body font-medium tracking-wider">YEARS</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="slide-right">
            <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
              About ELARA
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light leading-tight">
              Building Dreams,
              <br />
              <span className="italic text-accent-light">Creating Legacies</span>
            </h2>
            <div className="h-px bg-accent/20 w-16 mt-6" />

            <p className="mt-8 text-accent/70 font-body leading-relaxed">
              For over a decade, ELARA Realty has been the trusted partner of discerning buyers, 
              investors, and families seeking exceptional properties across the globe. Our curated 
              portfolio spans from Mediterranean villas to Manhattan penthouses.
            </p>
            <p className="mt-4 text-accent/70 font-body leading-relaxed">
              We believe that a home is more than an address — it's a statement of who you are. 
              Our team of expert advisors combines local market mastery with a global perspective 
              to match you with properties that reflect your lifestyle and aspirations.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-accent/5 border border-accent/15 group-hover:bg-accent/10 transition-colors duration-300">
                  <Shield size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-accent">Trusted Excellence</h4>
                  <p className="text-muted text-sm mt-1">Industry-leading standards with complete transparency in every transaction.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-accent/5 border border-accent/15 group-hover:bg-accent/10 transition-colors duration-300">
                  <Award size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-accent">Award-Winning Service</h4>
                  <p className="text-muted text-sm mt-1">Recognized globally for our bespoke approach to luxury real estate.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-accent/5 border border-accent/15 group-hover:bg-accent/10 transition-colors duration-300">
                  <Globe size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-medium text-accent">Global Network</h4>
                  <p className="text-muted text-sm mt-1">Exclusive access to off-market listings across 40+ international cities.</p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-block mt-10 text-accent font-body text-sm font-medium tracking-wide group"
            >
              Our Story
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
