
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
  storage_capacity?: string;
  color?: string;
  condition: string;
  stock_quantity: number;
  images: string[];
  is_featured: boolean;
  category_id?: string;
  features?: string[];
  slug: string;
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
      storage_capacity: "",
      color: "",
      features: [],
      description: "",
      condition: "new",
      stock_quantity: 0,
      images: [],
      category_id: "",
      is_featured: false,
      slug: "",
    }
  );
  const [saving, setSaving] = useState(false);

  // Always update slug if product name changes (for new products only)
  useEffect(() => {
    if (!product) {
      setForm((f) => ({
        ...f,
        slug: slugify(f.name),
      }));
    }
  }, [form.name, product]);

  // Input change handler
  const update = (key: keyof Product, value: any) => {
    setForm((f) => ({
      ...f,
      [key]: value,
      ...(key === "name" && !product
        ? { slug: slugify(value as string) }
        : {}),
    }));
  };

  // Save handler (insert or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Compose full product object with required fields
    const fullProduct: Product = {
      ...form,
      slug: form.slug || slugify(form.name),
      price: Number(form.price),
      original_price:
        form.original_price === undefined || form.original_price === null
          ? null
          : Number(form.original_price),
      features:
        form.features && Array.isArray(form.features)
          ? form.features.filter((line) => line && line.trim())
          : [],
      stock_quantity: Number(form.stock_quantity) || 0,
    };

    let error: any = null, saved: any = null;

    if (form.id) {
      // Update
      const { error: updateError } = await supabase
        .from("products")
        .update({
          ...fullProduct,
        })
        .eq("id", form.id);
      error = updateError;
      saved = { ...fullProduct, id: form.id };
    } else {
      // Insert
      const { data, error: insertError } = await supabase
        .from("products")
        .insert([
          {
            ...fullProduct,
          },
        ])
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
            value={form.original_price === null ? "" : form.original_price || ""}
            onChange={(e) =>
              update("original_price", e.target.value ? Number(e.target.value) : null)
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
          value={
            Array.isArray(form.features)
              ? form.features.join("\n")
              : ""
          }
          onChange={(e) =>
            update("features", e.target.value.split("\n"))
          }
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

