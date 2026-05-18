const MarqueeBar = () => {
  const items = [
    'LUXURY VILLAS',
    'PREMIUM APARTMENTS', 
    'COMMERCIAL SPACES',
    'PENTHOUSES',
    'WATERFRONT PROPERTIES',
    'PRIVATE ESTATES',
    'SKY RESIDENCES',
    'HERITAGE HOMES'
  ];

  const marqueeContent = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6">
      <span>{item}</span>
      <span className="w-2 h-2 bg-primary/40 rounded-full" />
    </span>
  ));

  return (
    <div className="bg-accent py-3.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-6 text-primary font-body font-semibold tracking-[0.2em] text-xs">
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  );
};

export default MarqueeBar;
