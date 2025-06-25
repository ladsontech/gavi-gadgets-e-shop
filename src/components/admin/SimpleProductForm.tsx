
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ProductImageUploader } from "./ProductImageUploader";
import { Loader2 } from "lucide-react";

interface SimpleProductFormProps {
  editProduct?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    images: string[];
    stock_quantity: number;
  };
  onSave: () => void;
  onCancel: () => void;
}

export const SimpleProductForm = ({ editProduct, onSave, onCancel }: SimpleProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [stockQuantity, setStockQuantity] = useState("1");
  const { toast } = useToast();

  // Populate form when editing
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setDescription(editProduct.description || "");
      setPrice(editProduct.price.toString());
      setImages(editProduct.images);
      setStockQuantity(editProduct.stock_quantity.toString());
    }
  }, [editProduct]);

  const saveProductMutation = useMutation({
    mutationFn: async () => {
      const productData = {
        name: name.trim(),
        description: description.trim() || null,
        price: parseFloat(price),
        images,
        stock_quantity: parseInt(stockQuantity),
        brand: "Other",
        model: name.trim(),
        slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
        category_id: null, // This ensures it goes to "Others"
        is_active: true,
      };

      if (editProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert(productData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: editProduct ? "Item updated successfully" : "Item added successfully",
      });
      onSave();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: editProduct ? "Failed to update item" : "Failed to add item",
        variant: "destructive",
      });
      console.error("Error saving item:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product name",
        variant: "destructive",
      });
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    saveProductMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Product Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Wireless Headphones, Smart TV, Phone Case..."
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product features, condition, etc..."
              className="mt-1 h-24"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium">
                Price (₦) *
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="mt-1"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="stock" className="text-sm font-medium">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="1"
                className="mt-1"
                min="0"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Product Images</Label>
          <div className="mt-2">
            <ProductImageUploader
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <Button
          type="submit"
          disabled={saveProductMutation.isPending}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          {saveProductMutation.isPending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              {editProduct ? "Updating..." : "Adding..."}
            </>
          ) : (
            editProduct ? "Update Item" : "Add Item"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saveProductMutation.isPending}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
