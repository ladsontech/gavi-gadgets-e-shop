import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Wrench, Battery, Monitor, Camera, Shield } from "lucide-react";

type RepairCategory = {
  label: string;
  slug: string;
  description: string;
  icon: typeof Battery;
  imageSrc?: string;
  color: string;
};

const repairCategories: RepairCategory[] = [
  { 
    label: "Battery Replacement", 
    slug: "battery-replacement",
    description: "Professional battery replacement for all phone models",
    icon: Battery,
    color: "from-green-500 to-green-600"
  },
  { 
    label: "LCD Screens", 
    slug: "lcd-screens",
    description: "High-quality screen replacements with warranty",
    icon: Monitor,
    color: "from-blue-500 to-blue-600"
  },
  { 
    label: "Cameras", 
    slug: "cameras",
    description: "Front and back camera repair and replacement",
    icon: Camera,
    color: "from-purple-500 to-purple-600"
  },
  { 
    label: "Back Glasses", 
    slug: "back-glasses",
    description: "Back glass replacement for damaged devices",
    icon: Shield,
    color: "from-orange-500 to-orange-600"
  },
];

const RepairPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Repair Services - Gavi Gadgets"
        description="Professional phone repair services including battery replacement, LCD screens, cameras, and back glass replacement."
        keywords="phone repair, battery replacement, screen repair, camera repair, back glass replacement, uganda"
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Repair Services
              </h1>
              <p className="text-gray-600 text-sm">
                Professional repairs with warranty
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 rounded-xl p-4 sm:p-6 mb-6 md:mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Expert Repair Services</h3>
                <p className="text-sm text-gray-600 mb-3">
                  We offer professional repair services for all major phone brands. All repairs come with a warranty and are performed by certified technicians.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <span className="text-pink-500">✓</span>
                    <span>Same-day service</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <span className="text-pink-500">✓</span>
                    <span>Warranty included</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <span className="text-pink-500">✓</span>
                    <span>Certified techs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <span className="text-pink-500">✓</span>
                    <span>Quality parts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {repairCategories.map((category) => (
              <RepairCategoryCard key={category.slug} category={category} />
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need a Repair?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Contact us to book your repair service or get a quote. Our team is ready to help you get your device back in perfect condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/256123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+256123456789"
                className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RepairCategoryCard: React.FC<{ category: RepairCategory }> = ({ category }) => {
  const Icon = category.icon;
  
  return (
    <div className="group focus:outline-none">
      <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-all shadow-sm hover:shadow-lg bg-white h-full">
        {/* Icon Background */}
        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
        
        {/* Content */}
        <div className="relative p-6 flex flex-col items-center text-center h-full">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {category.label}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 flex-1">
            {category.description}
          </p>
          
          {/* CTA Button */}
          <button className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepairPage;

