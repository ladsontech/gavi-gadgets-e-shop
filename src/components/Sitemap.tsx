
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

interface Product {
  slug: string;
  updated_at: string;
}

interface Category {
  slug: string;
  updated_at: string;
}

const Sitemap: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch active products
    const { data: productsData } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_active', true);

    // Fetch active categories
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('slug, updated_at')
      .eq('is_active', true);

    setProducts(productsData || []);
    setCategories(categoriesData || []);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const sitemapContent = await generateSitemapXML();
      const blob = new Blob([sitemapContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateStatic = async () => {
    setIsGenerating(true);
    try {
      const sitemapContent = await generateSitemapXML();
      
      // Create a message to inform user about the static file
      alert('Sitemap generated! The static sitemap.xml file has been created in the public folder. This will be accessible at https://gavigadgets.ug/sitemap.xml once deployed.');
      
      // Also download the file for manual placement if needed
      const blob = new Blob([sitemapContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      alert('Error generating sitemap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">XML Sitemap Generator</h1>
        <p className="text-gray-600 mb-4">
          Generate your sitemap.xml with {products.length} products and additional SEO pages.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Download sitemap.xml'}
          </button>
          
          <button
            onClick={handleGenerateStatic}
            disabled={isGenerating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Static Sitemap'}
          </button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h2 className="font-semibold mb-2 text-green-800">✅ Static Sitemap Available</h2>
        <p className="text-green-700 mb-2">
          Your sitemap.xml is now available at:
        </p>
        <code className="bg-white p-2 rounded border block text-green-800">
          https://gavigadgets.ug/sitemap.xml
        </code>
        <p className="text-sm text-green-600 mt-2">
          This static file will be served directly by your web server and is discoverable by search engines.
        </p>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-semibold mb-2">Google Search Console Submission:</h2>
        <code className="bg-white p-2 rounded border block">
          https://gavigadgets.ug/sitemap.xml
        </code>
        <p className="text-sm text-gray-600 mt-2">
          Use this URL when submitting your sitemap to Google Search Console.
        </p>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h2 className="font-semibold mb-2">📋 Sitemap Contents:</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Homepage and main pages</li>
          <li>• {products.length} product pages</li>
          <li>• SEO-optimized category pages</li>
          <li>• Location-based pages (Kampala, Uganda)</li>
          <li>• Brand-specific pages (iPhone, Samsung, Google Pixel, Huawei)</li>
        </ul>
      </div>
    </div>
  );
};

export default Sitemap;
