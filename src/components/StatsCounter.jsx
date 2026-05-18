import CountUpComponent from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CountUp = CountUpComponent.default || CountUpComponent;

const stats = [
  { number: 500, suffix: '+', label: 'Properties Sold' },
  { number: 12, suffix: '+', label: 'Years Experience' },
  { number: 98, suffix: '%', label: 'Client Satisfaction' },
  { number: 40, suffix: '+', label: 'Global Cities' },
];

const StatsCounter = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-secondary border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="font-mono text-5xl md:text-6xl font-bold text-accent text-glow mb-2">
                {inView ? (
                  <CountUp end={stat.number} duration={2.5} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="font-body text-sm text-muted tracking-wider uppercase">
                {stat.label}
              </div>
              <div className="mt-3 mx-auto w-8 h-px bg-accent/30 group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
