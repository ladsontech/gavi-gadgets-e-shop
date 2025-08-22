
import React from "react";
import { OptimizedImageUploader } from "./OptimizedImageUploader";

interface ProductImageUploaderProps {
  productId?: string;
  images: string[];
  onImagesChange: (newImages: string[]) => void;
}

export const ProductImageUploader: React.FC<ProductImageUploaderProps> = (props) => {
  return <OptimizedImageUploader {...props} storageFolder="products" />;
};
