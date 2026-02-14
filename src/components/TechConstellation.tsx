import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface TechIcon {
  name: string;
  icon: string;
  x: number;
  y: number;
  delay: number;
  floatClass: string;
}

const techIcons: TechIcon[] = [
  { name: 'Premiere Pro', icon: 'Pr', x: 15, y: 25, delay: 0, floatClass: 'float-slow' },
  { name: 'DaVinci Resolve', icon: 'DR', x: 75, y: 20, delay: 0.2, floatClass: 'float-medium' },
  { name: 'After Effects', icon: 'Ae', x: 25, y: 70, delay: 0.4, floatClass: 'float-fast' },
  { name: 'Frame.io', icon: 'Fr', x: 85, y: 65, delay: 0.6, floatClass: 'float-slow' },
  { name: 'Notion', icon: 'N', x: 50, y: 45, delay: 0.8, floatClass: 'float-medium' },
  { name: 'Slack', icon: 'Sl', x: 40, y: 15, delay: 1, floatClass: 'float-fast' },
  { name: 'Figma', icon: 'Fi', x: 60, y: 75, delay: 1.2, floatClass: 'float-slow' },
  { name: 'Airtable', icon: 'At', x: 10, y: 50, delay: 1.4, floatClass: 'float-medium' },
];

const TechConstellation = () => {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Tech Stack
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Tool <span className="text-gradient-electric">Constellation</span>
          </h2>
        </motion.div>

        {/* Constellation Container */}
        <div className="relative h-[500px] md:h-[600px]">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            {techIcons.map((icon, i) =>
              techIcons.slice(i + 1).map((target, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={`${icon.x}%`}
                  y1={`${icon.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                />
              ))
            )}
          </svg>

          {/* Floating Icons */}
          {techIcons.map((tech, index) => {
            const offsetX = (normalizedX - 0.5) * 20 * (index % 2 === 0 ? 1 : -1);
            const offsetY = (normalizedY - 0.5) * 20 * (index % 2 === 0 ? -1 : 1);

            return (
              <motion.div
                key={tech.name}
                className={`absolute ${tech.floatClass}`}
                style={{
                  left: `${tech.x}%`,
                  top: `${tech.y}%`,
                  transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: tech.delay,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <motion.div
                  className="glass-card w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer group"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.6, type: 'spring' }
                  }}
                >
                  <span className="font-display text-xl md:text-2xl font-bold text-primary group-hover:text-foreground transition-colors">
                    {tech.icon}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <span className="px-3 py-1 glass-card text-xs font-medium">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center Focal Point */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/50 animate-ping" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechConstellation;
