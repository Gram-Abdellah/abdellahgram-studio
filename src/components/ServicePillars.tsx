import { motion } from 'framer-motion';
import { Film, Settings, TrendingUp } from 'lucide-react';
import { useState, useRef } from 'react';

interface ServiceCard {
  icon: typeof Film;
  title: string;
  subtitle: string;
  services: string[];
}

const services: ServiceCard[] = [
  {
    icon: Film,
    title: 'Post-Production',
    subtitle: 'Craft & Polish',
    services: ['Advanced Editing', 'Color Grading', 'Sound Design'],
  },
  {
    icon: Settings,
    title: 'Operations',
    subtitle: 'Systems & Workflow',
    services: ['Workflow Architecture', 'Asset Management', 'Festival Deliverables'],
  },
  {
    icon: TrendingUp,
    title: 'Digital Growth',
    subtitle: 'Scale & Preserve',
    services: ['Cultural Archive Digitization', 'Social-First Video Strategy', 'Content Optimization'],
  },
];

const ServiceCard = ({ service, index }: { service: ServiceCard; index: number }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXVal = ((e.clientY - centerY) / rect.height) * -15;
    const rotateYVal = ((e.clientX - centerX) / rect.width) * 15;
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card p-8 cursor-pointer group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      
      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
        style={{ transform: 'translateZ(30px)' }}
      >
        <service.icon className="w-7 h-7 text-primary" />
      </motion.div>

      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <p className="text-xs uppercase tracking-widest text-primary mb-2">
          {service.subtitle}
        </p>
        <h3 className="font-display text-2xl font-bold mb-4">{service.title}</h3>
        
        <ul className="space-y-2">
          {service.services.map((item, i) => (
            <li 
              key={i} 
              className="text-muted-foreground text-sm flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
    </motion.div>
  );
};

const ServicePillars = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Core Expertise
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Service <span className="text-gradient-electric">Pillars</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
