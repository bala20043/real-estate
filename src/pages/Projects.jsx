import { motion } from 'framer-motion';
import { MapPin, Building, Calendar } from 'lucide-react';
import { projects } from '../data/properties';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import PageHeaderSlider from '../components/PageHeaderSlider';

const statusColors = {
  'Ongoing': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Completed': 'bg-accent/5 text-accent border-accent/20',
  'Coming Soon': 'bg-blue-50 text-blue-700 border-blue-200',
};

const Projects = () => {
  useScrollAnimation();

  const projectsSliderImages = [
    "https://images.pexels.com/photos/37347/pexels-photo-37347.jpeg?auto=compress&cs=tinysrgb&w=1600", // Glass Skyscraper
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600", // Modern Concrete Art
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Sunny Resort Complex
  ];

  return (
    <main className="bg-primary">
      <PageHeaderSlider 
        category="Portfolio"
        title="Signature"
        italicTitle="Developments"
        subtitle="Landmark developments redefining luxury living across the world's most coveted destinations."
        images={projectsSliderImages}
      />

      <section className="py-20 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div key={project.id} className="scroll-reveal group border border-border bg-primary overflow-hidden hover:border-accent/30 transition-all duration-500 shadow-sm"
              whileHover={{ y: -4 }}>
              <div className="premium-img-frame border-none shadow-none p-1">
                <div className="relative h-72 overflow-hidden bg-darkest">
                  <img
                    src={project.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={project.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/10 to-transparent opacity-60" />
                <div className={`absolute top-4 left-4 px-4 py-1.5 text-xs font-body font-medium tracking-wider border ${statusColors[project.status]}`}>
                  {project.status}
                </div>
              </div>
            </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl text-accent group-hover:text-accent-light transition-colors mb-4">{project.name}</h3>
                <div className="flex flex-wrap gap-6 text-muted text-sm font-body">
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-accent/60" />{project.location}</div>
                  <div className="flex items-center gap-2"><Building size={14} className="text-accent/60" />{project.units} Units</div>
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-accent/60" />Est. {project.completion}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Projects;
