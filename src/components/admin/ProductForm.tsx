
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageUploader } from "./ProductImageUploader";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id?: string;
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
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSave: (saved: Product) => void;
  onCancel: () => void;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState<Product>(
    product || {
      name: "",
      price: 0,
      original_price: null,
      brand: "",
      model: "",
      description: "",
      condition: "new",
      images: [],
      category_id: "",
      slug: "",
      stock_quantity: 1,
      is_featured: false,
    }
  );
  const [saving, setSaving] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Calculate discount percentage when prices change
  useEffect(() => {
    if (form.original_price && form.price && form.original_price > form.price) {
      const discount = ((form.original_price - form.price) / form.original_price) * 100;
      setDiscountPercentage(Math.round(discount));
    } else {
      setDiscountPercentage(0);
    }
  }, [form.price, form.original_price]);

  // Update slug when name changes (for new products only)
  useEffect(() => {
    if (!product) {
      setForm((f) => ({
        ...f,
        slug: slugify(f.name),
      }));
    }
  }, [form.name, product]);

  // Handle discount percentage input
  const handleDiscountChange = (discount: number) => {
    setDiscountPercentage(discount);
    if (form.price && discount > 0) {
      const originalPrice = form.price / (1 - discount / 100);
      setForm(f => ({ ...f, original_price: Math.round(originalPrice) }));
    } else {
      setForm(f => ({ ...f, original_price: null }));
    }
  };

  const update = (key: keyof Product, value: any) => {
    setForm((f) => ({
      ...f,
      [key]: value,
      ...(key === "name" && !product
        ? { slug: slugify(value as string) }
        : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Extract brand and model from category and name
    const selectedCategory = categories.find(c => c.id === form.category_id);
    const brand = selectedCategory?.name || "Unknown";
    
    const fullProduct: Product = {
      ...form,
      brand,
      model: form.name, // Use product name as model
      slug: form.slug || slugify(form.name),
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      stock_quantity: 1, // Default to 1 for smartphones
    };

    let error: any = null, saved: any = null;

    if (form.id) {
      const { error: updateError } = await supabase
        .from("products")
        .update(fullProduct)
        .eq("id", form.id);
      error = updateError;
      saved = { ...fullProduct, id: form.id };
    } else {
      const { data, error: insertError } = await supabase
        .from("products")
        .insert([fullProduct])
        .select()
        .maybeSingle();
      error = insertError;
      saved = data;
    }

    if (error) {
      alert("Error: " + error.message);
    } else {
      onSave(saved);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <Input
            placeholder="e.g. iPhone 15 Pro Max 256GB"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand/Category *
          </label>
          <select
            value={form.category_id || ""}
            onChange={(e) => update("category_id", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            <option value="">Select Brand</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selling Price (UGX) *
            </label>
            <Input
              type="number"
              placeholder="750000"
              min={0}
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount % (optional)
            </label>
            <Input
              type="number"
              placeholder="10"
              min={0}
              max={90}
              value={discountPercentage}
              onChange={(e) => handleDiscountChange(Number(e.target.value))}
            />
            {form.original_price && (
              <p className="text-xs text-gray-500 mt-1">
                Original: UGX {form.original_price.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Condition and Featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition *
            </label>
            <select
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="new">Brand New</option>
              <option value="used">UK Used</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Product
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.is_featured}
                onChange={(e) => update("is_featured", e.target.checked)}
                className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Mark as featured product
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            placeholder="Describe the phone features, specifications, etc."
            value={form.description || ""}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>

        {/* Images */}
        <ProductImageUploader
          productId={form.id ?? "new"}
          images={form.images || []}
          onImagesChange={(imgs) => update("images", imgs)}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
            {saving ? "Saving..." : form.id ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};
