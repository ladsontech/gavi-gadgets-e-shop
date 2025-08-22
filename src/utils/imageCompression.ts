
// Image compression utilities using Amazon-style techniques
export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  progressive?: boolean;
}

export const compressImage = async (
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<Blob> => {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.8,
    format = 'webp',
    progressive = true
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate optimal dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        `image/${format}`,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (file instanceof File) {
      img.src = URL.createObjectURL(file);
    } else {
      img.src = URL.createObjectURL(file);
    }
  });
};

export const generateResponsiveImages = async (
  originalFile: File | Blob,
  sizes: Array<{ suffix: string; maxWidth: number; quality: number }>
): Promise<Array<{ suffix: string; blob: Blob; size: number }>> => {
  const results = [];
  
  for (const size of sizes) {
    const compressed = await compressImage(originalFile, {
      maxWidth: size.maxWidth,
      quality: size.quality,
      format: 'webp'
    });
    
    results.push({
      suffix: size.suffix,
      blob: compressed,
      size: compressed.size
    });
  }
  
  return results;
};

// Amazon-style responsive image sizes
export const RESPONSIVE_SIZES = [
  { suffix: '_thumb', maxWidth: 150, quality: 0.7 },
  { suffix: '_small', maxWidth: 300, quality: 0.8 },
  { suffix: '_medium', maxWidth: 600, quality: 0.85 },
  { suffix: '_large', maxWidth: 1200, quality: 0.9 }
];

export const optimizeImageUrl = (originalUrl: string, size: 'thumb' | 'small' | 'medium' | 'large' = 'medium'): string => {
  if (!originalUrl) return originalUrl;
  
  // If it's already a compressed version, return as is
  if (originalUrl.includes('_thumb') || originalUrl.includes('_small') || 
      originalUrl.includes('_medium') || originalUrl.includes('_large')) {
    return originalUrl;
  }
  
  // Generate the optimized URL by adding the size suffix
  const lastDotIndex = originalUrl.lastIndexOf('.');
  if (lastDotIndex === -1) return originalUrl;
  
  const baseName = originalUrl.substring(0, lastDotIndex);
  const extension = originalUrl.substring(lastDotIndex);
  
  return `${baseName}_${size}${extension}`;
};
