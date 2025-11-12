import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, TrendingUp, Calendar } from "lucide-react";

interface ProductsByCategory {
  category_id: string | null;
  category_name: string;
  product_count: number;
}

interface OrdersByMonth {
  month: string;
  year: number;
  order_count: number;
  total_amount: number;
}

interface OrderStats {
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  completed_orders: number;
}

export const AnalyticsDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch products by category
  const { data: productsByCategory } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: async () => {
      const { data: products } = await supabase
        .from("products")
        .select("category_id, categories(name)");

      // Group by category
      const grouped = products?.reduce((acc: any, product: any) => {
        const categoryId = product.category_id || "uncategorized";
        const categoryName = product.categories?.name || "Uncategorized";
        
        if (!acc[categoryId]) {
          acc[categoryId] = {
            category_id: categoryId,
            category_name: categoryName,
            product_count: 0,
          };
        }
        acc[categoryId].product_count += 1;
        return acc;
      }, {});

      return Object.values(grouped || {}) as ProductsByCategory[];
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch total products count
  const { data: totalProducts } = useQuery({
    queryKey: ["totalProducts"],
    queryFn: async () => {
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch order statistics
  const { data: orderStats } = useQuery({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const { data: orders } = await supabase
        .from("orders")
        .select("status, total_amount");

      const stats: OrderStats = {
        total_orders: orders?.length || 0,
        total_revenue: orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0,
        pending_orders: orders?.filter(o => o.status === "pending").length || 0,
        completed_orders: orders?.filter(o => o.status === "completed").length || 0,
      };

      return stats;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch orders by month
  const { data: ordersByMonth } = useQuery({
    queryKey: ["ordersByMonth", selectedYear],
    queryFn: async () => {
      const { data: orders } = await supabase
        .from("orders")
        .select("created_at, total_amount, status")
        .gte("created_at", `${selectedYear}-01-01`)
        .lte("created_at", `${selectedYear}-12-31`)
        .order("created_at", { ascending: true });

      // Group by month
      const grouped = orders?.reduce((acc: any, order: any) => {
        const date = new Date(order.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const monthName = date.toLocaleDateString("en-US", { month: "long" });

        if (!acc[monthKey]) {
          acc[monthKey] = {
            month: monthName,
            year: date.getFullYear(),
            order_count: 0,
            total_amount: 0,
          };
        }
        acc[monthKey].order_count += 1;
        acc[monthKey].total_amount += Number(order.total_amount);
        return acc;
      }, {});

      return Object.values(grouped || {}) as OrdersByMonth[];
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts || 0}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats?.total_orders || 0}</div>
            <p className="text-xs text-muted-foreground">
              {orderStats?.pending_orders || 0} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              UGX {Number(orderStats?.total_revenue || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {orderStats?.completed_orders || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              UGX{" "}
              {orderStats?.total_orders
                ? Math.round(orderStats.total_revenue / orderStats.total_orders).toLocaleString()
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Products by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Products by Category</CardTitle>
          <CardDescription>Total number of products in each category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productsByCategory
              ?.sort((a, b) => b.product_count - a.product_count)
              .map((category) => (
                <div
                  key={category.category_id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-600" />
                    <span className="font-medium">{category.category_name}</span>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {category.product_count}
                  </Badge>
                </div>
              ))}
          </div>
          {(!productsByCategory || productsByCategory.length === 0) && (
            <p className="text-center text-gray-500 py-8">No products found</p>
          )}
        </CardContent>
      </Card>

      {/* Orders by Month */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Orders by Month</CardTitle>
              <CardDescription>Monthly order statistics for {selectedYear}</CardDescription>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded-md px-3 py-2 text-sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ordersByMonth && ordersByMonth.length > 0 ? (
              ordersByMonth.map((monthData) => (
                <div
                  key={`${monthData.year}-${monthData.month}`}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{monthData.month}</div>
                    <div className="text-sm text-gray-500">
                      {monthData.order_count} order{monthData.order_count !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      UGX {Number(monthData.total_amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg: UGX{" "}
                      {Math.round(monthData.total_amount / monthData.order_count).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No orders found for {selectedYear}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

