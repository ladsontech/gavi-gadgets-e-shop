
import { useEffect } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapXML = () => {
  useEffect(() => {
    const serveSitemap = async () => {
      try {
        const sitemapXML = await generateSitemapXML();
        
        // Replace the entire document with XML content
        document.open();
        document.write(sitemapXML);
        document.close();
        
        // Set the content type
        if (document.contentType !== 'application/xml') {
          document.querySelector('html')?.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        }
      } catch (error) {
        console.error('Error generating sitemap:', error);
        // Fallback: show error in XML format
        const errorXML = `<?xml version="1.0" encoding="UTF-8"?>
<error>Unable to generate sitemap</error>`;
        document.open();
        document.write(errorXML);
        document.close();
      }
    };

    serveSitemap();
  }, []);

  // Return null since we're replacing the entire document
  return null;
};

export default SitemapXML;
