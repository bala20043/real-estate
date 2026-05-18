import { Link } from 'react-router-dom';
import { Share2, AtSign, Rss, Play, ArrowUp } from 'lucide-react';
const Instagram = Share2;
const Facebook = AtSign;
const Linkedin = Rss;
const Youtube = Play;

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-secondary border-t border-border relative">
      {/* Top clean accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + Tagline */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
                <path d="M40 8L12 30V68H30V48H50V68H68V30L40 8Z" stroke="var(--color-accent)" strokeWidth="2.5" fill="none" />
                <path d="M35 48H45V68H35V48Z" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="font-heading text-xl text-accent tracking-wider">ELARA</span>
            </Link>
            <p className="text-muted text-sm font-body leading-relaxed mb-6">
              Where Luxury Meets Legacy. Premium real estate experiences crafted for the world's most discerning clients.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:border-accent hover:text-accent transition-all duration-300 bg-primary shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-accent tracking-wider uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Properties', 'Services', 'Contact', 'Admin'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-muted text-sm font-body hover:text-accent transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-body text-sm font-semibold text-accent tracking-wider uppercase mb-6">Properties</h4>
            <ul className="space-y-3">
              {['Luxury Villas', 'Penthouses', 'Apartments', 'Commercial', 'Waterfront'].map((type) => (
                <li key={type}>
                  <Link to="/properties" className="text-muted text-sm font-body hover:text-accent transition-colors duration-300">
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold text-accent tracking-wider uppercase mb-6">Contact</h4>
            <ul className="space-y-3 text-muted text-sm font-body">
              <li>42 Boulevard Royale</li>
              <li>Downtown Dubai, UAE</li>
              <li className="text-accent/80 font-medium">+971 4 567 8900</li>
              <li className="text-accent/80 font-medium">hello@elararealty.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 bg-primary/45">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs font-body">
            © 2025 ELARA Realty. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted text-xs font-body hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted text-xs font-body hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button onClick={scrollToTop} className="back-to-top cursor-pointer" aria-label="Back to top">
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
