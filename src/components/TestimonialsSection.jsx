import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/properties';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-accent text-xs font-body font-semibold tracking-[0.3em] uppercase">
            Client Stories
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mt-4 font-light">
            What Our Clients Say
          </h2>
          <div className="line-reveal h-px bg-accent/20 w-24 mx-auto mt-6" />
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="p-8 bg-primary border border-border hover:border-accent/30 transition-all duration-300 h-full flex flex-col shadow-sm">
                {/* Quote icon */}
                <Quote size={36} className="text-accent/10 mb-4" />

                {/* Text */}
                <p className="font-body text-accent/70 leading-relaxed flex-1 italic">
                  "{t.text}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>

                {/* Client info */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-body font-medium text-accent text-sm">{t.name}</div>
                  <div className="font-body text-muted text-xs mt-1">{t.designation}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
