
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageUploader } from "./ProductImageUploader";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Package } from "lucide-react";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SimpleProduct = {
  name: string;
  description: string;
  price: number;
  images: string[];
};

interface SimpleProductFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export const SimpleProductForm: React.FC<SimpleProductFormProps> = ({
  onSave,
  onCancel,
}) => {
  const [product, setProduct] = useState<SimpleProduct>({
    name: "",
    description: "",
    price: 0,
    images: [],
  });
  const [saving, setSaving] = useState(false);

  const updateProduct = (key: keyof SimpleProduct, value: any) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.name.trim() || product.price <= 0) {
      alert("Please fill in the product name and a valid price.");
      return;
    }

    setSaving(true);

    const productToSave = {
      name: product.name.trim(),
      description: product.description.trim(),
      price: product.price,
      brand: "Other",
      model: product.name.trim(),
      condition: "new",
      images: product.images,
      category_id: null, // No category for "others"
      slug: slugify(product.name.trim()),
      stock_quantity: 1,
      is_featured: false,
      original_price: null,
    };

    try {
      const { error } = await supabase.from("products").insert([productToSave]);
      if (error) {
        alert("Error: " + error.message);
      } else {
        onSave();
      }
    } catch (err) {
      alert("Unexpected error: " + (err as Error).message);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg font-semibold text-gray-900">Add Non-Phone Item</h2>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1 ml-10">
          Add accessories, TVs, speakers, or other non-phone items
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <Input
              value={product.name}
              onChange={(e) => updateProduct("name", e.target.value)}
              placeholder="e.g. Wireless Bluetooth Speaker, Phone Case, Smart TV..."
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (UGX) *
            </label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => updateProduct("price", Number(e.target.value))}
              placeholder="0"
              className="w-full"
              min="0"
              step="1000"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={product.description}
              onChange={(e) => updateProduct("description", e.target.value)}
              placeholder="Describe the product features, condition, specifications..."
              rows={4}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <ProductImageUploader
            productId={`simple-${Date.now()}`}
            images={product.images}
            onImagesChange={(imgs) => updateProduct("images", imgs)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving || !product.name.trim() || product.price <= 0}
            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700"
          >
            {saving ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};
