import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/properties';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  return (
    <section className="py-24 bg-primary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
            Insights & News
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">
            Latest from the Blog
          </h2>
          <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="scroll-reveal group border border-border bg-secondary overflow-hidden shadow-sm"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Gradient Thumbnail */}
              <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(17,17,17,0.03),transparent)]" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary/95 text-accent text-xs font-body font-medium tracking-wider border border-accent/15">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-muted text-xs font-body mb-4">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-body text-lg font-medium text-accent group-hover:text-accent-light transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>

                <p className="mt-3 text-muted text-sm font-body leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 mt-5 text-accent text-sm font-body font-medium group/link cursor-pointer"
                >
                  Read More
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
