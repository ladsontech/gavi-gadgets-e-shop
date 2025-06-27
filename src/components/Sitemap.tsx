
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  const generateSitemap = () => {
    const baseUrl = 'https://gavistore.lovable.app';
    const currentDate = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Cart Page -->
  <url>
    <loc>${baseUrl}/cart</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add product pages
    products.forEach(product => {
      const lastmod = product.updated_at ? new Date(product.updated_at).toISOString().split('T')[0] : currentDate;
      sitemap += `
  <!-- Product: ${product.slug} -->
  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return sitemap;
  };

  const handleDownload = () => {
    const sitemapContent = generateSitemap();
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sitemapContent = generateSitemap();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">XML Sitemap</h1>
        <p className="text-gray-600 mb-4">
          This sitemap contains {products.length + 2} URLs for search engines to crawl.
        </p>
        <button
          onClick={handleDownload}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
        >
          Download sitemap.xml
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
        <pre className="text-sm whitespace-pre-wrap">
          {sitemapContent}
        </pre>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-semibold mb-2">Google Search Console URL:</h2>
        <code className="bg-white p-2 rounded border block">
          https://gavistore.lovable.app/sitemap.xml
        </code>
        <p className="text-sm text-gray-600 mt-2">
          Use this URL when submitting your sitemap to Google Search Console.
        </p>
      </div>
    </div>
  );
};

export default Sitemap;
