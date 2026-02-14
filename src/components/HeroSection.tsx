import { motion } from 'framer-motion';
import { Landmark, Clapperboard, Film } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';
import TypewriterText from './TypewriterText';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLocalTime } from '@/hooks/useLocalTime';


const HeroSection = () => {
  const { normalizedX, normalizedY } = useMousePosition();
  const localTime = useLocalTime();

  const parallaxX = (normalizedX - 0.5) * 40;
  const parallaxY = (normalizedY - 0.5) * 40;

  const phrases = [
    'Script Development',
    'Managing Cultural Archives',
    'Media Content Operations',
  ];

  const trustBadges = [
    { icon: Film, label: 'Cinemas' },
    { icon: Clapperboard, label: 'Cultural organizations' },
    { icon: Landmark, label: 'Production companies' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-noir" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Name & Identity */}
            <div className="mb-8">
              <motion.h2 
                className="text-sm font-medium tracking-[0.3em] text-muted-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ABDELLAH GRAM
              </motion.h2>
              <motion.p 
                className="text-xs tracking-wider text-muted-foreground/60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                MOROCCAN | EN · FR · AR
              </motion.p>
            </div>

            {/* Main Headline */}
            <motion.h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Creative Operations &{' '}
              <span className="text-gradient-electric">Post-Production</span>{' '}
              Specialist
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              className="text-xl md:text-2xl font-light text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TypewriterText phrases={phrases} />
            </motion.div>
            {/* Sub-headline */}
            <motion.div
              className="text-xl md:text-2xl font-light text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span 
              className="text-xl md:text-2xl font-light text-muted-foreground mb-10" 
              style={{ color: '#fafafa'}}>
                Supporting cinemas, production houses & cultural institutions with structured workflows and cinematic finishing.
              
              </span>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-4 py-2 glass-card"
                >
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Photo */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            }}
          >
            <div className="relative">
              {/* Floating Glass Frame */}
              <motion.div
                className="relative glass-card p-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1000px) rotateY(${parallaxX * 0.1}deg) rotateX(${-parallaxY * 0.1}deg)`,
                }}
              >
                <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-xl">
                  <img
                    src={profilePhoto}
                    alt="Creative Director Portrait"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* Status Badge */}
                <motion.div
                  className="absolute -bottom-4 right-0 -translate-x-1/2 glass-card px-4 py-2 flex items-center gap-2"
                            
                   style={{
                    opacity: 1,
                    transform: "none",
                    paddingBottom: "0px",
                    paddingTop: "0px",
                    height: "34px",
                    bottom: "0px",
                  }}
                >
                  <span className="status-pulse" />
                  <span className="text-xs font-medium text-foreground">
                    Remote Ready
                  </span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-primary font-mono">{localTime}</span>
                </motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
