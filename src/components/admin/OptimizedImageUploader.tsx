
import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Image } from "lucide-react";
import { compressImage, generateResponsiveImages, RESPONSIVE_SIZES } from "@/utils/imageCompression";
import { useToast } from "@/components/ui/use-toast";

interface OptimizedImageUploaderProps {
  productId?: string;
  images: string[];
  onImagesChange: (newImages: string[]) => void;
  storageFolder?: string;
}

export const OptimizedImageUploader: React.FC<OptimizedImageUploaderProps> = ({
  productId,
  images,
  onImagesChange,
  storageFolder = "products"
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    setUploadProgress(0);
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop() || 'webp';
    const folderName = productId || `temp-${Date.now()}`;
    const baseFileName = `${folderName}/${Date.now()}`;

    try {
      toast({
        title: "Optimizing image...",
        description: "Creating multiple sizes for faster loading"
      });

      // Generate responsive images
      const responsiveImages = await generateResponsiveImages(file, RESPONSIVE_SIZES);
      const uploadedUrls: string[] = [];

      let progressStep = 0;
      const totalSteps = responsiveImages.length + 1; // +1 for original

      // Upload original compressed image
      const originalCompressed = await compressImage(file, {
        maxWidth: 1920,
        quality: 0.9,
        format: 'webp'
      });

      const originalFileName = `${baseFileName}.webp`;
      const { error: originalError } = await supabase.storage
        .from(storageFolder)
        .upload(originalFileName, originalCompressed, {
          cacheControl: "31536000", // 1 year cache
          upsert: false,
        });

      if (!originalError) {
        const { data } = supabase.storage
          .from(storageFolder)
          .getPublicUrl(originalFileName);
        
        if (data?.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }
      }

      progressStep++;
      setUploadProgress((progressStep / totalSteps) * 100);

      // Upload responsive versions
      for (const responsive of responsiveImages) {
        const fileName = `${baseFileName}${responsive.suffix}.webp`;
        
        const { error } = await supabase.storage
          .from(storageFolder)
          .upload(fileName, responsive.blob, {
            cacheControl: "31536000", // 1 year cache
            upsert: false,
          });

        if (!error) {
          console.log(`Uploaded ${responsive.suffix}: ${responsive.size} bytes`);
        }

        progressStep++;
        setUploadProgress((progressStep / totalSteps) * 100);
      }

      if (uploadedUrls.length > 0) {
        onImagesChange([...(images || []), ...uploadedUrls]);
        toast({
          title: "Success!",
          description: `Image optimized and uploaded with ${responsiveImages.length} sizes`
        });
      }

    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Please try a smaller file or different format",
        variant: "destructive"
      });
    }
    
    setUploading(false);
    setUploadProgress(0);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleRemove = async (url: string) => {
    setUploading(true);
    
    try {
      // Extract file path and remove all versions
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const productFolder = urlParts[urlParts.length - 2];
      const baseName = fileName.replace(/\.(webp|jpg|jpeg|png)$/i, '');
      
      // Remove all responsive versions
      const filesToRemove = [
        `${productFolder}/${fileName}`, // original
        ...RESPONSIVE_SIZES.map(size => `${productFolder}/${baseName}${size.suffix}.webp`)
      ];
      
      await supabase.storage.from(storageFolder).remove(filesToRemove);
      onImagesChange(images.filter((img) => img !== url));
      
      toast({
        title: "Image removed",
        description: "All optimized versions have been deleted"
      });
    } catch (error) {
      console.error("Remove error:", error);
      toast({
        title: "Failed to remove image",
        variant: "destructive"
      });
    }
    
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          Optimized Images
        </label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? `Uploading... ${Math.round(uploadProgress)}%` : "Add Image"}
        </Button>
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {images && images.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div key={img} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`Product image ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(img)}
                disabled={uploading}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No images uploaded yet</p>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={uploading}
      />
      
      <p className="text-xs text-gray-500">
        <strong>Smart Compression:</strong> Images are automatically optimized in WebP format with multiple sizes (thumb, small, medium, large) for faster loading across all devices.
      </p>
    </div>
  );
};
