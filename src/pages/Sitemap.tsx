
import React from 'react';
import SEOHead from '@/components/SEOHead';
import SitemapComponent from '@/components/Sitemap';

const SitemapPage = () => {
  return (
    <>
      <SEOHead
        title="Sitemap - Gavi Gadgets Uganda"
        description="XML sitemap for Gavi Gadgets Uganda website containing all product pages and main navigation."
      />
      
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <SitemapComponent />
        </div>
      </div>
    </>
  );
};

export default SitemapPage;
