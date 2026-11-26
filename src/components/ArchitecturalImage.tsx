import { getImageSrc, getImageSrcSet, type ProjectImage } from '../data/projects';

interface ArchitecturalImageProps {
  image: ProjectImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  revealMask?: 'horizontal' | 'vertical';
  scrollScale?: boolean;
  parallax?: number;
}

export function ArchitecturalImage({
  image,
  sizes,
  priority = false,
  className = '',
  imgClassName = '',
  revealMask,
  scrollScale = false,
  parallax,
}: ArchitecturalImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#2A2C2A] ${className}`}
      data-reveal-mask={revealMask}
      data-scroll-scale={scrollScale ? 'true' : undefined}
      data-parallax={parallax !== undefined ? String(parallax) : undefined}
    >
      <img
        src={getImageSrc(image.id, priority ? 1280 : 640, image.width)}
        srcSet={getImageSrcSet(image.id, image.width)}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={image.focalPoint ? { objectPosition: image.focalPoint } : undefined}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
