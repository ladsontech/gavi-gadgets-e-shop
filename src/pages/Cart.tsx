import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
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
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    // Create simplified WhatsApp message with product links
    const baseUrl = window.location.origin;
    const orderDetails = cartItems.map(item => {
      const productLink = item.slug ? `${baseUrl}/product/${item.slug}` : "Product link not available";
      return `📱 ${item.name}
   Quantity: ${item.quantity}
   Price: UGX ${(item.price * item.quantity).toLocaleString()}
   Link: ${productLink}`;
    }).join('\n\n');
    
    const totalAmount = getTotalPrice();
    
    const message = `🛍️ *Order from Gavi Gadgets UG*
Your Mobile Source

📦 *Order Details:*

${orderDetails}

💰 *Total Amount: UGX ${totalAmount.toLocaleString()}*

Thank you for choosing Gavi Gadgets UG! 🙏`;

    const whatsappUrl = `https://wa.me/256740799577?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart after checkout
    updateCart([]);
    
    toast({
      title: "Order sent!",
      description: "Your order has been sent via WhatsApp. We'll contact you soon.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <ShoppingBag className="w-20 h-20 mx-auto text-pink-300 mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 text-lg">Discover amazing products and add them to your cart!</p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
                <h2 className="text-xl font-semibold text-gray-900">Order Items ({cartItems.length})</h2>
              </div>
              
              {cartItems.map((item, index) => (
                <div key={item.id} className={`p-4 sm:p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  {/* Mobile Layout */}
                  <div className="block sm:hidden">
                    <div className="flex gap-4 mb-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                          UGX {Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 h-8 w-8 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-lg border-pink-200 hover:bg-pink-50"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-lg border-pink-200 hover:bg-pink-50"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                          UGX {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                      <p className="text-xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                        UGX {Number(item.price).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border-pink-200 hover:bg-pink-50"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border-pink-200 hover:bg-pink-50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <p className="font-bold text-xl bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                        UGX {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 h-fit order-1 lg:order-2 overflow-hidden">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-lg bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                    UGX {getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                    UGX {getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout} 
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                  size="lg"
                >
                  Checkout via WhatsApp
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full border-pink-200 hover:bg-pink-50 hover:border-pink-300 rounded-xl"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
