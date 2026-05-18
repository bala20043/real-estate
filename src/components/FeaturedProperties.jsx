import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { useWishlist } from '../hooks/useWishlist';

const filters = ['All', 'Buy', 'Rent', 'Commercial', 'Luxury'];

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { toggleWishlist, isWishlisted } = useWishlist();

  const filtered = activeFilter === 'All'
    ? properties
    : properties.filter(p => p.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
            Curated Collection
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">
            Featured Properties
          </h2>
          <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 scroll-reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2.5 text-sm font-body font-medium tracking-wide transition-all duration-300 border cursor-pointer ${
                activeFilter === f
                  ? 'bg-accent text-primary border-accent'
                  : 'border-border text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((property, index) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group premium-card cursor-pointer"
            >
              {/* Image Thumbnail */}
              <div className="premium-img-frame border-none shadow-none p-1">
                <div className="relative h-64 overflow-hidden bg-darkest">
                  <img
                    src={property.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={property.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-accent text-primary px-4 py-1.5 text-sm font-body font-bold tracking-wide shadow-md">
                  {property.price}
                </div>

                {/* Tag */}
                <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-sm text-accent px-3 py-1 text-xs font-body font-medium tracking-wider border border-accent/20">
                  {property.tag}
                </div>

                {/* Wishlist */}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(property.id); }}
                  className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-primary/90 backdrop-blur-sm border border-border hover:border-accent transition-all duration-300 z-10 cursor-pointer shadow-sm"
                >
                  <Heart
                    size={18}
                    className={isWishlisted(property.id) ? 'fill-accent text-accent' : 'text-accent/40 hover:text-accent'}
                  />
                </button>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

              {/* Content */}
              <Link to={`/property/${property.id}`} className="block p-6">
                <h3 className="font-body text-xl font-medium text-accent group-hover:text-accent-light transition-colors duration-300">
                  {property.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-muted text-sm">
                  <MapPin size={14} className="text-accent/60" />
                  {property.location}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-1.5 text-accent/70 text-sm">
                      <Bed size={14} className="text-accent/40" />
                      <span>{property.beds}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-accent/70 text-sm">
                    <Bath size={14} className="text-accent/40" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-accent/70 text-sm">
                    <Maximize size={14} className="text-accent/40" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12 scroll-reveal">
          <Link
            to="/properties"
            className="inline-block px-10 py-3.5 border border-accent text-accent font-body font-medium text-sm tracking-wide hover:bg-accent hover:text-primary transition-all duration-300 cursor-pointer"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
