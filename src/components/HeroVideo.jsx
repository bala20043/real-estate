import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const sliderImages = [
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600", // Villa 1: Modern White Poolside Mansion
  "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600", // Villa 2: Bright Green Lawn Contemporary Mansion
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600", // Villa 3: Tropical Pool Resort Estate
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600", // Villa 4: Illuminated Glass Architectural Mansion
  "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600", // Villa 5: Spectacular Waterfront Luxury Chalet
  "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Villa 6: Coastal Sunset Infinity Pool Estate
];

const HeroVideo = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3500); // Balanced luxury slide interval: 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Cinematic Ken Burns Image Auto Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={sliderImages[index]}
            initial={{ scale: 1.0, opacity: 0 }}
            animate={{ scale: 1.06, opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.85, ease: "easeInOut" },
              scale: { duration: 4.0, ease: "easeOut" }
            }}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-95"
            alt="Luxury Mansion Showcase"
          />
        </AnimatePresence>

        {/* Premium Architectural Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/85 z-1" />
        <div className="absolute inset-0 bg-primary/15 z-1" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          className="text-accent text-xs font-body font-bold tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Luxury Real Estate
        </motion.span>

        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-accent font-extrabold tracking-wide leading-tight uppercase"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
        >
          Find Your
          <br />
          <span className="italic font-light text-accent-light text-glow lowercase font-heading">Dream Home</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-accent/80 font-body text-base md:text-lg max-w-xl font-medium tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Premium properties in the world's most desirable locations
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <Link
            to="/properties"
            className="px-8 py-3.5 bg-accent text-primary font-body font-bold text-xs tracking-[0.2em] uppercase hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/15 cursor-pointer"
          >
            Explore Properties
          </Link>
          <a
            href="#about"
            className="px-8 py-3.5 border-2 border-accent text-accent font-body font-bold text-xs tracking-[0.2em] uppercase hover:bg-accent hover:text-primary transition-all duration-300 cursor-pointer"
          >
            Discover Story
          </a>
        </motion.div>
      </div>

      {/* Page Navigation Indicators for Slider */}
      <div className="absolute bottom-10 right-10 z-10 hidden md:flex items-center gap-2">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-8 h-1 transition-all duration-500 cursor-pointer ${
              index === i ? 'bg-accent w-12' : 'bg-accent/25 hover:bg-accent/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-accent/60 text-xs font-body font-bold tracking-[0.3em]">SCROLL</span>
        <ChevronDown className="text-accent" size={20} />
      </motion.div>
    </section>
  );
};

export default HeroVideo;
