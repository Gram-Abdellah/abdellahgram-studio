import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Layers, Calendar } from 'lucide-react';
import ProjectModal, { Project } from './ProjectModal';
import posterEx from '../../public/images/program_poster.png'
import posterEx2 from '../../public/images/program_poster2.png'
import posterEx3 from '../../public/images/program_poster3.png'
import posterEx4 from '../../public/images/program_poster4.png'



type Category = 'all' | 'cinema' | 'post-prod' | 'operations';

const projects: Project[] = [
  {
    id: 11,
    title: 'The 31st European Film Weeks',
    category: 'operations',
    description: 'Strategic curation and audience engagement for a nationwide cinematic tour',
    fullDescription: 'A comprehensive curation mockup for the 31st edition of European Film Weeks in Morocco. This project focuses on "Neo-Noir in the 21st Century," selecting 8 flagship films that bridge European technical style with Mediterranean narratives. Includes a complete digital identity: newsletter layouts, audience engagement graphics, and a strategic plan for post-screening talkbacks to increase event retention.',
    image: posterEx,
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 
    tags: ['Curation', 'Event Design', 'Cultural Mediation', 'Newsletter Strategy'],
    year: '2026',
    organization: 'EU Delegation to Morocco / Cultural Centers',
    expertise: 'Head Curator & Programmer',
    duration: '2 months',
    fullProject: 'https://drive.google.com/file/d/1U_yREjoiZJhzOilUpW9dnWEpCaTUHi4l/view?usp=sharing', 
  },
  {
    id: 12,
    title: 'The Gnawa Resonance',
    category: 'post-prod',
    description: 'Strategic ethnographic dossier on Trans-Saharan musical diaspora',
    fullDescription: 'A comprehensive production "intel" dossier mapping the "Route of Souls" from West Africa to Morocco. This project synthesizes the historical, musical, and spiritual DNA of Gnawa culture into a visual pre-production bible for non-fiction filmmakers and cultural organizations.',
    image: posterEx2,
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Placeholder
    tags: ['Cultural Strategy', 'Ethnography', 'Canva', 'Archive Research'],
    year: '2025',
    organization: 'Independent Research Project',
    expertise: 'Cultural Researcher & Strategist',
    duration: '3 months',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing', // Link to the 3-page PDF we discussed
  },
  {
    id: 13,
    title: 'The Workflow Architecture',
    category: 'operations',
    description: 'A visual architecture for high-volume media asset management',
    fullDescription: 'An end-to-end technical blueprint designed for documentary production houses. This project maps the movement of data from the camera sensor to long-term cold storage. It includes a custom naming convention standard, proxy workflow for remote editing, and a multi-stage backup protocol (3-2-1 rule) to ensure zero data loss.',
    image: posterEx4,
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 
    tags: ['Notion', 'Airtable', 'Frame.io', 'Workflow Design'],
    year: '2025',
    organization: 'Internal Systems Lab',
    expertise: 'Workflow Architect',
    duration: '1 month',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing'
  },
  {
    id: 14,
    title: 'The Chromatic Narrative',
    category: 'post-prod',
    description: 'Technical color grading showcase: Transforming LOG footage into cinematic moods',
    fullDescription: 'A comprehensive study in visual storytelling through color. This project demonstrates the transformation of raw, high-dynamic-range LOG footage into three distinct cinematic looks: "Sahara Gold" (Warm/Heritage), "Atlas Dusk" (Cool/Melancholy), and "Street Verité" (Neutral/Organic). Focus on skin tone preservation and color consistency across multiple cameras.',
    image: posterEx3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Use a video with a split-screen effect
    tags: ['DaVinci Resolve', 'Color Grading', 'Post-Production'],
    year: '2024',
    organization: 'Technical Craft Series',
    expertise: 'Colorist',
    duration: '2 weeks',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing' // Link to a "Look Book" or high-res video
  },
  {
    id: 15,
    title: 'The "One-to-Many" Social Engine',
    category: 'cinema',//'Digital Strategy & Optimization',
    description: 'A multi-platform optimization framework for long-form cinema',
    fullDescription: 'A case study in asset multiplication. This project demonstrates how one 60-minute documentary or interview is systematically "sliced" into 20+ high-performing vertical assets. It covers hook-point analysis, mobile-first color grading, and automated captioning workflows to maximize organic reach and audience retention.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80', // High-energy social media/smartphone vibe
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 
    tags: ['Social-First', 'Content Strategy', 'Adobe Premiere', 'CapCut Desktop'],
    year: '2025',
    organization: 'Digital Growth Lab',
    expertise: 'Content Strategist / Lead Editor',
    duration: 'Ongoing',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing'
  },
  {
    id: 16,
    title: 'The Impact Blueprint',
    category: 'operations',
    description: 'A strategic campaign dossier designed to drive legislative and social change',
    fullDescription: 'A professional impact producing framework created for a documentary on environmental sustainability. This project includes a detailed audience targeting map, a partnership ecosystem of 15+ NGOs, and a "Call-to-Action" funnel designed to turn viewers into advocates. It utilizes a 2026 "Social ROI" metric to prove the tangible effect of storytelling on public policy.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', // High-end data/advocacy look
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
    tags: ['Impact Producing', 'Advocacy Strategy', 'Campaign Design', 'Public Policy'],
    year: '2026',
    organization: 'Earth Advocacy Media',
    expertise: 'Impact Producer',
    duration: '6 months',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing'
  },
  {
    id: 17,
    title: 'The Visual Identity & Brand Bible',
    category: 'cinema',
    description: 'A comprehensive branding framework for independent film properties',
    fullDescription: 'A master design system created for a high-end cinematic series. This project involved the development of a custom typographic system, color theory application, and a visual tone-of-voice guide. It ensures that every touchpoint—from the film poster to the social media assets—maintains a cohesive, premium aesthetic that appeals to Tier-1 festival programmers.',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&q=80', // High-end graphic design/branding vibe
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 
    tags: ['Creative Direction', 'Typography', 'Brand Strategy', 'Adobe Illustrator'],
    year: '2025',
    organization: 'Aesthetic Cinema Lab',
    expertise: 'Creative Director',
    duration: '3 months',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing'
  },
  {
    id: 18,
    title: 'The Hybrid Stream Architecture',
    category: 'operations',
    description: 'Engineering a low-latency, multi-camera remote production pipeline',
    fullDescription: 'A technical blueprint for a high-end hybrid event. This project involved designing a 4-camera SRT (Secure Reliable Transport) pipeline to connect remote interviewees in London and New York to a central hub in Morocco. The system prioritized 1080p60 quality with sub-500ms latency, utilizing hardware encoders and a cloud-based video switcher for global distribution.',
    image: 'https://images.unsplash.com/photo-1540655037529-dec987208707?w=800&q=80', // Professional broadcast control room vibe
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    tags: ['SRT Protocol', 'vMix', 'Cloud Production', 'Network Engineering'],
    year: '2026',
    organization: 'Real-Time Media Group',
    expertise: 'Technical Director',
    duration: '1 month',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing'
  },
  {
    id: 19,
    title: 'The Media Mentorship Framework',
    category: 'cinema',
    description: 'An internal training system for standardizing cinematic quality across junior teams',
    fullDescription: 'A comprehensive curriculum and SOP (Standard Operating Procedure) library developed to onboard junior editors and camera operators. This project includes interactive workshops on "The Moroccan Aesthetic," technical guides for data management, and a peer-review system that ensures all studio output meets Tier-1 international standards.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', // Education/Workshop/Creative Studio vibe
    //videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
    tags: ['Team Leadership', 'SOP Design', 'Creative Direction', 'Talent Development'],
    year: '2026',
    organization: 'Cinema Academy Morocco',
    expertise: 'Head of Content / Lead Mentor',
    duration: 'Ongoing',
    fullProject: 'https://drive.google.com/file/d/YOUR_LINK_HERE/view?usp=sharing'
  },
];

const filters: { label: string; value: Category }[] = [
  { label: 'All Work', value: 'all' },
  { label: 'Cinema & Culture', value: 'cinema' },
  { label: 'Post-Prod & Polish', value: 'post-prod' },
  { label: 'Operations & Strategy', value: 'operations' },
];

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'cinema':
      return Play;
    case 'post-prod':
      return Layers;
    case 'operations':
      return Calendar;
    default:
      return Play;
  }
};

const ProjectCard = ({ 
  project, 
  onClick 
}: { 
  project: Project; 
  onClick: () => void;
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = getCategoryIcon(project.category);
  const hasVideo = !!project.videoUrl;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setRotateX(((e.clientY - centerY) / rect.height) * -10);
    setRotateY(((e.clientX - centerX) / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Category Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 glass-card flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 glass-card">
          <span className="text-xs font-mono text-primary">{project.year}</span>
        </div>

        {/* Video Indicator */}
        {hasVideo && (
          <motion.div 
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
          </motion.div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-secondary rounded-md text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Click hint */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-muted-foreground">Click to view details</span>
          {hasVideo && (
            <span className="text-xs text-primary flex items-center gap-1">
              <Play className="w-3 h-3" />
              Watch video
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Selected Works
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Strategic <span className="text-gradient-electric">Portfolio</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PortfolioGrid;
