
import { useEffect } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapXML = () => {
  useEffect(() => {
    const serveSitemap = async () => {
      try {
        const sitemapXML = await generateSitemapXML();
        
        // Create a proper XML response
        const response = new Response(sitemapXML, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
          }
        });
        
        // Convert response to blob and create object URL
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // Replace current location with the XML blob
        window.location.replace(url);
        
      } catch (error) {
        console.error('Error generating sitemap:', error);
        
        // Fallback: create error XML
        const errorXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gavigadgets.ug/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
</urlset>`;
        
        const errorResponse = new Response(errorXML, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8'
          }
        });
        
        const errorBlob = await errorResponse.blob();
        const errorUrl = URL.createObjectURL(errorBlob);
        window.location.replace(errorUrl);
      }
    };

    serveSitemap();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      color: '#333'
    }}>
      <h2>Generating XML Sitemap...</h2>
      <p>Please wait while we generate your sitemap.xml file.</p>
      <p>You will be redirected to the XML content automatically.</p>
    </div>
  );
};

export default SitemapXML;
