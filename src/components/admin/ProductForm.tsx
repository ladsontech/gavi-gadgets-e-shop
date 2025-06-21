import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageUploader } from "./ProductImageUploader";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Settings } from "lucide-react";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Product = {
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

type ProductEntry = {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  description?: string;
  images: string[];
  is_featured: boolean;
  discountPercentage: number;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface BatchProductFormProps {
  categories: Category[];
  onSave: (saved: Product[]) => void;
  onCancel: () => void;
}

export const BatchProductForm: React.FC<BatchProductFormProps> = ({
  categories,
  onSave,
  onCancel,
}) => {
  const [showSettings, setShowSettings] = useState(true);
  const [batchSettings, setBatchSettings] = useState({
    category_id: "",
    condition: "used",
    brand: "",
  });

  const [products, setProducts] = useState<ProductEntry[]>([{
    id: "1",
    name: "",
    price: 0,
    original_price: null,
    description: "",
    images: [],
    is_featured: false,
    discountPercentage: 0,
  }]);

  const [saving, setSaving] = useState(false);

  const updateProduct = (id: string, key: keyof ProductEntry, value: any) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        const updated = { ...product, [key]: value };
        if (key === 'discountPercentage' && updated.price > 0) {
          const discount = Number(value);
          updated.original_price = discount > 0 ? Math.round(updated.price / (1 - discount / 100)) : null;
        } else if (key === 'price' && updated.discountPercentage > 0) {
          const price = Number(value);
          updated.original_price = Math.round(price / (1 - updated.discountPercentage / 100));
        }
        return updated;
      }
      return product;
    }));
  };

  const addProduct = () => {
    const newId = (Math.max(...products.map(p => parseInt(p.id))) + 1).toString();
    setProducts(prev => [...prev, {
      id: newId,
      name: "",
      price: 0,
      original_price: null,
      description: "",
      images: [],
      is_featured: false,
      discountPercentage: 0,
    }]);
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const toSave: Product[] = products.filter(p => p.name.trim() && p.price > 0).map(product => ({
      name: product.name.trim(),
      description: product.description?.trim(),
      price: product.price,
      original_price: product.original_price,
      brand: batchSettings.brand,
      model: product.name.trim(),
      condition: batchSettings.condition,
      images: product.images,
      category_id: batchSettings.category_id,
      slug: slugify(product.name.trim()),
      stock_quantity: 1,
      is_featured: product.is_featured,
    }));

    if (toSave.length === 0) {
      alert("Please fill at least one valid product.");
      setSaving(false);
      return;
    }

    try {
      const { data, error } = await supabase.from("products").insert(toSave).select();
      if (error) alert("Error: " + error.message);
      else onSave(data || []);
    } catch (err) {
      alert("Unexpected error: " + (err as Error).message);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      {showSettings ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Select Brand & Condition</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Brand *</label>
              <select
                value={batchSettings.category_id}
                onChange={(e) => {
                  const cat = categories.find(c => c.id === e.target.value);
                  setBatchSettings({
                    ...batchSettings,
                    category_id: cat?.id || "",
                    brand: cat?.name || "",
                  });
                }}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Condition *</label>
              <select
                value={batchSettings.condition}
                onChange={(e) => setBatchSettings({ ...batchSettings, condition: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="new">Brand New</option>
                <option value="used">UK Used</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => setShowSettings(false)}
              disabled={!batchSettings.category_id || !batchSettings.condition}
              className="bg-blue-600 text-white"
            >Continue to Upload</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 bg-gray-100 px-4 py-2 rounded">
            <div>
              <span className="text-sm text-gray-700">Uploading as:</span>
              <Badge className="ml-2">{batchSettings.brand}</Badge>
              <Badge className="ml-2" variant="secondary">{batchSettings.condition === 'used' ? 'UK Used' : 'Brand New'}</Badge>
            </div>
            <Button size="sm" variant="outline" onClick={() => setShowSettings(true)}>
              <Settings className="w-4 h-4 mr-1" /> Change
            </Button>
          </div>

          {products.map((product, i) => (
            <div key={product.id} className="border p-4 mb-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-800">Product #{i + 1}</h4>
                {products.length > 1 && (
                  <Button size="sm" variant="ghost" onClick={() => removeProduct(product.id)}>
                    <X className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Product Name *</label>
                  <Input value={product.name} onChange={(e) => updateProduct(product.id, "name", e.target.value)} placeholder="e.g. Galaxy S21 Ultra" />
                </div>
                <div>
                  <label className="text-sm">Selling Price *</label>
                  <Input type="number" value={product.price} onChange={(e) => updateProduct(product.id, "price", Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-sm">Discount %</label>
                  <Input type="number" value={product.discountPercentage} onChange={(e) => updateProduct(product.id, "discountPercentage", Number(e.target.value))} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm">Description</label>
                  <Textarea rows={2} value={product.description || ""} onChange={(e) => updateProduct(product.id, "description", e.target.value)} />
                </div>
              </div>
              <div className="mt-3">
                <ProductImageUploader
                  productId={`batch-${product.id}`}
                  images={product.images}
                  onImagesChange={(imgs) => updateProduct(product.id, "images", imgs)}
                />
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={product.is_featured}
                  onChange={(e) => updateProduct(product.id, "is_featured", e.target.checked)}
                  id={`featured-${product.id}`}
                />
                <label htmlFor={`featured-${product.id}`} className="text-sm">Mark as featured</label>
              </div>
            </div>
          ))}

          <div className="text-center mb-6">
            <Button variant="outline" onClick={addProduct}>
              <Plus className="w-4 h-4 mr-1" /> Add Another Product
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">Cancel</Button>
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700"
            >{saving ? "Uploading..." : `Upload ${products.length} Products`}</Button>
          </div>
        </>
      )}
    </div>
  );
};
