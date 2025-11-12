import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Phone, Calendar, DollarSign, Eye, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_whatsapp?: string;
  total_amount: number;
  status: string;
  payment_method?: string;
  payment_status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  total_price: number;
}

export const OrdersManager = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const { data: orders, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    refetchOnWindowFocus: true, // Refetch when window regains focus
    staleTime: 0, // Consider data stale immediately to ensure fresh updates
  });

  const { data: orderItems } = useQuery({
    queryKey: ["order-items", selectedOrder?.id],
    queryFn: async () => {
      if (!selectedOrder) return [];
      
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", selectedOrder.id);

      if (error) throw error;
      return data as OrderItem[];
    },
    enabled: !!selectedOrder,
  });

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Order status updated to ${newStatus}`,
    });
    refetch();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Orders Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            Total Orders: <span className="font-bold">{orders?.length || 0}</span>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-3">
        {orders?.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Mobile Layout */}
              <div className="block md:hidden space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{order.order_number}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()} at{" "}
                      {new Date(order.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {order.customer_name}
                  </p>
                  <p className="text-gray-600">{order.customer_phone}</p>
                  <p className="font-bold text-pink-600">
                    UGX {Number(order.total_amount).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="text-xs"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    {selectedOrder?.id === order.id ? "Hide" : "View"}
                  </Button>
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "processing")}
                        className="text-xs bg-blue-50"
                      >
                        Processing
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        className="text-xs bg-green-50"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                        className="text-xs bg-red-50"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <div className="min-w-[140px]">
                    <p className="font-semibold">{order.order_number}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-600">{order.customer_phone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-pink-600" />
                    <span className="font-bold text-pink-600">
                      UGX {Number(order.total_amount).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                      {order.status}
                    </Badge>
                    {order.payment_status && (
                      <Badge className={`${getPaymentStatusColor(order.payment_status)} text-white text-xs`}>
                        {order.payment_status}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedOrder?.id === order.id ? "Hide" : "View"}
                  </Button>
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "processing")}
                        className="bg-blue-50"
                      >
                        Processing
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        className="bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                        className="bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Order Details - Shown when selected */}
              {selectedOrder?.id === order.id && orderItems && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <h4 className="font-semibold text-sm">Order Items:</h4>
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <div>
                          <p className="font-medium text-sm">{item.product_name}</p>
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity} × UGX {Number(item.product_price).toLocaleString()}
                          </p>
                        </div>
                        <p className="font-bold text-sm">
                          UGX {Number(item.total_price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-xs font-semibold mb-1">Notes:</p>
                      <p className="text-xs text-gray-700">{order.notes}</p>
                    </div>
                  )}
                  {order.customer_whatsapp && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50"
                        onClick={() => {
                          const message = `Hello ${order.customer_name}, regarding your order ${order.order_number}...`;
                          window.open(`https://wa.me/${order.customer_whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Contact via WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {(!orders || orders.length === 0) && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No orders yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

