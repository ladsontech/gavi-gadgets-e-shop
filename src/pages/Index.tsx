
import { useState } from "react";
import { ShoppingBag, Phone, MapPin, MessageCircle, Star, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: "iPhone", icon: "📱", color: "bg-gradient-to-br from-pink-100 to-purple-100" },
    { name: "Pixel", icon: "📲", color: "bg-gradient-to-br from-purple-100 to-pink-100" },
    { name: "Huawei", icon: "📱", color: "bg-gradient-to-br from-pink-100 to-purple-100" },
    { name: "Samsung", icon: "📲", color: "bg-gradient-to-br from-purple-100 to-pink-100" },
    { name: "Aquos", icon: "📱", color: "bg-gradient-to-br from-pink-100 to-purple-100" },
    { name: "Realme", icon: "📲", color: "bg-gradient-to-br from-purple-100 to-pink-100" },
    { name: "Oppo", icon: "📱", color: "bg-gradient-to-br from-pink-100 to-purple-100" },
    { name: "ZTE", icon: "📲", color: "bg-gradient-to-br from-purple-100 to-pink-100" },
    { name: "Spark Camon", icon: "📱", color: "bg-gradient-to-br from-pink-100 to-purple-100" },
    { name: "Others", icon: "📲", color: "bg-gradient-to-br from-purple-100 to-pink-100" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: "UGX 4,500,000",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
      rating: 5,
      category: "iPhone"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: "UGX 3,800,000",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
      rating: 5,
      category: "Samsung"
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      price: "UGX 2,900,000",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
      rating: 4,
      category: "Pixel"
    },
    {
      id: 4,
      name: "Huawei P60 Pro",
      price: "UGX 2,400,000",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4,
      category: "Huawei"
    }
  ];

  const handleWhatsAppOrder = (productName: string) => {
    const message = `Hi! I'm interested in ordering the ${productName}. Please provide more details.`;
    const phoneNumber = "256740799577";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Gavi Gadgets
                </h1>
                <p className="text-xs text-gray-500">E-shop</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#categories" className="text-gray-700 hover:text-pink-600 transition-colors">Categories</a>
              <a href="#products" className="text-gray-700 hover:text-pink-600 transition-colors">Products</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <Input 
                  placeholder="Search phones..." 
                  className="w-48 border-gray-200 focus:border-pink-400"
                />
                <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button size="sm" variant="outline" className="relative">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">0</span>
              </Button>
              
              {/* Mobile Menu Button */}
              <Button 
                size="sm" 
                variant="ghost" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Input placeholder="Search phones..." className="flex-1" />
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <a href="#categories" className="text-gray-700 hover:text-pink-600 transition-colors">Categories</a>
                <a href="#products" className="text-gray-700 hover:text-pink-600 transition-colors">Products</a>
                <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Gavi Gadgets</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your trusted destination for the latest smartphones in Uganda. Quality phones, competitive prices, and excellent service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3"
                onClick={() => handleWhatsAppOrder("general inquiry")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Category</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your perfect smartphone from our wide range of trusted brands
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Products</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our handpicked selection of the best smartphones available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-lg font-bold text-pink-600 mb-4">{product.price}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    onClick={() => handleWhatsAppOrder(product.name)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Order on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Store</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Come see our phones in person or get in touch with us
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Store Location</h4>
                  <p className="text-gray-600">
                    New Pioneer Mall<br />
                    Shop No. PA 82A<br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                  <p className="text-gray-600">
                    <a href="tel:+256740799577" className="hover:text-pink-600 transition-colors">
                      +256 740 799 577
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">WhatsApp Orders</h4>
                  <p className="text-gray-600 mb-4">
                    All orders are processed through WhatsApp for your convenience
                  </p>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleWhatsAppOrder("general inquiry")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start WhatsApp Chat
                  </Button>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
              <h4 className="font-semibold text-gray-900 mb-6 text-xl">Store Hours</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg border border-pink-200">
                <h5 className="font-medium text-gray-900 mb-2">Why Choose Gavi Gadgets?</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Authentic phones with warranty</li>
                  <li>✓ Competitive prices</li>
                  <li>✓ Expert customer service</li>
                  <li>✓ Easy WhatsApp ordering</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-900 to-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Gavi Gadgets</h1>
                  <p className="text-pink-200 text-sm">E-shop</p>
                </div>
              </div>
              <p className="text-pink-100 mb-4">
                Your trusted partner for quality smartphones in Uganda. We bring you the latest technology at competitive prices.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-pink-100">
                <li><a href="#categories" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Featured Products</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="tel:+256740799577" className="hover:text-white transition-colors">Call Now</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-pink-100">
                <p>New Pioneer Mall, Shop PA 82A</p>
                <p>Kampala, Uganda</p>
                <p>📞 +256 740 799 577</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 border-pink-300 text-pink-100 hover:bg-pink-100 hover:text-pink-900"
                  onClick={() => handleWhatsAppOrder("general inquiry")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-pink-800 mt-8 pt-8 text-center text-pink-200">
            <p>&copy; 2024 Gavi Gadgets E-shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
