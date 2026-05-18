import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { useWishlist } from '../hooks/useWishlist';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import PageHeaderSlider from '../components/PageHeaderSlider';

const filters = ['All', 'Buy', 'Rent', 'Commercial', 'Luxury'];

const Properties = () => {
  useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { toggleWishlist, isWishlisted } = useWishlist();

  const filtered = properties.filter(p =>
    (activeFilter === 'All' || p.type.toLowerCase() === activeFilter.toLowerCase()) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
  );

  const propertiesSliderImages = [
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600", // Pool Villa
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600", // Glass mansion
    "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Infinity Pool Sunset
  ];

  return (
    <main className="bg-primary">
      <PageHeaderSlider 
        category="Our Catalog"
        title="Our Premium"
        italicTitle="Properties"
        subtitle="Explore our curated collection of premium properties worldwide."
        images={propertiesSliderImages}
      />

      {/* Sticky Filter Bar */}
      <div className="sticky top-[60px] z-40 bg-secondary/95 backdrop-blur-md border-y border-border py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full bg-primary border border-border pl-10 pr-4 py-2.5 text-accent font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 text-xs font-body font-medium tracking-wide transition-all duration-300 border cursor-pointer ${
                  activeFilter === f ? 'bg-accent text-primary border-accent' : 'border-border text-muted hover:border-accent hover:text-accent'
                }`}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted font-body text-lg">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property, index) => (
                <motion.div key={property.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }} whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group premium-card cursor-pointer">
                  
                  {/* Image Thumbnail */}
                  <div className="premium-img-frame border-none shadow-none p-1">
                    <div className="relative h-64 overflow-hidden bg-darkest">
                      <img
                        src={property.imageUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        alt={property.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4 bg-accent text-primary px-4 py-1.5 text-sm font-body font-bold shadow-md">{property.price}</div>
                    
                    <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-sm text-accent px-3 py-1 text-xs font-body font-medium tracking-wider border border-accent/20">{property.tag}</div>
                    
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(property.id); }}
                      className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-primary/90 backdrop-blur-sm border border-border hover:border-accent transition-all z-10 cursor-pointer shadow-sm">
                      <Heart size={18} className={isWishlisted(property.id) ? 'fill-accent text-accent' : 'text-accent/40 hover:text-accent'} />
                    </button>
                  </div>
                </div>
                  
                  <Link to={`/property/${property.id}`} className="block p-6">
                    <h3 className="font-body text-xl font-medium text-accent group-hover:text-accent-light transition-colors">{property.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-muted text-sm"><MapPin size={14} className="text-accent/60" />{property.location}</div>
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                      {property.beds > 0 && <div className="flex items-center gap-1.5 text-accent/70 text-sm"><Bed size={14} className="text-accent/40" /><span>{property.beds}</span></div>}
                      <div className="flex items-center gap-1.5 text-accent/70 text-sm"><Bath size={14} className="text-accent/40" /><span>{property.baths}</span></div>
                      <div className="flex items-center gap-1.5 text-accent/70 text-sm"><Maximize size={14} className="text-accent/40" /><span>{property.sqft} sqft</span></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Properties;
