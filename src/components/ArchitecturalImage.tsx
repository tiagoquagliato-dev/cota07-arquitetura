import { getImageSrc, getImageSrcSet, type ProjectImage } from '../data/projects';

interface ArchitecturalImageProps {
  image: ProjectImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

export function ArchitecturalImage({
  image,
  sizes,
  priority = false,
  className = '',
  imgClassName = '',
}: ArchitecturalImageProps) {
  return (
    <div className={`relative overflow-hidden bg-[#2A2C2A] ${className}`}>
      <img
        src={getImageSrc(image.id, priority ? 1280 : 640)}
        srcSet={getImageSrcSet(image.id)}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
