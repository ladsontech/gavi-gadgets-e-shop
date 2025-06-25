
import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Image } from "lucide-react";

interface ProductImageUploaderProps {
  productId?: string;
  images: string[];
  onImagesChange: (newImages: string[]) => void;
}

export const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  productId,
  images,
  onImagesChange,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    // Use a temporary folder when no productId is available
    const folderName = productId || `temp-${Date.now()}`;
    const fileName = `${folderName}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (!error) {
      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);
      
      if (data?.publicUrl) {
        onImagesChange([...(images || []), data.publicUrl]);
      }
    } else {
      alert("Image upload failed. Please try a smaller file or different format.");
      console.error(error);
    }
    
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleRemove = async (url: string) => {
    setUploading(true);
    
    // Extract the file path from the URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const productFolder = urlParts[urlParts.length - 2];
    const filePath = `${productFolder}/${fileName}`;
    
    await supabase.storage.from("products").remove([filePath]);
    onImagesChange(images.filter((img) => img !== url));
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          Product Images
        </label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : "Add Image"}
        </Button>
      </div>

      {images && images.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div key={img} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`Product image ${idx + 1}`}
                  className="w-full h-full object-cover"
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
        Supported formats: JPG, PNG, WebP. Max file size: 5MB
      </p>
    </div>
  );
};
