import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageUploader } from "./ProductImageUploader";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  original_price?: number | null;
  brand: string;
  model: string;
  condition: string;
  images: string[];
  category_id?: string;
  slug: string;
  stock_quantity: number;
  is_featured: boolean;
  storage_capacity?: string;
  color?: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface EditProductFormProps {
  product: Product;
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  categories,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Product>(product);
  const [saving, setSaving] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    // Calculate initial discount percentage
    if (product.original_price && product.original_price > product.price) {
      const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
      setDiscountPercentage(discount);
    }
  }, [product]);

  const updateField = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiscountChange = (discount: number) => {
    setDiscountPercentage(discount);
    if (discount > 0 && formData.price > 0) {
      const originalPrice = Math.round(formData.price / (1 - discount / 100));
      updateField('original_price', originalPrice);
    } else {
      updateField('original_price', null);
    }
  };

  const handlePriceChange = (price: number) => {
    updateField('price', price);
    if (discountPercentage > 0 && price > 0) {
      const originalPrice = Math.round(price / (1 - discountPercentage / 100));
      updateField('original_price', originalPrice);
    }
  };

  const handleWeeklyOfferChange = (isOffer: boolean) => {
    updateField('is_weekly_offer', isOffer);
    
    if (isOffer) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 7); // 7 days from now
      
      updateField('offer_start_date', startDate.toISOString());
      updateField('offer_end_date', endDate.toISOString());
    } else {
      updateField('offer_start_date', null);
      updateField('offer_end_date', null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedProduct = {
        ...formData,
        slug: slugify(formData.name),
      };

      const { data, error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", product.id)
        .select()
        .single();

      if (error) {
        alert("Error: " + error.message);
      } else {
        onSave(data);
      }
    } catch (err) {
      alert("Unexpected error: " + (err as Error).message);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
          <p className="text-sm text-gray-600">Update product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Product Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. iPhone 15 Pro Max"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Brand/Category *</label>
            <select
              value={formData.category_id || ""}
              onChange={(e) => {
                const cat = categories.find(c => c.id === e.target.value);
                updateField("category_id", cat?.id || "");
                updateField("brand", cat?.name || "");
              }}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Select Brand --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Model *</label>
            <Input
              value={formData.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="e.g. 15 Pro Max"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Condition *</label>
            <select
              value={formData.condition}
              onChange={(e) => updateField("condition", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="new">Brand New</option>
              <option value="used">UK Used</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Selling Price *</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Discount %</label>
            <Input
              type="number"
              value={discountPercentage}
              onChange={(e) => handleDiscountChange(Number(e.target.value))}
              min="0"
              max="90"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Storage Capacity</label>
            <Input
              value={formData.storage_capacity || ""}
              onChange={(e) => updateField("storage_capacity", e.target.value)}
              placeholder="e.g. 256GB"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Color</label>
            <Input
              value={formData.color || ""}
              onChange={(e) => updateField("color", e.target.value)}
              placeholder="e.g. Space Black"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Stock Quantity *</label>
            <Input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => updateField("stock_quantity", Number(e.target.value))}
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            rows={3}
            value={formData.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Product description..."
          />
        </div>

        <div>
          <ProductImageUploader
            productId={formData.id}
            images={formData.images}
            onImagesChange={(imgs) => updateField("images", imgs)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => updateField("is_featured", e.target.checked)}
              id="featured"
            />
            <label htmlFor="featured" className="text-sm">Mark as featured</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_weekly_offer || false}
              onChange={(e) => handleWeeklyOfferChange(e.target.checked)}
              id="weeklyOffer"
            />
            <label htmlFor="weeklyOffer" className="text-sm">Add to weekly offers (7 days)</label>
          </div>

          {formData.is_weekly_offer && formData.offer_end_date && (
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">
                This product will be featured in weekly offers until:{" "}
                <span className="font-semibold">
                  {new Date(formData.offer_end_date).toLocaleDateString()}
                </span>
              </p>
            </div>
          )}
        </div>

        {formData.original_price && (
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              Original Price: UGX {Number(formData.original_price).toLocaleString()} 
              {discountPercentage > 0 && (
                <span className="ml-2 font-semibold">
                  (Save UGX {Number(formData.original_price - formData.price).toLocaleString()})
                </span>
              )}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
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
            disabled={saving}
            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700"
          >
            {saving ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};
