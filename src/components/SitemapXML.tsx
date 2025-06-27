
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  slug: string;
  updated_at: string;
}

const SitemapXML: React.FC = () => {
  const [, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const generateAndServeSitemap = async () => {
      // Fetch active products
      const { data: productsData } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('is_active', true);

      const products = productsData || [];
      setProducts(products);

      const baseUrl = 'https://gavigadgets.ug';
      const currentDate = new Date().toISOString().split('T')[0];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
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
  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      });

      sitemap += `
</urlset>`;

      // Set content type to XML and serve the sitemap
      const response = new Response(sitemap, {
        headers: {
          'Content-Type': 'application/xml',
          'Content-Disposition': 'inline'
        }
      });

      // Replace the current page content with XML
      document.open();
      document.write(sitemap);
      document.close();
      document.contentType = 'application/xml';
    };

    generateAndServeSitemap();
  }, []);

  return null; // This component doesn't render anything visible
};

export default SitemapXML;
