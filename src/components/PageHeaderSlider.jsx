import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageHeaderSlider = ({ category, title, italicTitle, subtitle, images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Dynamic luxury slide interval
    return () => clearInterval(timer);
  }, [images]);

  const activeImage = images && images.length > 0 ? images[index] : '';

  return (
    <section className="relative h-[48vh] w-full overflow-hidden bg-primary flex items-center justify-center border-b border-border">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        {activeImage && (
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={activeImage}
              initial={{ scale: 1.0, opacity: 0 }}
              animate={{ scale: 1.06, opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1.0, ease: "easeInOut" },
                scale: { duration: 4.5, ease: "easeOut" }
              }}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-90 dark:brightness-75"
              alt={`${title} Banner`}
            />
          </AnimatePresence>
        )}
        
        {/* Dual Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/50 to-primary z-1" />
        <div className="absolute inset-0 bg-primary/20 z-1" />
      </div>

      {/* Header Content Container (Glassmorphic in both themes) */}
      <div className="relative z-10 text-center px-6 max-w-4xl mt-12">
        {category && (
          <motion.span
            className="text-accent text-xs font-body font-bold tracking-[0.4em] uppercase mb-4 block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {category}
          </motion.span>
        )}

        <motion.h1
          className="font-heading text-4xl md:text-6xl text-accent font-light leading-tight uppercase"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {title}
          {italicTitle && (
            <>
              <br />
              <span className="italic text-accent-light text-glow font-light lowercase font-heading">
                {italicTitle}
              </span>
            </>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-4 text-accent/80 font-body text-sm md:text-base max-w-xl mx-auto font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Mini Dot Page Indicators */}
      {images && images.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === i ? 'bg-accent w-4' : 'bg-accent/30'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PageHeaderSlider;
