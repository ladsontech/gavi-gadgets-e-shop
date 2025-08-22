
import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";
import { compressImage } from "@/utils/imageCompression";
import { useToast } from "@/components/ui/use-toast";

interface UpdateImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
}

export const UpdateImageUploader: React.FC<UpdateImageUploaderProps> = ({
  onImageUploaded,
  uploading,
  setUploading,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    
    const file = e.target.files[0];
    
    try {
      // Compress image for updates (16:9 ratio, optimized for web)
      const compressedImage = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 675, // 16:9 ratio
        quality: 0.85,
        format: 'webp'
      });

      // Create preview URL from compressed image
      const preview = URL.createObjectURL(compressedImage);
      setPreviewUrl(preview);
      
      // Generate filename with timestamp to avoid conflicts
      const fileName = `updates/${Date.now()}-${Math.random().toString(36).substring(2)}.webp`;

      const { error } = await supabase.storage
        .from("updates")
        .upload(fileName, compressedImage, {
          cacheControl: "31536000", // 1 year cache
          upsert: true,
        });

      if (!error) {
        const { data } = supabase.storage
          .from("updates")
          .getPublicUrl(fileName);
        
        if (data?.publicUrl) {
          onImageUploaded(data.publicUrl);
          toast({
            title: "Success!",
            description: "Image optimized and uploaded successfully"
          });
        }
      } else {
        throw error;
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Please try a smaller file or different format",
        variant: "destructive"
      });
      setPreviewUrl(null);
    }
    
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors">
        <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Update Image</h4>
        <p className="text-sm text-gray-500 mb-4">
          Upload any image - it will be optimized and displayed in 16:9 format
        </p>
        <Button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="bg-pink-600 hover:bg-pink-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Optimizing..." : "Choose Image"}
        </Button>
      </div>

      {/* Preview Area */}
      {previewUrl && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-700">Preview (optimized 16:9 format):</h5>
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
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
      
      <p className="text-xs text-gray-500 text-center">
        <strong>Smart Optimization:</strong> Images are automatically compressed to WebP format and optimized for web delivery with fast loading.
      </p>
    </div>
  );
};
