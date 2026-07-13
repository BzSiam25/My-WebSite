import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { certificates } from '@/data/certificates';
import { Award, ExternalLink } from 'lucide-react';

export function CertificatesSection() {
  return (
    <SectionContainer id="certificates" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="Certifications"
          subtitle="Professional credentials and recognized expertise."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={slideUpStagger}
              className="h-full"
            >
              <Card className="h-full group hover:border-primary/50 transition-colors shadow-sm bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="p-2.5 bg-background rounded-full border border-border/60 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col gap-1.5 pt-1">
                  <CardTitle className="font-heading text-lg leading-tight mb-1">
                    {cert.title}
                  </CardTitle>
                  <p className="text-sm font-semibold text-foreground/80">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {cert.date}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
