
import { useEffect } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapXML = () => {
  useEffect(() => {
    const serveSitemap = async () => {
      try {
        const sitemapXML = await generateSitemapXML();
        
        // Create a blob with the XML content
        const blob = new Blob([sitemapXML], { 
          type: 'application/xml; charset=utf-8' 
        });
        
        // Create a data URL
        const dataUrl = `data:application/xml;charset=utf-8,${encodeURIComponent(sitemapXML)}`;
        
        // Replace the current page with the XML content
        window.location.replace(dataUrl);
      } catch (error) {
        console.error('Error generating sitemap:', error);
        // Fallback: show a basic message
        document.body.innerHTML = `
          <pre style="font-family: monospace; white-space: pre-wrap;">
Error generating sitemap. Please try again later.
          </pre>
        `;
      }
    };

    serveSitemap();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <p>Generating sitemap.xml...</p>
      <p>You will be redirected to the XML content shortly.</p>
    </div>
  );
};

export default SitemapXML;
