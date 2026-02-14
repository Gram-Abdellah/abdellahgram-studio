import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, Calendar, Tag } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface Project {
  id: number;
  title: string;
  category: 'all' | 'cinema' | 'post-prod' | 'operations';
  description: string;
  fullDescription?: string;
  image: string;
  videoUrl?: string;
  tags: string[];
  year: string;
  organization?: string;
  duration?: string;
  expertise?: string;
  fullProject: string;

}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Pause video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!project) return null;

  const hasVideo = !!project.videoUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="glass-card h-full w-full overflow-hidden flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 glass-card flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid lg:grid-cols-2 h-full">
                  {/* Media Section */}
                  <div className="relative h-64 lg:h-full bg-noir-900">
                    {hasVideo ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={project.videoUrl}
                          poster={project.image}
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Video Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none lg:hidden" />
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Play indicator for video projects */}
                    {hasVideo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-4 left-4 px-3 py-1.5 glass-card flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 text-primary fill-primary" />
                        <span className="text-xs font-medium">Video Project</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-10 flex flex-col">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {project.category === 'cinema' && 'Cinema & Culture'}
                          {project.category === 'post-prod' && 'Post-Production'}
                          {project.category === 'operations' && 'Operations'}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {project.year}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl lg:text-4xl font-bold mb-4">
                        {project.title}
                      </h2>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground leading-relaxed mb-6"
                    >
                      {project.fullDescription || project.description}
                    </motion.p>

                    {/* Project Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 gap-4 mb-6"
                    >
                      {project.organization && (
                        <div className="glass-card p-4">
                          <p className="text-xs text-muted-foreground mb-1">Organization</p>
                          <p className="font-medium">{project.organization}</p>
                        </div>
                      )}
                      {project.expertise && (
                        <div className="glass-card p-4">
                          <p className="text-xs text-muted-foreground mb-1">Expertise</p>
                          <p className="font-medium">{project.expertise}</p>
                        </div>
                      )}
                      {project.duration && (
                        <div className="glass-card p-4">
                          <p className="text-xs text-muted-foreground mb-1">Duration</p>
                          <p className="font-medium">{project.duration}</p>
                        </div>
                      )}
                      <div className="glass-card p-4">
                        <p className="text-xs text-muted-foreground mb-1">Year</p>
                        <p className="font-medium">{project.year}</p>
                      </div>
                    </motion.div>

                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-8"
                    >
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        Technologies Used
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-sm bg-secondary rounded-lg text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-auto"
                    >
                      <a
                      href= {project.fullProject}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-electric w-60 flex items-center gap-2 group">

                        <span>View Full Case Study</span>
                        <ExternalLink  className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
