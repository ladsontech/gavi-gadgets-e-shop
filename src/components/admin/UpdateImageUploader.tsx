import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    
    const file = e.target.files[0];
    
    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    
    // Generate filename with timestamp to avoid conflicts
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `updates/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    try {
      const { error } = await supabase.storage
        .from("updates")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!error) {
        const { data } = supabase.storage
          .from("updates")
          .getPublicUrl(fileName);
        
        if (data?.publicUrl) {
          onImageUploaded(data.publicUrl);
        }
      } else {
        alert("Image upload failed. Please try again.");
        console.error(error);
        setPreviewUrl(null);
      }
    } catch (error) {
      alert("Image upload failed. Please try again.");
      console.error(error);
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
          Upload any image - it will be displayed in 16:9 format
        </p>
        <Button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="bg-pink-600 hover:bg-pink-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : "Choose Image"}
        </Button>
      </div>

      {/* Preview Area */}
      {previewUrl && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-700">Preview (16:9 format):</h5>
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="*/*"
        className="hidden"
        onChange={handleUpload}
        disabled={uploading}
      />
      
      <p className="text-xs text-gray-500 text-center">
        All file types accepted. Images will be displayed in 16:9 aspect ratio format.
      </p>
    </div>
  );
};