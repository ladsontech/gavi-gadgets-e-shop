
import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ProductImageUploaderProps {
  productId: string;
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
    const path = `${productId}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage.from("products").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (!error) {
      const { data } = supabase.storage.from("products").getPublicUrl(path);
      if (data?.publicUrl) {
        onImagesChange([...(images || []), data.publicUrl]);
      }
    } else {
      alert("Image upload failed. Try a smaller file or a different image.");
      console.error(error);
    }
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleRemove = async (url: string) => {
    setUploading(true);
    const key = url.split("/products/")[1];
    await supabase.storage.from("products").remove([key]);
    onImagesChange(images.filter((img) => img !== url));
    setUploading(false);
  };

  return (
    <div className="mb-2">
      <label className="block text-sm font-semibold mb-1">Product Images</label>
      <div className="flex flex-wrap gap-3 mb-2">
        {images?.map((img, idx) => (
          <div key={img} className="relative w-24 h-24 border rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="Product" className="object-contain w-full h-full" />
            <button
              type="button"
              onClick={() => handleRemove(img)}
              className="absolute top-1 right-1 bg-red-400 text-white rounded p-0.5 text-xs"
              disabled={uploading}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple={false}
        className="block mb-2"
        onChange={handleUpload}
        disabled={uploading}
      />
      <Button size="sm" variant="secondary" onClick={() => fileInput.current?.click()} disabled={uploading}>
        {uploading ? "Uploading..." : "Add Image"}
      </Button>
      <div className="text-xs text-gray-500 mt-1">Max file size: 5MB. Images shown will appear in product listing.</div>
    </div>
  );
};
