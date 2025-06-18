
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `updates/${Date.now()}.${fileExt}`;

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
      alert("Image upload failed. Please try a smaller file or different format.");
      console.error(error);
    }
    
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Update Image</h4>
        <p className="text-sm text-gray-500 mb-4">
          Choose a landscape image for your update poster
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

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={uploading}
      />
      
      <p className="text-xs text-gray-500 text-center">
        Recommended: Landscape orientation (16:9 aspect ratio). Supported formats: JPG, PNG, WebP. Max file size: 5MB
      </p>
    </div>
  );
};
