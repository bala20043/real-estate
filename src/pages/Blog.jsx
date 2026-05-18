import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/properties';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import PageHeaderSlider from '../components/PageHeaderSlider';

const extraPosts = [
  { id: 4, title: 'Emerging Luxury Markets: Beyond Dubai and Monaco', excerpt: 'From Bali to Cartagena, discover the next wave of destinations attracting ultra-high-net-worth buyers.', category: 'Market News', date: 'Apr 28, 2025', readTime: '6 min read', gradient: 'from-accent/10 to-secondary' },
  { id: 5, title: 'Smart Home Technology in Luxury Residences', excerpt: 'How AI, automation, and integrated systems are becoming standard in premium real estate offerings.', category: 'Design', date: 'Apr 20, 2025', readTime: '5 min read', gradient: 'from-secondary to-accent/5' },
  { id: 6, title: 'The Art of Negotiation in High-Value Transactions', excerpt: 'Expert strategies for securing the best terms when buying or selling premium properties in competitive markets.', category: 'Investment Tips', date: 'Apr 14, 2025', readTime: '8 min read', gradient: 'from-accent/5 to-secondary' },
];

const allPosts = [...blogPosts, ...extraPosts];

const Blog = () => {
  useScrollAnimation();

  const blogSliderImages = [
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600", // High rise library
    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600", // Modern chalet lounge
    "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1600"  // Creative planning desk
  ];

  return (
    <main className="bg-primary">
      <PageHeaderSlider 
        category="Insights"
        title="The ELARA"
        italicTitle="Journal"
        subtitle="Expert perspectives on luxury real estate, investment strategies, and interior design."
        images={blogSliderImages}
      />

      <section className="py-20 bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, i) => (
            <motion.article key={post.id} className="scroll-reveal group border border-border bg-primary overflow-hidden hover:border-accent/30 transition-all duration-500 shadow-sm"
              whileHover={{ y: -6 }}>
              <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(17,17,17,0.03),transparent)]" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary/95 text-accent text-xs font-body font-medium tracking-wider border border-accent/15">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-muted text-xs font-body mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>
                <h3 className="font-body text-lg font-medium text-accent group-hover:text-accent-light transition-colors leading-snug mb-3">{post.title}</h3>
                <p className="text-muted text-sm font-body leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="inline-flex items-center gap-2 mt-4 text-accent text-sm font-body font-medium group/link cursor-pointer">
                  Read More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
