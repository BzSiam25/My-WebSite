import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { photos as fallbackData } from '@/data/photography';
import { MapPin } from 'lucide-react';
import { usePhotography } from '@/hooks/usePortfolio';

export function PhotographySection() {
  const { data: photos = fallbackData } = usePhotography();
  return (
    <SectionContainer id="photography" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="Photography"
          subtitle="Visual storytelling through a different lens."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {photos.map((photo: any) => (
            <motion.div
              key={photo.id}
              variants={slideUpStagger}
              className="break-inside-avoid relative group overflow-hidden rounded-xl bg-muted border border-border/50 shadow-sm"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {photo.location && (
                  <p className="text-white font-medium flex items-center gap-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5" /> {photo.location}
                  </p>
                )}
                {photo.date && (
                  <p className="text-white/80 text-xs mt-1">{photo.date}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
