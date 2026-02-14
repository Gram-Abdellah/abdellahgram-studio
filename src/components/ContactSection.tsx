import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Video, Calendar, Send, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    projectType: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `
Organization: ${formData.organization}
Project Type: ${formData.projectType}

${formData.message}
          `,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        organization: '',
        projectType: '',
        message: '',
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Video, label: 'Vimeo', href: '#' },
  ];

  return (
    <section className="py-32 relative" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Let's Connect
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Initiate <span className="text-gradient-electric">Collaboration</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ready to elevate your production workflow? Let's discuss how we can
              bring your creative vision to life.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="glass-input text-foreground placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@email.com"
                  className="glass-input text-foreground placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Organization
                </label>
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="glass-input text-foreground"
                  required
                >
                  <option value="" className="bg-background">Select type...</option>
                  <option value="production" className="bg-background">Production Company</option>
                  <option value="cinema" className="bg-background">Cinema / Distribution</option>
                  <option value="cultural" className="bg-background">Cultural Institution</option>
                  <option value="agency" className="bg-background">Agency / Brand</option>
                  <option value="other" className="bg-background">Other</option>
                </select>
              </div>
            </div>

            {/* Project Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Project Type
              </label>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                placeholder="e.g., Documentary Post-Production, Archive Digitization..."
                className="glass-input text-foreground placeholder:text-muted-foreground/50"
                required
              />
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about your project and how I can help..."
                className="glass-input text-foreground placeholder:text-muted-foreground/50 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-electric w-full md:w-auto flex items-center justify-center gap-2 group disabled:opacity-60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </motion.button>

            {/* Feedback */}
            {success && (
              <p className="mt-4 text-sm text-green-500">
                ✅ Message sent successfully. I’ll get back to you soon.
              </p>
            )}

            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}
          </motion.form>

          {/* Footer Links */}
          <motion.div
            className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="glass-card w-12 h-12 flex items-center justify-center group hover:bg-primary/10 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>

            {/* Schedule Call */}
            <motion.a
              href="#"
              className="flex items-center gap-3 px-6 py-3 glass-card group hover:border-primary/30 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">Schedule a Call</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-border/50 pt-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Your Name. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="status-pulse" />
              Available for remote collaboration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
