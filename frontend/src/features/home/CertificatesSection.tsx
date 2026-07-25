import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, ExternalLink } from 'lucide-react';
import { useCertificates } from '@/hooks/usePortfolio';

export function CertificatesSection() {
  const { data: certList = [] } = useCertificates();

  if (!certList || certList.length === 0) {
    return null; // Gracefully omit section if database has zero certificates
  }

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
          {certList.map((cert: any) => (
            <motion.div
              key={cert.id || cert.title}
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
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                      aria-label={`View certificate for ${cert.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-base font-heading group-hover:text-primary transition-colors">
                    {cert.title}
                  </CardTitle>
                  <p className="text-sm font-medium text-foreground/80">
                    {cert.issuer}
                  </p>
                  {cert.date && (
                    <p className="text-xs text-muted-foreground pt-1">
                      Issued: {cert.date}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
