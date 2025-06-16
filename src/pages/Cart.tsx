
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    address: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id: string) => {
    const newCart = cartItems.filter(item => item.id !== id);
    updateCart(newCart);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    const newCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const orderDetails = cartItems.map(item => 
      `${item.name} x${item.quantity} - UGX ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const totalAmount = getTotalPrice();
    
    const message = `New Order from Gavi Gadgets:

Customer Details:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
${customerInfo.whatsapp ? `WhatsApp: ${customerInfo.whatsapp}` : ''}
${customerInfo.address ? `Address: ${customerInfo.address}` : ''}

Order Details:
${orderDetails}

Total Amount: UGX ${totalAmount.toLocaleString()}

Please confirm this order and provide payment instructions.`;

    const whatsappUrl = `https://wa.me/256750123456?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart after checkout
    updateCart([]);
    setCustomerInfo({ name: "", phone: "", whatsapp: "", address: "" });
    
    toast({
      title: "Order sent!",
      description: "Your order has been sent via WhatsApp. We'll contact you soon.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppBar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Button onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-6 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-green-600 font-bold">
                      UGX {Number(item.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      UGX {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <Input
                placeholder="Full Name *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <Input
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
              <Input
                placeholder="WhatsApp Number (optional)"
                value={customerInfo.whatsapp}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
              />
              <Input
                placeholder="Delivery Address (optional)"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">UGX {getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-600">UGX {getTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full" size="lg">
              Checkout via WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full mt-2"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
