import { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { contactData } from '@/data/contact';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('A valid email is required.');
      return;
    }

    if (!message.trim()) {
      setError('Message is required.');
      return;
    }

    const subject = `Portfolio Contact — ${name}`;
    const body = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=bayazidsiam5678@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const mailtoUrl = `mailto:bayazidsiam5678@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SectionContainer
      id="contact"
      className="bg-background relative overflow-hidden"
    >
      <MaxWidthWrapper>
        <SectionHeading
          title="Get in Touch"
          subtitle="Open for new opportunities and collaborations."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Contact Details Card */}
          <motion.div variants={slideUpStagger} className="h-full">
            <GlassCard className="h-full flex flex-col gap-8 justify-center p-8 sm:p-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-3xl font-bold">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground">
                  Reach out via email or connect on social platforms. I
                  typically respond within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <a
                  href={`mailto:${contactData.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                  aria-label="Send email"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </span>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {contactData.email}
                    </span>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=Bashundhara+R/A,+Dhaka-1229,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                  aria-label="View location on Google Maps"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Location
                    </span>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {contactData.location}
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/8801763271609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                  aria-label="Message on WhatsApp"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Phone
                    </span>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {contactData.phone}
                    </span>
                  </div>
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Action Card (Design Only) */}
          <motion.div variants={slideUpStagger} className="h-full">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col p-2 sm:p-4 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  {error && (
                    <div className="text-sm font-medium text-destructive px-1">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-muted-foreground px-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 w-full rounded-md border border-border/50 bg-background/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-muted-foreground px-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-md border border-border/50 bg-background/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-muted-foreground px-1">
                      Message
                    </label>
                    <textarea
                      placeholder="How can I help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] w-full rounded-md border border-border/50 bg-background/50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-full mt-2 gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
