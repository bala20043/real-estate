import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

const themes = [
  { id: 'gold', name: 'Imperial Gold', color: '#C9A96E', class: '' },
  { id: 'emerald', name: 'Emerald Jade', color: '#10B981', class: 'theme-emerald' },
  { id: 'sapphire', name: 'Sapphire Ocean', color: '#3B82F6', class: 'theme-sapphire' },
  { id: 'ruby', name: 'Burgundy Ruby', color: '#E11D48', class: 'theme-ruby' },
  { id: 'amethyst', name: 'Royal Amethyst', color: '#8B5CF6', class: 'theme-amethyst' },
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('gold');

  useEffect(() => {
    const savedTheme = localStorage.getItem('elara-theme') || 'gold';
    setActiveTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId) => {
    // Remove all previous theme classes from body
    themes.forEach(t => {
      if (t.class) {
        document.body.classList.remove(t.class);
      }
    });

    // Add selected theme class
    const selected = themes.find(t => t.id === themeId);
    if (selected && selected.class) {
      document.body.classList.add(selected.class);
    }
  };

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('elara-theme', themeId);
    applyTheme(themeId);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-secondary/90 border border-accent/40 text-accent flex items-center justify-center cursor-pointer shadow-lg shadow-black/50 backdrop-blur-md transition-colors hover:border-accent"
      >
        <Palette size={20} />
      </motion.button>

      {/* Theme Choice Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-secondary/90 border border-border/80 backdrop-blur-md shadow-xl"
          >
            {themes.map((theme) => (
              <div key={theme.id} className="relative group flex items-center justify-center">
                <button
                  onClick={() => handleThemeChange(theme.id)}
                  style={{ backgroundColor: theme.color }}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                    activeTheme === theme.id 
                      ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-secondary' 
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/95 border border-border text-white text-[10px] font-body font-medium tracking-wider uppercase py-1 px-2.5 whitespace-nowrap shadow-md">
                  {theme.name}
                  {/* Tooltip triangle */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary" />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
