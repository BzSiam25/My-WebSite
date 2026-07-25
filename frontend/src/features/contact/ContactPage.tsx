import { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SEO } from '@/components/shared/SEO';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { BackToTop } from '@/components/shared/BackToTop';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Check, Copy, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '@/components/shared/CustomIcons';
import { useContact } from '@/hooks/usePortfolio';

export function ContactPage() {
  const { data: contactData } = useContact();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = contactData?.email || 'bayazidsiam5678@gmail.com';
  const phone = contactData?.phone || '+8801763271609';
  const location = contactData?.location || 'Bashundhara R/A, Dhaka-1229, Bangladesh';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', category: 'General Inquiry', message: '' });
    }, 1000);
  };

  return (
    <>
      <SEO title="Contact | Md. Bayezid Hasan Siam" description="Get in touch with Md. Bayezid Hasan Siam for software engineering, applied AI, and project collaboration." />
      <ScrollProgress />

      <div className="pt-24 pb-16 min-h-screen bg-background relative overflow-hidden">
        {/* Decorative Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <SectionContainer className="pt-4 md:pt-8">
          <MaxWidthWrapper>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <motion.div variants={slideUpStagger} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available For New Opportunities
                </motion.div>

                <motion.h1 variants={slideUpStagger} className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1]">
                  Let's Architect & Build Something Great.
                </motion.h1>

                <motion.p variants={slideUpStagger} className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Have a web system to engineer, an AI model to research, or an enterprise challenge to solve? Send a message and let's get connected.
                </motion.p>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Direct Message Form */}
                <motion.div variants={slideUpStagger} className="lg:col-span-7">
                  <Card className="bg-card/70 backdrop-blur-xl border border-border/60 shadow-xl rounded-3xl overflow-hidden p-6 md:p-8">
                    <CardContent className="p-0 space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-heading font-bold text-foreground">Send a Message</h2>
                      </div>

                      {submitted ? (
                        <div className="p-8 text-center space-y-4 bg-primary/5 rounded-2xl border border-primary/20 animate-in fade-in">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                            <Check className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-heading font-bold text-foreground">Message Sent Successfully!</h3>
                          <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            Thank you for reaching out. I'll review your inquiry and get back to you promptly.
                          </p>
                          <Button size="sm" variant="outline" onClick={() => setSubmitted(false)} className="mt-2 rounded-full text-xs">
                            Send Another Message
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Name</label>
                              <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                              <input
                                type="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inquiry Type</label>
                              <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                              >
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Web & Full-Stack Development">Web & Full-Stack Development</option>
                                <option value="Applied AI & Computer Vision">Applied AI & Computer Vision</option>
                                <option value="Enterprise ERP Systems">Enterprise ERP Systems</option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
                              <input
                                type="text"
                                required
                                placeholder="Project Collaboration"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Message</label>
                            <textarea
                              required
                              rows={5}
                              placeholder="Tell me about your project, ideas, or timeline..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-background border border-border/60 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                            />
                          </div>

                          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full gap-2 text-sm font-semibold shadow-md shadow-primary/10">
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Send Message</span>
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Right Column: Contact Details Cards */}
                <motion.div variants={slideUpStagger} className="lg:col-span-5 space-y-6">
                  
                  {/* Email Card */}
                  <Card className="bg-card/70 backdrop-blur-xl border border-border/60 shadow-md rounded-2xl p-6 group hover:border-primary/40 transition-colors">
                    <CardContent className="p-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Direct Email</p>
                          <a href={`mailto:${email}`} className="text-sm md:text-base font-bold text-foreground hover:text-primary transition-colors">
                            {email}
                          </a>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleCopyEmail} aria-label="Copy email address" className="h-8 w-8 p-0 rounded-full shrink-0">
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Phone Card */}
                  <Card className="bg-card/70 backdrop-blur-xl border border-border/60 shadow-md rounded-2xl p-6 group hover:border-primary/40 transition-colors">
                    <CardContent className="p-0 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Phone & WhatsApp</p>
                        <a href={`tel:${phone}`} className="text-sm md:text-base font-bold text-foreground hover:text-primary transition-colors">
                          {phone}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location & Timezone Card */}
                  <Card className="bg-card/70 backdrop-blur-xl border border-border/60 shadow-md rounded-2xl p-6 group hover:border-primary/40 transition-colors">
                    <CardContent className="p-0 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Base Location</p>
                        <p className="text-sm font-bold text-foreground">{location}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>GMT +6 (Dhaka Standard Time)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Profiles Grid */}
                  <Card className="bg-card/70 backdrop-blur-xl border border-border/60 shadow-md rounded-2xl p-6">
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connect Across Platforms</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <a
                          href="https://github.com/BzSiam25"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-all text-xs font-medium text-foreground group"
                        >
                          <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          <span>GitHub</span>
                        </a>

                        <a
                          href="https://linkedin.com/in/md-bayezid-hasan-siam-a8041725b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-all text-xs font-medium text-foreground group"
                        >
                          <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                </motion.div>

              </div>
            </motion.div>
          </MaxWidthWrapper>
        </SectionContainer>
      </div>

      <BackToTop />
    </>
  );
}
