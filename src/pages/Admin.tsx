
import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BatchProductForm } from "@/components/admin/ProductForm";
import { SimpleProductForm } from "@/components/admin/SimpleProductForm";
import { EditProductForm } from "@/components/admin/EditProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { UpdatesManager } from "@/components/admin/UpdatesManager";
import { OthersManager } from "@/components/admin/OthersManager";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { Loader2, Plus, Package, ArrowLeft, LogOut, Image, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Product = {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  brand: string;
  model: string;
  condition: string;
  images: string[];
  description?: string;
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

const Admin: React.FC = () => {
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'phone' | 'other'>('phone');
  const [editProduct, setEditProduct] = useState<Product | undefined>();
  const [activeTab, setActiveTab] = useState("products");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Show login modal if not authenticated, otherwise redirect to home
    if (!isAdmin) {
      setShowLoginModal(true);
    }
  }, [isAdmin]);

  useEffect(() => {
    const loadData = async () => {
      if (!isAdmin) return;
      
      setIsLoading(true);
      
      // Load categories
      const { data: catData } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      setCategories(catData || []);
      
      // Load products
      await refreshProducts();
      setIsLoading(false);
    };
    loadData();
  }, [isAdmin]);

  const refreshProducts = async () => {
    const { data: prodData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(prodData || []);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    navigate("/"); // Redirect to home if login modal is closed without logging in
  };

  const handleAddPhone = () => {
    setEditProduct(undefined);
    setFormType('phone');
    setShowForm(true);
  };

  const handleAddOther = () => {
    setEditProduct(undefined);
    setFormType('other');
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormType('phone'); // Edit always uses the phone form for now
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      refreshProducts();
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditProduct(undefined);
    refreshProducts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditProduct(undefined);
  };

  // Show login modal if not authenticated
  if (!isAdmin) {
    return (
      <AdminLoginModal 
        open={showLoginModal} 
        onOpenChange={(open) => {
          if (!open) {
            handleLoginModalClose();
          }
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-optimized sticky header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b">
        <div className="px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {showForm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFormCancel}
                  className="p-1.5 sm:p-2 flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              )}
              <div className="flex items-center gap-2 min-w-0">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-pink-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 truncate">
                    {showForm ? (editProduct ? "Edit Product" : formType === 'phone' ? "Add Phones" : "Add Other Item") : "Admin Panel"}
                  </h1>
                  {!showForm && (
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {products.length} product{products.length !== 1 ? 's' : ''} total
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {!showForm && activeTab === "products" && (
                <div className="flex gap-1">
                  <Button 
                    onClick={handleAddPhone} 
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 px-2 sm:px-3"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Phones</span>
                  </Button>
                  <Button 
                    onClick={handleAddOther} 
                    size="sm"
                    variant="outline"
                    className="px-2 sm:px-3 border-pink-200 hover:bg-pink-50"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Others</span>
                  </Button>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logoutAdmin}
                className="px-2 sm:px-4"
              >
                <LogOut className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with mobile-optimized spacing */}
      <main className="px-3 py-4 sm:px-6 sm:py-6 max-w-7xl mx-auto">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {editProduct ? (
              <EditProductForm
                product={editProduct}
                categories={categories}
                onSave={handleFormSave}
                onCancel={handleFormCancel}
              />
            ) : formType === 'phone' ? (
              <BatchProductForm
                categories={categories}
                onSave={handleFormSave}
                onCancel={handleFormCancel}
              />
            ) : (
              <SimpleProductForm
                onSave={handleFormSave}
                onCancel={handleFormCancel}
              />
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Products</span>
                <span className="sm:hidden">Phones</span>
              </TabsTrigger>
              <TabsTrigger value="others" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Others
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Updates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4 sm:space-y-6">
              {/* Mobile stats cards */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <div className="text-xs text-gray-600">Total Products</div>
                  <div className="text-lg font-bold text-gray-900">{products.length}</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <div className="text-xs text-gray-600">Categories</div>
                  <div className="text-lg font-bold text-gray-900">{categories.length}</div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12 bg-white rounded-lg shadow-sm border">
                  <div className="text-center">
                    <Loader2 className="animate-spin w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Loading products...</p>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-sm text-gray-600 mb-4">Get started by adding your first product</p>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      onClick={handleAddPhone}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Add Phone
                    </Button>
                    <Button 
                      onClick={handleAddOther}
                      variant="outline"
                      className="border-pink-200 hover:bg-pink-50"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Add Other Item
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <ProductList
                    products={products}
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="others">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <OthersManager />
              </div>
            </TabsContent>

            <TabsContent value="updates">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden p-6">
                <UpdatesManager />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Admin;
