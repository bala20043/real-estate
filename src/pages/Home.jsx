import HeroVideo from '../components/HeroVideo';
import MarqueeBar from '../components/MarqueeBar';
import StatsCounter from '../components/StatsCounter';
import FeaturedProperties from '../components/FeaturedProperties';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Home = () => {
  useScrollAnimation();

  return (
    <main>
      <HeroVideo />
      <MarqueeBar />
      <StatsCounter />
      <FeaturedProperties />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
};

export default Home;
