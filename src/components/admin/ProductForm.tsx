
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
  original_price?: number;
  brand: string;
  model: string;
  storage_capacity?: string;
  color?: string;
  condition: string;
  stock_quantity: number;
  images: string[];
  is_featured: boolean;
  category_id?: string;
  features?: string[];
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
      original_price: 0,
      brand: "",
      model: "",
      storage_capacity: "",
      color: "",
      features: [],
      description: "",
      condition: "new",
      stock_quantity: 0,
      images: [],
      category_id: "",
      is_featured: false,
    }
  );
  const [saving, setSaving] = useState(false);

  // Input change handler
  const update = (key: keyof Product, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Save handler (insert or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Insert or update product
    if (form.id) {
      // Update
      const { error } = await supabase
        .from("products")
        .update({
          ...form,
        })
        .eq("id", form.id);
      if (error) {
        alert("Error: " + error.message);
      } else {
        onSave(form);
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from("products")
        .insert([{ ...form }])
        .select()
        .single();
      if (error) {
        alert("Error: " + error.message);
      } else {
        onSave(data);
      }
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow max-w-xl mx-auto mt-4">
      <div className="grid gap-4">
        <Input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
        <Textarea
          placeholder="Product Description"
          value={form.description || ""}
          onChange={(e) => update("description", e.target.value)}
        />
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Price (UGX)"
            min={0}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            required
          />
          <Input
            type="number"
            placeholder="Original Price"
            min={0}
            value={form.original_price || ""}
            onChange={(e) =>
              update("original_price", e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            required
          />
          <Input
            placeholder="Model"
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Storage (e.g. 128GB)"
            value={form.storage_capacity || ""}
            onChange={(e) => update("storage_capacity", e.target.value)}
          />
          <Input
            placeholder="Color"
            value={form.color || ""}
            onChange={(e) => update("color", e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-1">
            Condition:
            <select
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="new">Brand New</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </label>
          <Input
            type="number"
            min={0}
            placeholder="Quantity"
            value={form.stock_quantity}
            onChange={(e) => update("stock_quantity", Number(e.target.value))}
          />
        </div>
        <div className="flex gap-3">
          <label>
            Category:
            <select
              value={form.category_id || ""}
              onChange={(e) => update("category_id", e.target.value)}
              className="border rounded px-2 py-1 ml-1"
              required
            >
              <option value="">Select one</option>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => update("is_featured", e.target.checked)}
            />
            Featured
          </label>
        </div>
        <ProductImageUploader
          productId={form.id ?? "new"}
          images={form.images || []}
          onImagesChange={(imgs) => update("images", imgs)}
        />
        <Textarea
          placeholder="Product Features (one per line)"
          value={(form.features || []).join("\n")}
          onChange={(e) => update("features", e.target.value.split("\n"))}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
};
