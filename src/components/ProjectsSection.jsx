import { motion } from 'framer-motion';
import { MapPin, Calendar, Building } from 'lucide-react';
import { projects } from '../data/properties';
import { Link } from 'react-router-dom';

const statusColors = {
  'Ongoing': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Completed': 'bg-accent/5 text-accent border-accent/20',
  'Coming Soon': 'bg-blue-50 text-blue-700 border-blue-200',
};

const ProjectsSection = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
            Our Portfolio
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">
            Signature Projects
          </h2>
          <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="scroll-reveal group relative overflow-hidden border border-border bg-secondary"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Image Background */}
              <div className="premium-img-frame border-none shadow-none p-1">
                <div className="relative h-72 overflow-hidden bg-darkest">
                  <img
                    src={project.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={project.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-60" />

                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-4 py-1.5 text-xs font-body font-medium tracking-wider border ${statusColors[project.status]}`}>
                  {project.status}
                </div>
              </div>
            </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-2xl text-accent group-hover:text-accent-light transition-colors duration-300">
                  {project.name}
                </h3>
                <div className="flex flex-wrap items-center gap-6 mt-4 text-muted text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent/60" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-accent/60" />
                    {project.units} Units
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent/60" />
                    {project.completion}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 scroll-reveal">
          <Link
            to="/projects"
            className="inline-block px-10 py-3.5 border border-accent text-accent font-body font-medium text-sm tracking-wide hover:bg-accent hover:text-primary transition-all duration-300 cursor-pointer"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
