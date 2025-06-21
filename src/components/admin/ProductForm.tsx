import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageUploader } from "./ProductImageUploader";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, X } from "lucide-react";

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

interface BatchProductFormProps {
  categories: Category[];
  onSave: (saved: Product[]) => void;
  onCancel: () => void;
}

interface BatchSettings {
  category_id: string;
  condition: string;
  brand: string;
}

interface ProductEntry {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  description?: string;
  images: string[];
  is_featured: boolean;
  discountPercentage: number;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const BatchProductForm: React.FC<BatchProductFormProps> = ({
  categories,
  onSave,
  onCancel,
}) => {
  const [showSettings, setShowSettings] = useState(true);
  const [batchSettings, setBatchSettings] = useState<BatchSettings>({
    category_id: "",
    condition: "used", // Default to UK Used
    brand: "",
  });
  
  const [products, setProducts] = useState<ProductEntry[]>([
    {
      id: "1",
      name: "",
      price: 0,
      original_price: null,
      description: "",
      images: [],
      is_featured: false,
      discountPercentage: 0,
    }
  ]);
  
  const [saving, setSaving] = useState(false);

  // Update brand when category changes
  useEffect(() => {
    const selectedCategory = categories.find(c => c.id === batchSettings.category_id);
    if (selectedCategory) {
      setBatchSettings(prev => ({ ...prev, brand: selectedCategory.name }));
    }
  }, [batchSettings.category_id, categories]);

  const updateBatchSettings = (key: keyof BatchSettings, value: string) => {
    setBatchSettings(prev => ({ ...prev, [key]: value }));
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
    if (products.length > 1) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, key: keyof ProductEntry, value: any) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        const updated = { ...product, [key]: value };
        
        // Handle discount calculation
        if (key === 'discountPercentage' && updated.price > 0) {
          const discount = Number(value);
          if (discount > 0) {
            updated.original_price = Math.round(updated.price / (1 - discount / 100));
          } else {
            updated.original_price = null;
          }
        } else if (key === 'price' && updated.discountPercentage > 0) {
          const price = Number(value);
          updated.original_price = Math.round(price / (1 - updated.discountPercentage / 100));
        }
        
        return updated;
      }
      return product;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const productsToSave: Product[] = products
      .filter(p => p.name.trim() && p.price > 0)
      .map(product => ({
        name: product.name.trim(),
        description: product.description?.trim() || undefined,
        price: Number(product.price),
        original_price: product.original_price ? Number(product.original_price) : null,
        brand: batchSettings.brand,
        model: product.name.trim(),
        condition: batchSettings.condition,
        images: product.images,
        category_id: batchSettings.category_id,
        slug: slugify(product.name.trim()),
        stock_quantity: 1,
        is_featured: product.is_featured,
      }));

    if (productsToSave.length === 0) {
      alert("Please add at least one product with name and price.");
      setSaving(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .insert(productsToSave)
        .select();

      if (error) {
        alert("Error: " + error.message);
      } else {
        onSave(data || []);
      }
    } catch (err) {
      alert("Error saving products: " + (err as Error).message);
    }
    
    setSaving(false);
  };

  const canProceed = batchSettings.category_id && batchSettings.condition;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Batch Upload Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand/Category *
              </label>
              <select
                value={batchSettings.category_id}
                onChange={(e) => updateBatchSettings("category_id", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition *
              </label>
              <select
                value={batchSettings.condition}
                onChange={(e) => updateBatchSettings("condition", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="new">Brand New</option>
                <option value="used">UK Used</option>
              </select>
            </div>
          </div>
          
          {canProceed && (
            <div className="mt-4 p-3 bg-white rounded border">
              <p className="text-sm text-gray-600">
                All products will be uploaded as: <Badge variant="outline">{batchSettings.brand}</Badge> <Badge variant="secondary">{batchSettings.condition === 'used' ? 'UK Used' : 'Brand New'}</Badge>
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <Button
              type="button"
              onClick={() => setShowSettings(false)}
              disabled={!canProceed}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue to Products
            </Button>
          </div>
        </div>
      )}

      {/* Products Form */}
      {!showSettings && canProceed && (
        <div className="space-y-6">
          {/* Settings Summary */}
          <div className="bg-gray-50 border rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Uploading as:</span>
              <Badge variant="outline">{batchSettings.brand}</Badge>
              <Badge variant="secondary">{batchSettings.condition === 'used' ? 'UK Used' : 'Brand New'}</Badge>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4 mr-1" />
              Change
            </Button>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Product #{index + 1}</h4>
                  {products.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Product Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <Input
                      placeholder="e.g. Galaxy S24 Ultra 256GB"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price (UGX) *
                    </label>
                    <Input
                      type="number"
                      placeholder="750000"
                      min={0}
                      value={product.price}
                      onChange={(e) => updateProduct(product.id, "price", Number(e.target.value))}
                      required
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount % (optional)
                    </label>
                    <Input
                      type="number"
                      placeholder="10"
                      min={0}
                      max={90}
                      value={product.discountPercentage}
                      onChange={(e) => updateProduct(product.id, "discountPercentage", Number(e.target.value))}
                    />
                    {product.original_price && (
                      <p className="text-xs text-gray-500 mt-1">
                        Original: UGX {product.original_price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe the phone features, specifications, etc."
                    value={product.description || ""}
                    onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                {/* Featured checkbox */}
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`featured-${product.id}`}
                      checked={product.is_featured}
                      onChange={(e) => updateProduct(product.id, "is_featured", e.target.checked)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <label htmlFor={`featured-${product.id}`} className="ml-2 text-sm text-gray-700">
                      Mark as featured product
                    </label>
                  </div>
                </div>

                {/* Images */}
                <ProductImageUploader
                  productId={`batch-${product.id}`}
                  images={product.images}
                  onImagesChange={(imgs) => updateProduct(product.id, "images", imgs)}
                />
              </div>
            ))}
          </div>

          {/* Add Product Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={addProduct}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Product
            </Button>
          </div>

          {/* Action Buttons */}
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
              type="button" 
              disabled={saving}
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700"
            >
              {saving ? "Uploading..." : `Upload ${products.filter(p => p.name.trim() && p.price > 0).length} Products`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};