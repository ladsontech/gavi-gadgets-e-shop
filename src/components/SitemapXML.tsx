
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  slug: string;
  updated_at: string;
  name: string;
  images: string[];
}

const SitemapXML: React.FC = () => {
  const [, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const generateAndServeSitemap = async () => {
      // Fetch active products with more details
      const { data: productsData } = await supabase
        .from('products')
        .select('slug, updated_at, name, images')
        .eq('is_active', true);

      const products = productsData || [];
      setProducts(products);

      const baseUrl = 'https://gavigadgets.ug';
      const currentDate = new Date().toISOString().split('T')[0];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/images/gavi_gadgets_logo.png</image:loc>
      <image:title>Gavi Gadgets Uganda - Best Electronics Store</image:title>
      <image:caption>Buy iPhone, Samsung, Google Pixel, Huawei smartphones in Uganda. Better prices than Jumia and Jiji.</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${baseUrl}/cart</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

      // Add product pages with image data
      products.forEach(product => {
        const lastmod = product.updated_at ? new Date(product.updated_at).toISOString().split('T')[0] : currentDate;
        sitemap += `
  <!-- Product: ${product.name} -->
  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>`;
        
        // Add first image if available
        if (product.images && product.images.length > 0) {
          sitemap += `
    <image:image>
      <image:loc>${product.images[0]}</image:loc>
      <image:title>${product.name} - Gavi Gadgets Uganda</image:title>
      <image:caption>${product.name} available at Gavi Gadgets Uganda with best prices and warranty</image:caption>
    </image:image>`;
        }
        
        sitemap += `
  </url>`;
      });

      // Add location-based and brand-specific URLs
      const additionalUrls = [
        {
          path: '/smartphones-kampala',
          priority: '0.8',
          changefreq: 'weekly',
          title: 'Smartphones Kampala Uganda',
          description: 'Best smartphone deals in Kampala - iPhone, Samsung, Google Pixel, Huawei'
        },
        {
          path: '/iphone-uganda',
          priority: '0.9',
          changefreq: 'weekly',
          title: 'iPhone Uganda - Best Prices',
          description: 'Buy iPhone 15, 14, 13, 12, 11 in Uganda with warranty and best prices'
        },
        {
          path: '/samsung-galaxy-uganda',
          priority: '0.9',
          changefreq: 'weekly',
          title: 'Samsung Galaxy Uganda',
          description: 'Samsung Galaxy S24, S23, S22 smartphones in Uganda with official warranty'
        },
        {
          path: '/google-pixel-uganda',
          priority: '0.8',
          changefreq: 'weekly',
          title: 'Google Pixel Uganda',
          description: 'Google Pixel 8, 7, 6 smartphones available in Uganda with best camera quality'
        },
        {
          path: '/huawei-smartphones-uganda',
          priority: '0.8',
          changefreq: 'weekly',
          title: 'Huawei Smartphones Uganda',
          description: 'Latest Huawei smartphones in Uganda with advanced features and long battery life'
        },
        {
          path: '/electronics-new-pioneer-mall',
          priority: '0.7',
          changefreq: 'weekly',
          title: 'Electronics New Pioneer Mall Kampala',
          description: 'Visit Gavi Gadgets at New Pioneer Mall Shop PA 82A for the best electronics deals'
        }
      ];

      additionalUrls.forEach(url => {
        sitemap += `
  <!-- ${url.title} -->
  <url>
    <loc>${baseUrl}${url.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
      });

      sitemap += `
</urlset>`;

      // Create and serve the XML response
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Replace current page with XML content
      window.location.replace(`data:application/xml;charset=utf-8,${encodeURIComponent(sitemap)}`);
    };

    generateAndServeSitemap();
  }, []);

  return (
    <div style={{ display: 'none' }}>
      Generating sitemap...
    </div>
  );
};

export default SitemapXML;
